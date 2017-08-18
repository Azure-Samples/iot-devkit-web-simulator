import React from 'react';
import ReactDOM from 'react-dom';
import { Circle } from 'react-konva';

class LED extends React.Component {
    constructor(props) {
        super(props);
        window.devkitPlayground.items.led = this;
        this.state = {
            color: "black",
            switch: false
        };
    }
    setColor = (r, g, b) => {
        this.setState(() => {
            return {
                switch: true,
                color: this.rgbToHex(r,g,b)
            }
        });
    }
    turnOff = () => {
        this.setState(() => {
            return {
                switch: false
            }
        });
    }
    componentToHex = (c) => {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgbToHex = (r, g, b) => {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    render() {
        return (
            <Circle
                x={this.props.x} y={this.props.y} radius={this.props.r}
                fill={this.state.switch?this.state.color:"black"}
            />
        );
    }
}

export default LED;