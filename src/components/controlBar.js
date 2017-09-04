import React, { Component } from 'react';
// import {Glyphicon} from 'react-bootstrap';
import Localization from '../localization/localization';

class ControlBar extends Component {
    componentDidMount() {
        let { top, left, right, bottom, width, height } = this.refs.controlBar.getBoundingClientRect();
        this.props.setComponentSize({
            top, left, right, bottom, width, height,
        });
    }
    
    render() {
        return (
            <div ref="controlBar" className={`controlBar ${this.props.highlight && 'highlight'}`} >
                <span className={`run-button ${this.props.isSampleRunning ? 'stop' : ''}`} onClick={this.props.isSampleRunning ? this.props.stopSample : this.props.runSample}>
                    <i className={`fa ${this.props.isSampleRunning ? 'fa-stop' : 'fa-play'}`} aria-hidden="true"></i>
                    {this.props.isSampleRunning ? Localization.getLocalizedString().buttonStop : Localization.getLocalizedString().buttonRun}
                </span>
                <span className="run-info">{this.props.runningInfo}</span>
                {/*<span className='rightBtn' onClick={this.props.toggleConsole}><Glyphicon glyph={this.props.consoleHide ? 'chevron-up' : 'chevron-down'} /></span>*/}
            </div>
        );
    }
}

export default ControlBar;