import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Localization from '../localization/localization';
import { traceEvent } from '../lib/telemetry.js';
// import 'bootstrap/dist/css/bootstrap.css';
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
    }

    reportPosition = () => {
        let { top, left, right, bottom, width, height } = this.refs.rightContainer.getBoundingClientRect();
        this.props.setComponentSize({
            top, left, right, bottom, width, height,
            dotX: -100,
            dotY: -100,
        });
    }

    componentDidMount() {
        if (!localStorage.getItem('disable-help')) {
            localStorage.setItem('disable-help', '1');
            this.props.openGuide();
        }
        this.reportPosition();
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.onResize);
    }

    onResize = () => {
        this.reportPosition();
    }

    render() {
        return (
            <div className='main'>
                <Banner />
                <div className='main-container'>
                    <Project />
                    <div className='center-container'>
                        <ControlBar />
                        <Editor />
                    </div>
                    <div ref="rightContainer" className={`right-container ${this.props.highlight && 'highlight'}`} >
                        <Board />
                        <div className="get-a-kit">
                            <a onClick={traceEvent.bind(this, 'buy-clicked')} className="no-underline" target="_blank" href={Localization.getLocalizedString().buyLink} >{Localization.getLocalizedString().getAKitButton}</a>
                        </div>
                        <MyConsole />
                    </div>
                </div>
                <HelpOverlay />
            </div>
        );
    }
}

export default App;