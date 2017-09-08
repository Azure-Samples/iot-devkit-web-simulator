import React, { Component } from 'react';
import { Layer, Stage, Group, Image as KonvaImage } from 'react-konva';
import '../common.scss';
import LED from './items/led';
import Button from './items/button';
import Reset from './items/reset';
import OLED from './items/oled';
import HTS221 from './items/hts221';
import LSM6DSL from './items/lsm6dsl';
import devkitImage from '../img/devkit-board.png';
import { Map } from 'immutable';
import * as sensorName from '../constants/sensorName';

class Board extends Component {
    constructor(props) {
        super(props);
        this.element = {};
        this.state = {
            boardImage: null,
            board: {
                cWidth: 0,
                cHeight: 0,
                bWidth: 0,
                bHeight: 0,
            },
            selfX: 0,
            selfY: 0,
        }
    }

    elasticEaseOut = (t, b, c, d, a, p) => {
        // added s = 0
        let s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a *
            Math.pow(2, (-10) * t) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) +
            c +
            b;
    }

    throttle = (fn, delay, mustRunDelay) => {
        var timer = null;
        var t_start;
        return function () {
            var context = this, args = arguments, t_curr = +new Date();
            clearTimeout(timer);
            if (!t_start) {
                t_start = t_curr;
            }
            if (t_curr - t_start >= mustRunDelay) {
                fn.apply(context, args);
                t_start = t_curr;
            }
            else {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        };
    };

    setSelfSize = () => {
        let cHeight = this.stage.domNode.offsetHeight;
        let cWidth = this.stage.domNode.offsetWidth;
        let bHeight = cHeight * 0.8;
        let bWidth = bHeight / 611.0 * 400.0;
        let st = this.stage.getStage();
        st.height(cHeight);
        st.width(cWidth);
        this.setState(() => {
            return {
                board: {
                    cWidth,
                    cHeight,
                    bWidth,
                    bHeight,
                },
                selfX: (cWidth - bWidth) / 2,
                selfY: (cHeight - bHeight) / 2,
            };
        });
    }

    onResize = () => {
        this.setSelfSize();
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
        this.setSelfSize();
        const image = new window.Image();
        image.src = devkitImage;
        image.onload = () => {
            this.setState({
                boardImage: image
            });
        }
        this.element.board.on('dragstart', () => {
            this.element.image.to({
                duration: 0.2,
                // scaleX: shape.getAttr('startScale'),
                // scaleY: shape.getAttr('startScale'),
                shadowOffsetX: 10,
                shadowOffsetY: 10,
            });
            this.props.setSensorData(sensorName.LSM6DSL, Map({
                inMotion: true,
            }));
        });
        this.element.board.on('dragmove', () => {
            this.setState(() => {
                return {
                    selfX: this.element.board.attrs.x,
                    selfY: this.element.board.attrs.y,
                };
            });
            this.selfX = this.element.board.attrs.x;
            this.selfY = this.element.board.attrs.y;
            this.props.setSensorData(sensorName.LSM6DSL, Map({
                x: this.element.board.attrs.x,
                y: this.element.board.attrs.y,
                inMotion: true,
            }));
        });
        this.element.board.on('dragend', () => {
            this.element.image.to({
                duration: 0.5,
                easing: this.elasticEaseOut,
                // scaleX: shape.getAttr('startScale'),
                // scaleY: shape.getAttr('startScale'),
                shadowOffsetX: 0,
                shadowOffsetY: 0,
            });
            this.props.setSensorData(sensorName.LSM6DSL, Map({
                inMotion: false,
            }));
        });
        if (!window.devkitPlayground) {
            window.devkitPlayground = Object.assign({}, this.element);
        }
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.onResize);
    }

    render() {
        return (
            <Stage ref={el => { this.stage = el; }} className={`board-container`} width={this.state.board.cWidth} height={this.state.board.cHeight} >
                <Layer >
                    <Group ref={el => { this.element.board = el; }} draggable={true} x={this.state.selfX} y={this.state.selfY} width={this.state.board.bWidth} height={this.state.board.bHeight}>
                        <KonvaImage shadowBlur={10} ref={el => { this.element.image = el; }} width={this.state.board.bWidth} height={this.state.board.bHeight} image={this.state.boardImage} />
                        <OLED switchOn={this.props.switchOn} ref={el => { this.element.oled = el; }} sensorName={sensorName.OLED} x={0.2776 * this.state.board.bWidth} y={0.5687 * this.state.board.bHeight}
                            w={0.4522 * this.state.board.bWidth} h={0.4522 * this.state.board.bWidth * 0.5} />
                        <Button setSensorData={this.props.setSensorData} ref={el => { this.element.buttonA = el; }} data={this.props.sensor.get(sensorName.BUTTON_A)} sensorName={sensorName.BUTTON_A} x={0.1325 * this.state.board.bWidth} y={0.6180 * this.state.board.bHeight} r={0.0320 * this.state.board.bWidth} />
                        <Button setSensorData={this.props.setSensorData} ref={el => { this.element.buttonB = el; }} data={this.props.sensor.get(sensorName.BUTTON_B)} sensorName={sensorName.BUTTON_B} x={0.8710 * this.state.board.bWidth} y={0.6200 * this.state.board.bHeight} r={0.0320 * this.state.board.bWidth} />
                        <LED switchOn={this.props.switchOn} setSensorData={this.props.setSensorData} ref={el => { this.element.led = el; }} data={this.props.sensor.get(sensorName.LED)} sensorName={sensorName.LED} x={0.1274 * this.state.board.bWidth} y={0.7371 * this.state.board.bHeight} r={0.0232 * this.state.board.bWidth} />
                        <HTS221 setSensorData={this.props.setSensorData} ref={el => { this.element.hts221 = el; }} data={this.props.sensor.get(sensorName.HTS221)} sensorName={sensorName.HTS221} x={0.26 * this.state.board.bWidth} y={0.8136 * this.state.board.bHeight}
                            w={0.09 * this.state.board.bWidth} h={0.0353 * this.state.board.bHeight} />
                        <LSM6DSL setSensorData={this.props.setSensorData} ref={el => { this.element.lsm6dsl = el; }} data={this.props.sensor.get(sensorName.LSM6DSL)} sensorName={sensorName.LSM6DSL} x={0.45 * this.state.board.bWidth} y={0.8136 * this.state.board.bHeight}
                            w={0.11 * this.state.board.bWidth} h={0.0353 * this.state.board.bHeight} />
                        <Reset resetBoard={this.props.resetBoard} x={0.9323 * this.state.board.bWidth} y={0.2408 * this.state.board.bHeight} r={0.0267 * this.state.board.bWidth} />
                    </Group>
                </Layer>
            </Stage>
        );
    }
}

export default Board;