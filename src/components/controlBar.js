import React, { Component } from 'react';
// import {Glyphicon} from 'react-bootstrap';
import Localization from '../localization/localization';

class ControlBar extends Component {
    reportPosition = () => {
        let { top, left, right, bottom, width, height } = this.refs.controlBar.getBoundingClientRect();
        let dotX = right - 120;
        let dotY = top + height / 2;
        this.props.setComponentSize({
            top, left, right, bottom, width, height, dotX, dotY,
        });
    }
    
    componentDidMount() {
        this.reportPosition();
        window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.onResize);
    }

    onResize = () => {
        this.reportPosition();
    }

    handleClick = () => {
        if (this.props.isSampleRunning) {
            this.props.stopSample();
        } else {
            this.props.runSample();
            if (this.props.highlight) {
                this.props.switchGuide();
            }
        }
    }

    render() {
        return (
            <div ref="controlBar" className={`controlBar ${this.props.highlight && 'highlight'}`} >
                <span className={`run-button ${this.props.isSampleRunning ? 'stop' : ''}`} onClick={this.handleClick}>
                    <i className={`fa ${this.props.isSampleRunning ? 'fa-stop' : 'fa-play'}`} aria-hidden="true"></i>
                    {this.props.isSampleRunning ? Localization.getLocalizedString().stopButton : Localization.getLocalizedString().runButton}
                </span>
                <span className="run-info">{this.props.runningInfo}</span>
                {/*<span className='rightBtn' onClick={this.props.toggleConsole}><Glyphicon glyph={this.props.consoleHide ? 'chevron-up' : 'chevron-down'} /></span>*/}
            </div>
        );
    }
}

export default ControlBar;