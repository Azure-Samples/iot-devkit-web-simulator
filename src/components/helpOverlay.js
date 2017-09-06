import React, { Component } from 'react';
import { traceEvent } from '../lib/telemetry';
import '../common.scss';
import Localization from '../localization/localization';
import img1 from '../img/step1.png';
import img2_1 from '../img/step2_1.png';
import img2_2 from '../img/step2_2.png';
import img2_3 from '../img/step2_3.png';
import img3_1 from '../img/step3_1.png';
import img3_2 from '../img/step3_2.png';
import arrow1 from '../img/arrow1.png';
import arrow2 from '../img/arrow2.png';
import arrow3 from '../img/arrow3.png';
import shakeImg from '../img/shake.png';
import * as GUIDE from '../constants/guide';

const ARROW_WIDTH = 20;
const ARROW_HEIGHT = 30;
const ARROW_PADDING = 5;
const DOT_RADIUS = 12;
const GUIDE_WIDTH = 544;
class GuideModal extends Component {
    render() {
        let { x, y, textTitle, textContent } = this.props;
        return (
            <div style={{ top: y, left: x, flexFlow: (this.props.reverse && 'row-reverse') }} className="guide-modal">
                <div className="guide-text-container">
                    <div className="guide-text">
                        <div className="guide-text-title">{textTitle}</div>
                        <div className="guide-text-content">{textContent}</div>
                        {this.props.nextStep && <div className="guide-next-step"><span onClick={this.props.nextStep} className="step">Next step</span></div>}
                        {this.props.externalLink && <div className="guide-external-link"><a target="_blank" href={this.props.externalLink.link} className="link">{this.props.externalLink.text}</a></div>}

                    </div>
                </div>
                <div className="guide-picture"><img src={img1} /></div>
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

    componentDidUpdate() {
        console.log(this.props.guidePosition);
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
                    textTitle="Select a file here."
                    textContent="First, select a project you want to run in this simulation, and then, select one file, you can see the code in the middle on this page." />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.EDITOR) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width + ARROW_WIDTH + ARROW_PADDING}
                    y={guidePosition.top}
                    textTitle="Code display area"
                    textContent="First, select a project you want to run in this simulation, and then, select one file, you can see the code in the middle."
                    nextStep={this.props.switchGuide.bind(this, GUIDE.EDITOR + 1)} />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.CONFIG_CLOUD) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width + ARROW_WIDTH + ARROW_PADDING}
                    y={guidePosition.top}
                    textTitle="Deploy your project to Azure"
                    textContent="First, select a project you want to run in this simulation, and then, select one file, you can see the code in the middle."
                    externalLink={{ text: "How to deploy", link: "http://www.google.com" }} />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.CONFIG_LOCAL) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width + ARROW_WIDTH + ARROW_PADDING}
                    y={guidePosition.top}
                    textTitle="Set your configurations"
                    textContent="First, select a project you want to run in this simulation, and then, select one file, you can see the code in the middle."
                    externalLink={{ text: "How to deploy and fill connection string", link: "http://www.google.com" }} />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.CONFIG_ERROR) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width + ARROW_WIDTH + ARROW_PADDING}
                    y={guidePosition.top}
                    textTitle="Connection string is incorrect"
                    textContent="Please deploy cloud resource first and then follow the document to get device connection string"
                    externalLink={{ text: "How to deploy and fill connection string", link: "http://www.google.com" }} />
                <GuideArrow x={guidePosition.left + guidePosition.width + ARROW_PADDING}
                    y={guidePosition.top + 50}
                    position={3} />
            </div>;
        } else if (guideId === GUIDE.CONTROL_BAR) {
            displayModule = <div>
                <GuideModal x={guidePosition.left + guidePosition.width - 100}
                    y={guidePosition.top + 40 + ARROW_WIDTH + ARROW_PADDING}
                    textTitle="Run your project"
                    textContent="Please deploy cloud resource first and then follow the document to get device connection string" />
                <GuideArrow x={guidePosition.left + guidePosition.width - 80}
                    y={guidePosition.top + 40 + ARROW_PADDING}
                    position={0} />
            </div>;
        } else if (guideId === GUIDE.BOARD) {
            displayModule = <div>
                <GuideModal x={guidePosition.left - GUIDE_WIDTH - ARROW_WIDTH - ARROW_PADDING}
                    y={guidePosition.top + 200}
                    reverse={true}
                    textTitle="Wow~ Have fun with it!"
                    textContent="First, select a project you want to run in this simulation, and then, select one file, you can see the code in the middle."
                    externalLink={{ text: "Get a kit", link: "http://www.google.com" }} />
                <GuideArrow x={guidePosition.left - ARROW_WIDTH - ARROW_PADDING}
                    y={guidePosition.top + 250}
                    position={1} />
            </div>;
        }

        return (
            <div>
            <div className="overlay" style={{ display: guideId === GUIDE.CLOSE ? "none" : "flex" }}>
                {displayModule}
                <span onClick={this.props.switchGuide.bind(this, GUIDE.CLOSE)} className="close-guide" ><i className="fa fa-times" aria-hidden="true"></i>Turn guides off</span>
            </div>
            <div className="guide-dot" style={{ display: guideId === GUIDE.CLOSE ? "none" : "flex", top: guidePosition.dotY - DOT_RADIUS, left: guidePosition.dotX - DOT_RADIUS }} ></div>
            </div>
        );
    }
}

export default HelpOverlay;