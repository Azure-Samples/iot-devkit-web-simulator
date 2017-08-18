import React from 'react';
import ReactDOM from 'react-dom';
import { Rect, Text, Group } from 'react-konva';

class OLED extends React.Component {
    constructor(props) {
        super(props);
        window.devkitPlayground.items.oled = this;
        this.state = {
            line: ["", "", "", ""]
        };
        this.font = {
            size: 22
        }
    }

    clean = () => {
        this.setState(() => {
            return {
                line: ["", "", "", ""]
            }
        })
    }

    print = (line, content, wrap) => {
        // overload for 2 arguments
        if(arguments.length == 2) {
            wrap = content;
            content = line;
            line = 0;
        }
        if (wrap) {
            this.setState((prev) => {
                var newLine = prev.line;
                for (let l = line; l < 4; l++) {
                    if (content.length > (l - line) * 16) {
                        newLine[l] = content.substring(16 * (l - line), 16 * (l - line + 1));
                    }
                }
                return {
                    line: newLine
                }
            });
        } else {
            this.setState((prev) => {
                var newLine = prev.line;
                newLine[line] = content.substring(0, 16);
                return {
                    line: newLine
                }
            });
        }
    }

    render() {
        return (
            <Group>
                <Rect
                    x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h}
                    fill={"black"} />
                <Text x={this.props.x} y={this.props.y} width={this.props.w} lineHeight={this.props.h / 4} text={this.state.line[0]} fill="#ffde84" padding={5} fontSize={this.font.size} fontFamily="serif" />
                <Text x={this.props.x} y={this.props.y + this.props.h / 4} width={this.props.w} lineHeight={this.props.h / 4} text={this.state.line[1]} fill="#a2e2f2" padding={5} fontSize={this.font.size} fontFamily="serif" />
                <Text x={this.props.x} y={this.props.y + this.props.h / 4 * 2} width={this.props.w} lineHeight={this.props.h / 4} text={this.state.line[2]} fill="#a2e2f2" padding={5} fontSize={this.font.size} fontFamily="serif" />
                <Text x={this.props.x} y={this.props.y + this.props.h / 4 * 3} width={this.props.w} lineHeight={this.props.h / 4} text={this.state.line[3]} fill="#a2e2f2" padding={5} fontSize={this.font.size} fontFamily="serif" />
            </Group>
        );
    }
}

export default OLED;