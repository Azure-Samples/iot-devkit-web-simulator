import { connect } from 'react-redux';
import Board from '../components/board';
import { setSensorData as setSensorData2, runSample, stopSample, appendConsoleLog, setComponentSize  } from '../actions';
import { Map, is } from 'immutable';
import SampleRunner from '../lib/sampleRunner';
import * as GUIDE from '../constants/guide';

const mapStateToProps = (state) => ({
    switchOn: state.board.get('switchOn'),
    sensor: state.board.get('sensor'),
    highlight: state.main.get('guideId') === GUIDE.BOARD,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setSensorData: (sensor, data) => {
        setSensorData2(dispatch, sensor, data);
    },
    resetBoard: () => {
        SampleRunner.getInstance().stop();
        stopSample(dispatch);
        setTimeout(() => {
            runSample(dispatch);
            SampleRunner.getInstance().run(appendConsoleLog.bind(this, dispatch), appendConsoleLog.bind(this, dispatch));
        }, 300)
    },
    setComponentSize: (size) => {
        setComponentSize(dispatch, GUIDE.BOARD, size);
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)