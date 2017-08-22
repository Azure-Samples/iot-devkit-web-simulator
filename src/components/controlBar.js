import React, { Component } from 'react';
// import {Glyphicon} from 'react-bootstrap';
import Localization from '../localization/localization';

class ControlBar extends Component {
  render() {
    return (
      <div className='controlBar'>
        <span onClick={this.props.isSampleRunning ? this.props.stopSample : this.props.runSample}>{this.props.isSampleRunning ?  Localization.getLocalizedString().buttonStop : '▶  ' + Localization.getLocalizedString().buttonRun}</span>
        {/*<span className='rightBtn' onClick={this.props.toggleConsole}><Glyphicon glyph={this.props.consoleHide ? 'chevron-up' : 'chevron-down'} /></span>*/}
      </div>
    );
  }
}

export default ControlBar;