import React, { Component } from 'react';
import { Layer, Stage, Group, Image as KonvaImage } from 'react-konva';
import '../common.scss';
import LED from './items/led';
import Button from './items/button';
import OLED from './items/oled';
import HTS221 from './items/hts221';
import LSM6DSL from './items/lsm6dsl';
import devkitImage from '../img/devkit-board.png';
import { Map } from 'immutable';
import * as sensorName from '../constants/sensorName';

class Board extends Component {
    constructor(props) {
        super(props);
        this.board = {
            cWidth: 700,
            cHeight: 700,
            bWidth: 400,
            bHeight: 611,
        }
        this.element = {};
        this.selfX = (this.board.cWidth - this.board.bWidth) / 2;
        this.selfY = (this.board.cHeight - this.board.bHeight) / 2;
        this.state = {
            boardImage: null,
        }
    }

    componentDidUpdate() {
        console.log('[zhiqing.qiu] board component did update')
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = devkitImage;
        image.onload = () => {
            this.setState({
                boardImage: image
            });
        }
        this.element.board.on('dragstart', () => {
            this.props.setSensorData(sensorName.LSM6DSL, Map({
                inMotion: true,
            }));
        });
        this.element.board.on('dragmove', () => {
            this.selfX = this.element.board.attrs.x;
            this.selfY = this.element.board.attrs.y;
            this.props.setSensorData(sensorName.LSM6DSL, Map({
                x: this.element.board.attrs.x,
                y: this.element.board.attrs.y,
                inMotion: true,
            }));
        });
        this.element.board.on('dragend', () => {
            this.props.setSensorData(sensorName.LSM6DSL, Map({
                inMotion: false,
            }));
        });
        if (!window.devkitPlayground) {
            window.devkitPlayground = Object.assign({}, this.element);
        }
        // setInterval(()=>{
        //     console.log('[zhiqing.qiu] ',...this.props.sensor.get(sensorName.OLED).get('text'))
        // },300);
    }

    render() {
        return (
            <Stage width={this.board.cWidth} height={this.board.cHeight} >
                <Layer >
                    <Group ref={el => { this.element.board = el; }} draggable={true} x={this.selfX} y={this.selfY} width={this.board.bWidth} height={this.board.bHeight}>
                        <KonvaImage width={this.board.bWidth} height={this.board.bHeight} image={this.state.boardImage} />
                        <OLED setSensorData={this.props.setSensorData} ref={el => { this.element.oled = el; }} data={this.props.sensor.get(sensorName.OLED)} sensorName={sensorName.OLED} x={0.26 * this.board.bWidth} y={0.5136 * this.board.bHeight}
                            w={0.4767 * this.board.bWidth} h={0.2353 * this.board.bHeight} />
                        <Button setSensorData={this.props.setSensorData} ref={el => { this.element.buttonA = el; }} data={this.props.sensor.get(sensorName.BUTTON_A)} sensorName={sensorName.BUTTON_A} x={0.1140 * this.board.bWidth} y={0.6052 * this.board.bHeight} r={0.0363 * this.board.bWidth} />
                        <Button setSensorData={this.props.setSensorData} ref={el => { this.element.buttonB = el; }} data={this.props.sensor.get(sensorName.BUTTON_B)} sensorName={sensorName.BUTTON_B} x={0.8912 * this.board.bWidth} y={0.6052 * this.board.bHeight} r={0.0363 * this.board.bWidth} />
                        <LED setSensorData={this.props.setSensorData} ref={el => { this.element.led = el; }} data={this.props.sensor.get(sensorName.LED)} sensorName={sensorName.LED} x={0.1174 * this.board.bWidth} y={0.7251 * this.board.bHeight} r={0.0242 * this.board.bWidth} />
                        <HTS221 setSensorData={this.props.setSensorData} ref={el => { this.element.hts221 = el; }} data={this.props.sensor.get(sensorName.HTS221)} sensorName={sensorName.HTS221} x={0.26 * this.board.bWidth} y={0.8136 * this.board.bHeight}
                            w={0.09 * this.board.bWidth} h={0.0353 * this.board.bHeight} />
                        <LSM6DSL setSensorData={this.props.setSensorData} ref={el => { this.element.lsm6dsl = el; }} data={this.props.sensor.get(sensorName.LSM6DSL)} sensorName={sensorName.LSM6DSL} x={0.45 * this.board.bWidth} y={0.8136 * this.board.bHeight}
                            w={0.11 * this.board.bWidth} h={0.0353 * this.board.bHeight} />
                    </Group>
                </Layer>
            </Stage>
        );
    }
}

export default Board;