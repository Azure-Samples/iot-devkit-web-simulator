import React, { Component } from 'react';
import rpiLogo from '../img/rpi-logo.png'
import HelpButton from './helpButton';
import Localization from '../localization/localization';
import '../common.scss';

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <img src={rpiLogo} alt={Localization.getLocalizedString().altRaspberryPiLogo}/>
        <span>{window.innerWidth<=768?Localization.getLocalizedString().pageTitleMobile:Localization.getLocalizedString().pageTitle}</span>
        <HelpButton 
          switchHelp = {this.props.switchHelp} />
      </div>
    );
  }
}

export default Banner;