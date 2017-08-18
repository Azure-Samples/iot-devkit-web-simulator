import React from 'react';
import ReactDOM from 'react-dom';
import { Rect, Text, Group } from 'react-konva';

class LSM6DSL extends React.Component {
    constructor(props) {
        super(props);
        window.devkitPlayground.items.lsm6dsl = this;
        this.state = {
            x: 0,
            y: 0,
            z: 0,
            inMotion: false
        };
        this.distance = 0;
    }

    componentDidUpdate(prevProps,prevStates) {
        if(prevStates.inMotion && !this.state.inMotion) {
            // console.log(this.distance);
        }else if(!prevStates.inMotion && this.state.inMotion) {
            this.distance = 0;
        }else if(prevStates.inMotion && this.state.inMotion) {
            this.distance += (Math.abs(prevStates.x-this.state.x)+Math.abs(prevStates.y-this.state.y));
        }
        
    }

    clearDistance = () => {
        this.distance = 0;
    }

    render() {
        return (
            <Group>
                <Rect
                    x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h}
                    fill={"black"} />
                <Text x={this.props.x} y={this.props.y} width={this.props.w} lineHeight={this.props.h / 4} padding={2} text="LSM6DSL" fill="white" fontSize={8} />
                <Text x={this.props.x} y={this.props.y + this.props.h / 2} width={this.props.w} lineHeight={this.props.h / 4} padding={2} text={Math.round(this.state.x) + " / " + Math.round(this.state.y)} fill="white" fontSize={8} />
            </Group>
        );
    }
}

export default LSM6DSL;