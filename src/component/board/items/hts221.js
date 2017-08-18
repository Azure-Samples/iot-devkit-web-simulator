import React from 'react';
import ReactDOM from 'react-dom';
import { Rect, Text, Group } from 'react-konva';

class HTS221 extends React.Component {
    constructor(props) {
        super(props);
        window.devkitPlayground.items.hts221 = this;
        this.state = {
            humidity: 60,
            tempature: 20
        };
    }

    random = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    getTempature = () => {
        var newTempature = this.random(20,32).toFixed(2);
        this.setState(()=>{
            return {
                tempature: newTempature
            }
        });
        return newTempature;
    }

    getHumidity = () => {
        var newHumidity = this.random(60,80).toFixed(2);
        this.setState(()=>{
            return {
                humidity: newHumidity
            }
        });
        return newHumidity;
    }

    render() {
        return (
            <Group>
                <Rect
                    x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h}
                    fill={"black"} />
                <Text x={this.props.x} y={this.props.y} width={this.props.w} lineHeight={this.props.h / 4} padding={2} text="HTS221" fill="white" fontSize={8} />
                <Text x={this.props.x} y={this.props.y+this.props.h/2} width={this.props.w} lineHeight={this.props.h / 4} padding={2} text={Math.round(this.state.tempature)+" / "+Math.round(this.state.humidity)} fill="white" fontSize={8} />
            </Group>
        );
    }
}

export default HTS221;