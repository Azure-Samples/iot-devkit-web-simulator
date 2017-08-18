import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Store, toImmutable } from 'nuclear-js';
import { Reactor } from 'nuclear-js';
import { Layer, Circle, Rect, Stage, Group, Image as KonvaImage } from 'react-konva';
import './board.scss';
import LED from './items/led';
import Button from './items/button';
import OLED from './items/oled';
import HTS221 from './items/hts221';
import LSM6DSL from './items/lsm6dsl';
import devkitImage from '../../img/devkit-board.png';

class Board extends Component {
    constructor(props) {
        super(props);
        window.devkitPlayground.items = {};
        this.board = {
            cWidth: 700,
            cHeight: 700,
            bWidth: 400,
            bHeight: 611,
        }
        this.selfX = (this.board.cWidth - this.board.bWidth) / 2;
        this.selfY = (this.board.cHeight - this.board.bHeight) / 2;
        this.state = {
            boardImage: null,
        }
    }

    componentDidMount() {
        const image = new window.Image();
        image.src = devkitImage;
        image.onload = () => {
            this.setState({
                boardImage: image
            });
        }
        this.boardGroup.on('dragstart', () => {
            this.MotionSensor.setState(() => {
                return {
                    inMotion: true
                }
            });
        });
        this.boardGroup.on('dragmove', () => {
            this.selfX = this.boardGroup.attrs.x;
            this.selfY = this.boardGroup.attrs.y;
            this.MotionSensor.setState(() => {
                return {
                    x: this.boardGroup.attrs.x,
                    y: this.boardGroup.attrs.y
                }
            });
        });
        this.boardGroup.on('dragend', () => {
            this.MotionSensor.setState(() => {
                return {
                    inMotion: false
                }
            });
        });
        window.devkitPlayground.items.buttonA = this.buttonA;
        window.devkitPlayground.items.buttonB = this.buttonB;
    }

    render() {
        return (
            <Stage width={this.board.cWidth} height={this.board.cHeight} >
                <Layer >
                    <Group ref={el => { this.boardGroup = el; }} draggable={true} x={this.selfX} y={this.selfY} width={this.board.bWidth} height={this.board.bHeight}>
                        <KonvaImage width={this.board.bWidth} height={this.board.bHeight} image={this.state.boardImage} />
                        <OLED x={0.26 * this.board.bWidth} y={0.5136 * this.board.bHeight}
                            w={0.4767 * this.board.bWidth} h={0.2353 * this.board.bHeight} />
                        <Button ref={el => { this.buttonA = el; }} x={0.1140 * this.board.bWidth} y={0.6052 * this.board.bHeight} r={0.0363 * this.board.bWidth} />
                        <Button ref={el => { this.buttonB = el; }} x={0.8912 * this.board.bWidth} y={0.6052 * this.board.bHeight} r={0.0363 * this.board.bWidth} />
                        <LED x={0.1174 * this.board.bWidth} y={0.7251 * this.board.bHeight} r={0.0242 * this.board.bWidth} />
                        <HTS221 x={0.26 * this.board.bWidth} y={0.8136 * this.board.bHeight}
                            w={0.09 * this.board.bWidth} h={0.0353 * this.board.bHeight} />
                        <LSM6DSL ref={el => { this.MotionSensor = el; }} x={0.45 * this.board.bWidth} y={0.8136 * this.board.bHeight}
                            w={0.11 * this.board.bWidth} h={0.0353 * this.board.bHeight} />
                    </Group>
                </Layer>
            </Stage>
        );
    }
}

export default Board;