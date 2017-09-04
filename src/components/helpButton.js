import React, { Component } from 'react';
import { traceEvent } from '../lib/telemetry.js';
import '../common.scss';
import Localization from '../localization/localization';
import * as GUIDE from '../constants/guide';

class HelpButton extends Component {
  onClick = () => {
      this.props.switchGuide(GUIDE.PROJECT);
      traceEvent('help-open');
  }
  
  render() {
    return (
      <span className='banner-button' onClick={this.onClick}>
        <i className="fa fa-question-circle" aria-hidden="true"></i>{Localization.getLocalizedString().helpButton}
      </span>
    );
  }
}

export default HelpButton;