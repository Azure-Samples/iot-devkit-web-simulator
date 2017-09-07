import React, { Component } from 'react';
// import rpiLogo from '../img/rpi-logo.png'
import HelpButton from './helpButton';
import Localization from '../localization/localization';
import { traceEvent } from '../lib/telemetry';
import '../common.scss';

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        {/*<img src={rpiLogo} alt={Localization.getLocalizedString().altRaspberryPiLogo}/>*/}
        <span>{window.innerWidth<=768?Localization.getLocalizedString().pageTitleMobile:Localization.getLocalizedString().pageTitle}</span>
        <HelpButton 
          switchGuide = {this.props.switchGuide} />
        <a onClick={traceEvent.bind(this,'buy-clicked')} className="no-underline banner-button buy-link" target="_blank" href={Localization.getLocalizedString().buyLink} ><i className="fa fa-shopping-cart" aria-hidden="true"></i>{Localization.getLocalizedString().buyButton}</a>  
      </div>
    );
  }
}

export default Banner;