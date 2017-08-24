import React, { Component } from 'react';
import rpiLogo from '../img/rpi-logo.png'
import HelpButton from './helpButton';
import Localization from '../localization/localization';
import '../common.scss';
import cart from '../img/cart.png';

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        {/*<img src={rpiLogo} alt={Localization.getLocalizedString().altRaspberryPiLogo}/>*/}
        <span>{window.innerWidth<=768?Localization.getLocalizedString().pageTitleMobile:Localization.getLocalizedString().pageTitle}</span>
        <HelpButton 
          switchHelp = {this.props.switchHelp} />
        <a className="no-underline banner-button buy-link" target="_blank" href="http://mxchip.com/az3166" ><img src={cart} className="cart"/><span>Buy</span></a>  
      </div>
    );
  }
}

export default Banner;