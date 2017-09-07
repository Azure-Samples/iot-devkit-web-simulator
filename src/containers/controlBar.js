import { connect } from 'react-redux';
import ControlBar from '../components/controlBar';
import { runSample, stopSample, appendConsoleLog, switchGuide, setComponentSize } from '../actions';
import SampleRunner from '../lib/sampleRunner';
import * as GUIDE from '../constants/guide';

const mapStateToProps = (state) => ({
    isSampleRunning: state.main.get('isSampleRunning'),
    runningInfo: state.main.get('runningInfo'),
    highlight: state.main.get('guideId') === GUIDE.CONTROL_BAR,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    runSample: () => {
        let result = SampleRunner.getInstance().run(appendConsoleLog.bind(this, dispatch), appendConsoleLog.bind(this, dispatch));
        if (result === 0) {
            runSample(dispatch);
        }
    },
    stopSample: () => {
        SampleRunner.getInstance().stop();
        stopSample(dispatch);
    },
    setComponentSize: (size) => {
        setComponentSize(dispatch, GUIDE.CONTROL_BAR, size);
    },
    switchGuide: () => {
        switchGuide(dispatch, GUIDE.CONTROL_BAR + 1);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
