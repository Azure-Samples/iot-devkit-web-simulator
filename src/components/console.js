import React, { Component } from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';

class MyConsole extends Component {

    componentDidUpdate(prevProps, prevState) {
        this.writeLine(this.props.message.substring(prevProps.message.length));
        this.writeLine(this.props.error);
    }

    writeLine = (msg) => {
        if (!msg) { return; }
        this.myConsole.acceptLine();
        this.myConsole.log(msg);
        this.myConsole.return();
    }

    echo = (text) => {
        if (text.trim() === 'npm start') {
            this.props.onStart();
        } else {
            this.myConsole.return();
        }
    }

    promptLabel() {
        return '';
    }

    render() {
        return (
            <div className={'showConsole'}>
                <Console ref={(Console) => { this.myConsole = Console; }}
                    handler={()=>{}}
                    promptLabel={this.promptLabel}
                    value={this.props.error}
                    autofocus={false}
                    welcomeMessage={this.props.welcomeMessage}
                />
            </div>
        );
    }
}

export default MyConsole;
