import React from 'react';
import ReactDOM from 'react-dom';
import { Circle } from 'react-konva';

class Button extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            switch: false,
            color: "grey"
        };
    }
    handleDown = () => {
        this.setState({
            switch: true,
            color: "black"
        });
    }
    handleUp = () => {
        this.setState({
            switch: false,
            color: "grey"
        });
    }
    render() {
        return (
            <Circle
                x={this.props.x} y={this.props.y} radius={this.props.r} fill={this.state.color}
                onMouseDown={this.handleDown} onMouseUp={this.handleUp}
            />
        );
    }
}

export default Button;