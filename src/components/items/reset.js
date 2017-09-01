import React from 'react';
import { Circle } from 'react-konva';
import { Map } from 'immutable';

class Reset extends React.Component {
    render() {
        return (
            <Circle
                x={this.props.x} y={this.props.y} radius={this.props.r}
                onClick={this.props.resetBoard} fill="white"
            />
        );
    }
}

export default Reset;