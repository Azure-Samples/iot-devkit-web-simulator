import React from 'react';
import { Circle } from 'react-konva';
import { Map } from 'immutable';

class Button extends React.Component {
    handleDown = () => {
        this.props.setSensorData(this.props.sensorName,Map({
            down: true,
        }));
    }
    handleUp = () => {
        this.props.setSensorData(this.props.sensorName,Map({
            down: false,
        }));
    }
    getSwitch = () => this.props.data.get('down')

    render() {
        return (
            <Circle
                x={this.props.x} y={this.props.y} radius={this.props.r} fill={this.props.data.get('down') ? "black" : ""}
                onMouseDown={this.handleDown} onMouseUp={this.handleUp}
            />
        );
    }
}

export default Button;