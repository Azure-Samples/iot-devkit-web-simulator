import React, { Component } from 'react';
import { traceEvent } from '../lib/telemetry.js';
import '../common.scss';
import Localization from '../localization/localization';

class HelpButton extends Component {
  onClick = () => {
      this.props.toggleHelpState();
      traceEvent('help-open');
  }
  
  render() {
    return (
      <span className='banner-button' onClick={this.onClick}>
        {Localization.getLocalizedString().helpButton}
      </span>
    );
  }
}

export default HelpButton;