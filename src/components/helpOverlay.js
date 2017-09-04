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
import * as GUIDE from '../constants/guide';

class HelpOverlay extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     step: 0,
        //     numOfSteps: 3,
        //     subStep: 0,
        //     timeSpan: 3000,
        //     numOfSubStep: [3, 3, 2],
        //     offset: []
        // };
        // if (this.toggleInterval) {
        //     clearInterval(this.toggleInterval);
        // }
        // this.toggleInterval = setInterval(() => { this.toggleStep(); }, this.state.timeSpan);
    }

    // nextStep = () => {
    //     if (this.state.step < this.state.numOfSteps - 1) {
    //         this.gotoStep(this.state.step + 1);
    //     }
    //     else {
    //         this.onClose();
    //     }
    // }

    // prevStep = () => {
    //     if (this.state.step > 0) {
    //         this.gotoStep(this.state.step - 1);
    //     }
    // }

    // gotoStep = (id) => {
    //     this.setState(() => {
    //         return {
    //             step: id,
    //             subStep: 0
    //         }
    //     });
    //     if (this.toggleInterval) {
    //         clearInterval(this.toggleInterval);
    //     }
    //     this.toggleInterval = setInterval(() => { this.toggleStep(); }, this.state.timeSpan);
    // }

    // goToSubStep = (id) => {
    //     this.setState(() => {
    //         return {
    //             subStep: id
    //         }
    //     });
    //     if (this.toggleInterval) {
    //         clearInterval(this.toggleInterval);
    //     }
    // }

    // toggleStep = () => {
    //     this.setState((prev) => {
    //         return {
    //             subStep: (prev.subStep + 1) % prev.numOfSubStep[this.state.step]
    //         }
    //     });
    // }

    // changeSubStep = (e) => {
    //     var wheelData = this.extractDelta(e.nativeEvent);
    //     if (!wheelData) {
    //         return;
    //     }
    //     if (wheelData < 0) {
    //         if (this.state.subStep !== this.state.numOfSubStep[this.state.step] - 1) {
    //             this.goToSubStep(this.state.subStep + 1);
    //         }
    //     } else {
    //         if (this.state.subStep !== 0) {
    //             this.goToSubStep(this.state.subStep - 1);
    //         }
    //     }
    // }

    // extractDelta(e) {
    //     if (e.wheelDelta) {
    //         return e.wheelDelta;
    //     }
    //     if (e.deltaY) {
    //         return e.deltaY * -1;
    //     }
    // }

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

    // componentWillReceiveProps = (nextProps) => {
    //     if (!this.props.needShowHelp && nextProps.needShowHelp) {
    //         this.setState(() => {
    //             return {
    //                 step: 0,
    //                 subStep: 0
    //             }
    //         });
    //         if (this.toggleInterval) {
    //             clearInterval(this.toggleInterval);
    //         }
    //         this.toggleInterval = setInterval(() => { this.toggleStep(); }, this.state.timeSpan);
    //     }
    // }

    // componentDidMount() {
    //     this.setStepOffset(0);
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     if(prevState.step !== this.state.step) {
    //         this.setStepOffset(this.state.step);
    //     }
    //     if(!prevProps.needShowHelp && this.props.needShowHelp) {
    //         this.setStepOffset(this.state.step);
    //     }
    // }

    // setStepOffset = (step) => {
    //     let tempSubOffsetArray = [];
    //     let tempSum = 0;
    //     for (let j = 0; j < this.state.numOfSubStep[step]; j++) {
    //         tempSubOffsetArray.push(tempSum);
    //         tempSum += this.allParagraph.children[step].children[j].offsetHeight;
    //     }
    //     this.setState(() => {
    //         return {
    //             offset: tempSubOffsetArray
    //         }
    //     });
    // }

    componentDidUpdate() {
        console.log(this.props.guidePosition);
    }

    render() {
        console.log(this.props.guidePosition);
        return (
            <div className="overlay" style={{ display: this.props.guideId === GUIDE.CLOSE ? "none" : "flex" }}>
                <div></div>
            </div>
        );
    }
}

export default HelpOverlay;