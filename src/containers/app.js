import { connect } from 'react-redux';
import App from '../components/app';
import { setComponentSize, switchGuide } from '../actions';
import * as GUIDE from '../constants/guide';

const mapStateToProps = (state) => ({
    highlight: state.main.get('guideId') === GUIDE.BOARD,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setComponentSize: (size) => {
        setComponentSize(dispatch, GUIDE.BOARD, size);
    },
    openGuide: () => {
        switchGuide(dispatch, 0);
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
