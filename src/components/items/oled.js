import React from 'react';
import { Rect, Text, Group } from 'react-konva';
import { Map, is } from 'immutable';

class OLED extends React.Component {
    constructor(props) {
        super(props);
        this.font = {
            size: 22
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[zhiqing.qiu] same?',ies(this.props.data ,nextProps.data));
    //     if(is(this.props.data ,nextProps.data)) {
    //         return false;
    //     }else {
    //         this.forceUpdate();
    //     }
    // }

    clean = () => {
        this.props.setSensorData(this.props.sensorName, Map({
            0: "",
            1: "",
            2: "",
            3: "",
        }));
    }

    print = (line, content, wrap) => {
        // overload for 2 arguments
        // if(arguments.length === 2) {
        //     wrap = content;
        //     content = line;
        //     line = 0;
        // }
        if (wrap) {
            var newMap = Map({});
            for (let l = line; l < 4; l++) {
                if (content.length > (l - line) * 16) {
                    newMap = newMap.set(l.toString(), content.substring(16 * (l - line), 16 * (l - line + 1)));
                }
            }
            this.props.setSensorData(this.props.sensorName, newMap);
        } else {
            this.props.setSensorData(this.props.sensorName, Map({}).set(line.toString(), content.substring(0, 16)));
        }
    }

    render() {
        return (
            <Group>
                <Rect
                    x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h}
                    fill={"black"} />
                <Text x={this.props.x} y={this.props.y} width={this.props.w} lineHeight={this.props.h / 4} text={this.props.data.get('0')} fill="#ffde84" padding={5} fontSize={this.font.size} fontFamily="serif" />
                <Text x={this.props.x} y={this.props.y + this.props.h / 4} width={this.props.w} lineHeight={this.props.h / 4} text={this.props.data.get('1')} fill="#a2e2f2" padding={5} fontSize={this.font.size} fontFamily="serif" />
                <Text x={this.props.x} y={this.props.y + this.props.h / 4 * 2} width={this.props.w} lineHeight={this.props.h / 4} text={this.props.data.get('2')} fill="#a2e2f2" padding={5} fontSize={this.font.size} fontFamily="serif" />
                <Text x={this.props.x} y={this.props.y + this.props.h / 4 * 3} width={this.props.w} lineHeight={this.props.h / 4} text={this.props.data.get('3')} fill="#a2e2f2" padding={5} fontSize={this.font.size} fontFamily="serif" />
            </Group>
        );
    }
}

export default OLED;