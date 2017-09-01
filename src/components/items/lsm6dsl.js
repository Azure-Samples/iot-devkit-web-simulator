import React from 'react';
import { Rect, Text, Group } from 'react-konva';
import { Map } from 'immutable';

class LSM6DSL extends React.Component {
    clearDistance = () => {
        this.props.setSensorData(this.props.sensorName,Map({
            distance: 0,
        }));
    }

    componentDidMount() {
        // setInterval(()=>console.log(this.props.data.get('distance')),300);
        // setInterval(()=>console.log(this.props.data.get('inMotion')),300);
    }

    getDistance = () => this.props.data.get('distance');

    render() {
        return (
            <Group>
                {/*<Rect
                    x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h}
                    fill={"black"} />
                <Text x={this.props.x} y={this.props.y} width={this.props.w} lineHeight={this.props.h / 4} padding={2} text={this.props.sensorName} fill="white" fontSize={8} />
                <Text x={this.props.x} y={this.props.y + this.props.h / 2} width={this.props.w} lineHeight={this.props.h / 4} padding={2} text={Math.round(this.props.data.get('x')) + " / " + Math.round(this.props.data.get('y'))} fill="white" fontSize={8} />*/}
            </Group>
        );
    }
}

export default LSM6DSL;