import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Localization from '../localization/localization';
import { traceEvent } from '../lib/telemetry.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../common.scss';

import Banner from '../containers/banner';
import HelpOverlay from '../containers/helpOverlay';
import ControlBar from '../containers/controlBar';
import MyConsole from '../containers/console';
import Editor from '../containers/editor';
import Project from '../containers/project';
import Board from '../containers/board';

import { tracePageView, tracePageViewAI } from '../lib/telemetry.js';

class App extends Component {
    constructor(props) {
        super(props);
        tracePageView();
        tracePageViewAI();
        // this.state = {
        //     console: {
        //         consoleMsg: '',
        //         consoleErr: '',
        //     },
        //     LEDTurnOn: false,
        //     isRunning: false,
        //     showHelp: false
        // }
        if (typeof (Storage) !== "undefined") {
            var disableHelp = localStorage.getItem("disable-help");
            if (disableHelp == null) {
                traceEvent('help-open-first');
                this.state.showHelp = true;
                localStorage.setItem("disable-help", "true");
            }
        }
        // this.runApp = this.runApp.bind(this);
        // this.ledSwitch = this.ledSwitch.bind(this);
        // this.onError = this.onError.bind(this);
        // this.onMessage = this.onMessage.bind(this);
        // this.onFinish = this.onFinish.bind(this);
    }

    // runApp() {
    //     if (this.state.isRunning) { return; }

    //     var option = {
    //         onMessage: this.onMessage,
    //         onError: this.onError,
    //         ledSwitch: this.ledSwitch,
    //         turnOff: this.turnOff,
    //         onFinish: this.onFinish
    //     }

    //     this.setState(function () {
    //         return {
    //             isRunning: true,
    //             console: {}
    //         }
    //     });
    //     this.sample = new Sample();
    //     this.sample.run(option);
    // }

    // stopApp = () => {
    //     this.onMessage(Localization.getLocalizedString().consoleSampleStopped + '.');
    //     this.sample.stop();
    //     this.onFinish();
    // }

    // onMessage(message) {
    //     this.setState(function () {
    //         return {
    //             console: {
    //                 consoleMsg: message
    //             }
    //         };
    //     });
    // }
    // onError(error) {
    //     this.setState(function () {
    //         return {
    //             console: {
    //                 consoleErr: error.message || JSON.stringify(error)
    //             }
    //         };
    //     });
    // }
    render() {
        // const { console, LEDTurnOn, isRunning, showHelp } = this.state;
        return (
            <div className='main'>
                <Banner />
                <div className='main-container'>
                    <div className='left-container'>
                    <Board />
                    </div>
                    <Project />
                    <div className='right-container'>
                        
                        <Editor />
                        <ControlBar />
                        <MyConsole />
                    </div>
                </div>
                <HelpOverlay />

                {/*<Banner 
        toggleHelpState = {this.toggleHelpState} />
        {
          1 === 0 ? (<Toolbar onRunApp={this.runApp} />) : ('')
        }
        <Display
          consoleMsg={console.consoleMsg}
          consoleErr={console.consoleErr}
          onStart={this.runApp}
          onStop={this.stopApp}
          isRunning={isRunning}
          turnOn={LEDTurnOn} />
        
        <HelpOverlay
          needShowHelp = {showHelp}
          toggleHelpState = {this.toggleHelpState} />*/}
            </div>
        );
    }
}

export default App;