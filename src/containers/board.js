import { connect } from 'react-redux';
import Board from '../components/board';
import { setSensorData as setSensorData2 } from '../actions';
import { Map,is } from 'immutable';

window.mmm = Map;
window.iii = is;

const mapStateToProps = (state) => ({
    switchOn: state.board.get('switchOn'),
    sensor: state.board.get('sensor'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setSensorData: (sensor, data) => {
        console.log('[zhiqing.qiu] setSensorData called with',sensor,data)
        window.ttt = data;
        setSensorData2(dispatch, sensor, data);
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
