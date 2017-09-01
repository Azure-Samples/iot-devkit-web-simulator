import { connect } from 'react-redux';
import ControlBar from '../components/controlBar';
import { runSample, stopSample, appendConsoleLog } from '../actions';
import SampleRunner from '../lib/sampleRunner';

const mapStateToProps = (state) => ({
    isSampleRunning: state.main.get('isSampleRunning'),
    runningInfo: state.main.get('runningInfo'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    runSample: () => {
        runSample(dispatch);
        SampleRunner.getInstance().run(appendConsoleLog.bind(this, dispatch), appendConsoleLog.bind(this, dispatch));
    },
    stopSample: () => {
        SampleRunner.getInstance().stop();
        stopSample(dispatch);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
