import React from 'react';
import { Rect, Text, Group } from 'react-konva';
import { Map } from 'immutable';

class HTS221 extends React.Component {
    random = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    getTempature = () => {
        var newTempature = this.random(20, 32).toFixed(2);
        this.props.setSensorData(this.props.sensorName,Map({
            temperature: newTempature,
        }));
        return newTempature;
    }

    getHumidity = () => {
        var newHumidity = this.random(60, 80).toFixed(2);
        this.props.setSensorData(this.props.sensorName,Map({
            humidity: newHumidity,
        }));
        return newHumidity;
    }

    render() {
        return (
            <Group>
                {/*<Rect
                    x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h}
                    fill={"black"} />
                <Text x={this.props.x} y={this.props.y} width={this.props.w} lineHeight={this.props.h / 4} padding={2} text={this.props.sensorName} fill="white" fontSize={8} />
                <Text x={this.props.x} y={this.props.y + this.props.h / 2} width={this.props.w}
                    lineHeight={this.props.h / 4} padding={2}
                    text={Math.round(this.props.data.get('temperature')) + " / " + Math.round(this.props.data.get('humidity'))} fill="white" fontSize={8} />*/}
            </Group>
        );
    }
}

export default HTS221;