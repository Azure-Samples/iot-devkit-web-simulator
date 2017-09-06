import { connect } from 'react-redux';
import HelpOverlay from '../components/helpOverlay';
import { switchGuide } from '../actions';

const mapStateToProps = (state) => ({
    guideId: state.main.get('guideId'),
    guidePosition: state.main.get('guidePosition').get(state.main.get('guideId')),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    switchGuide: (id) => {
        switchGuide(dispatch, id);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HelpOverlay)
