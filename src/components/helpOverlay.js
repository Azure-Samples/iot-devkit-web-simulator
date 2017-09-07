import React, { Component } from 'react';
import { traceEvent } from '../lib/telemetry';
import '../common.scss';
import Localization from '../localization/localization';
import img1 from '../img/step1.png';
import img2 from '../img/step2.png';
import img3 from '../img/step3.png';
import img4 from '../img/step4.png';
import img5 from '../img/step5.png';
import arrow1 from '../img/arrow1.png';
import arrow2 from '../img/arrow2.png';
import arrow3 from '../img/arrow3.png';
import shakeImg from '../img/shake.png';
import * as GUIDE from '../constants/guide';

const ARROW_WIDTH = 20;
const ARROW_HEIGHT = 30;
const ARROW_PADDING = 5;
const DOT_RADIUS = 10;
const GUIDE_WIDTH = 544;
class GuideModal extends Component {
    render() {
        let { x, y, textTitle, textContent, image } = this.props;
        return (
            <div style={{ top: y, left: x, flexFlow: (this.props.reverse && 'row-reverse') }} className="guide-modal">
                <div className="guide-text-container">
                    <div className="guide-text">
                        <div className="guide-text-title">{textTitle}</div>
                        <div className="guide-text-content">{textContent}</div>
                        {this.props.externalLink && <div className="guide-external-link"><a target="_blank" href={this.props.externalLink.link} className="link">{this.props.externalLink.text}</a></div>}
                        {this.props.nextStep && <div className="guide-next-step" style={this.props.nextStepOnLeft?{flexFlow:"row"}:{}}><span onClick={this.props.nextStep} className="step">{this.props.nextStepText ? this.props.nextStepText : Localization.getLocalizedString().guideNextStep}</span></div>}
                    </div>
                </div>
                <div className="guide-picture"><img src={image} /></div>
            </div>
        )
    }
}

class GuideArrow extends Component {
    render() {
        let { x, y, position } = this.props;
        let style;
        if (position === 3) {
            style = {
                top: y,
                left: x,
                borderTopWidth: 15,
                borderRightWidth: 20,
                borderBottomWidth: 15,
                borderLeftWidth: 0,
                borderTopColor: 'transparent',
                borderRightColor: 'white',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
            }
        } else if (position === 0) {
            style = {
                top: y,
                left: x,
                borderTopWidth: 0,
                borderRightWidth: 15,
                borderBottomWidth: 20,
                borderLeftWidth: 15,
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'white',
                borderLeftColor: 'transparent',
            }
        } else if (position === 1) {
            style = {
                top: y,
                left: x,
                borderTopWidth: 15,
                borderRightWidth: 0,
                borderBottomWidth: 15,
                borderLeftWidth: 20,
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'white',
            }
        }
        return (
            <div style={style} className="guide-arrow" />
        )
    }
}

class HelpOverlay extends Component {
    constructor(props) {
        super(props);
    }

    onClose = () => {
        this.props.toggleHelpState();
        if (this.state.step === this.state.numOfSteps - 1) {
            traceEvent('help-complete');
        }
        this.setState(() => {
            return {
                step: 0,
                subStep: 0
            }
        });
    }

    render() {
        const { guideId, guidePosition } = this.props;
        if (!guidePosition) {
            return null;
        }
        let displayModule;
        if (guideId === GUIDE.PROJECT) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width + ARROW_WIDTH + ARROW_PADDING}
                    y={guidePosition.top}
                    textTitle={Localization.getLocalizedString().guideStepFileTitle}
                    textContent={Localization.getLocalizedString().guideStepFileDetail}
                    image={img1} />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.EDITOR) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width + ARROW_WIDTH + ARROW_PADDING}
                    y={guidePosition.top}
                    textTitle={Localization.getLocalizedString().guideStepCodeTitle}
                    textContent={Localization.getLocalizedString().guideStepCodeDetail}
                    nextStep={this.props.switchGuide.bind(this, GUIDE.EDITOR + 1)} 
                    image={img2} />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.CONFIG_CLOUD) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width + ARROW_WIDTH + ARROW_PADDING}
                    y={guidePosition.top}
                    textTitle={Localization.getLocalizedString().guideStepDeployTitle}
                    textContent={Localization.getLocalizedString().guideStepDeployDetail}
                    externalLink={{ text: Localization.getLocalizedString().guideStepDeployLinkName, link: Localization.getLocalizedString().guideStepDeployLinkHref }} 
                    image={img3} />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.CONFIG_LOCAL) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width + ARROW_WIDTH + ARROW_PADDING}
                    y={guidePosition.top}
                    textTitle={Localization.getLocalizedString().guideStepFillCSTitle}
                    textContent={Localization.getLocalizedString().guideStepFillCSDetail}
                    externalLink={{ text: Localization.getLocalizedString().guideStepFillCSLinkName, link: Localization.getLocalizedString().guideStepFillCSLinkHref }} 
                    image={img4} />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.CONFIG_ERROR) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width + ARROW_WIDTH + ARROW_PADDING}
                    y={guidePosition.top}
                    textTitle={Localization.getLocalizedString().guideStepFillCSErrorTitle}
                    textContent={Localization.getLocalizedString().guideStepFillCSErrorDetail}
                    externalLink={{ text: Localization.getLocalizedString().guideStepFillCSErrorLinkName, link: Localization.getLocalizedString().guideStepFillCSErrorLinkHref }} 
                    image={img4} />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.CONTROL_BAR) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width - 100}
                    y={guidePosition.top + 40 + ARROW_WIDTH + ARROW_PADDING}
                    textTitle={Localization.getLocalizedString().guideStepRunTitle}
                    textContent={Localization.getLocalizedString().guideStepRunDetail} 
                    image={img2} />
                <GuideArrow x={guidePosition.left + guidePosition.width - 80}
                    y={guidePosition.top + 40 + ARROW_PADDING}
                    position={0} />
            </div>;
        } else if (guideId === GUIDE.BOARD) {
            displayModule = <div>
                <GuideModal x={guidePosition.left - GUIDE_WIDTH - ARROW_WIDTH - ARROW_PADDING}
                    y={guidePosition.top + 200}
                    reverse={true}
                    textTitle={Localization.getLocalizedString().guideStepBoardTitle}
                    textContent={Localization.getLocalizedString().guideStepBoardDetail}
                    externalLink={{ text: Localization.getLocalizedString().getAKitButton, link: Localization.getLocalizedString().buyLink }} 
                    nextStep={this.props.switchGuide.bind(this, GUIDE.CLOSE)}
                    nextStepOnLeft={true}
                    nextStepText="I'm done" 
                    image={img5} />
                <GuideArrow x={guidePosition.left - ARROW_WIDTH - ARROW_PADDING}
                    y={guidePosition.top + 250}
                    position={1} />
                
            </div>;
        }

        return (
            <div>
                <div className="overlay" style={{ display: guideId === GUIDE.CLOSE ? "none" : "flex" }}>
                    {displayModule}
                    <span onClick={this.props.switchGuide.bind(this, GUIDE.CLOSE)} className="close-guide" ><i className="fa fa-times" aria-hidden="true"></i>{Localization.getLocalizedString().guideTurnOff}</span>
                </div>

                <div className="guide-dot" style={{ display: guideId === GUIDE.CLOSE ? "none" : "block", top: guidePosition.dotY - DOT_RADIUS, left: guidePosition.dotX - DOT_RADIUS }} >
                    <span className="guide-outer-dot">
                        <span className="guide-inner-dot"></span>
                    </span>
                </div>

                <img className="shake-icon" style={{ display: guideId !== GUIDE.BOARD ? "none" : "block",left: guidePosition.left+10, top: guidePosition.top+10 }} src={shakeImg} />
            </div>
        );
    }
}

export default HelpOverlay;