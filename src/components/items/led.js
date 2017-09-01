import React from 'react';
import { Circle } from 'react-konva';
import { Map } from 'immutable';

class LED extends React.Component {
    setColor = (r, g, b) => {
        this.props.setSensorData(this.props.sensorName,Map({
            r,
            g,
            b,
            on: true,
        }));
    }
    componentToHex = (c) => {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    turnOff = () => {
        this.props.setSensorData(this.props.sensorName,Map({
            on: false,
        }));
    }

    rgbToHex = (r, g, b) => {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    render() {
        const colorHex = this.rgbToHex(this.props.data.get('r'),this.props.data.get('g'),this.props.data.get('b'));
        return (
            <Circle
                x={this.props.x} y={this.props.y} radius={this.props.r}
                fill={this.props.data.get('on') && this.props.switchOn ? colorHex : "white"}
            />
        );
    }
}

export default LED;