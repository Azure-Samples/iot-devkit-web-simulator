import { connect } from 'react-redux';
import ControlBar from '../components/controlBar';
import { runSample, stopSample, appendConsoleLog } from '../actions';
import SampleRunner from '../lib/sampleRunner';

const mapStateToProps = (state) => ({
    isSampleRunning: state.main.get('isSampleRunning'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    runSample: () => {
        SampleRunner.getInstance().run(appendConsoleLog.bind(this, dispatch), appendConsoleLog.bind(this, dispatch));
        runSample(dispatch);
    },
    stopSample: () => {
        SampleRunner.getInstance().stop();
        stopSample(dispatch);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);
