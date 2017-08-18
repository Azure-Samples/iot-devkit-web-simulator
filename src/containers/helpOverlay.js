import { connect } from 'react-redux';
import HelpOverlay from '../components/helpOverlay';
import { switchHelp } from '../actions';

const mapStateToProps = (state) => ({
    needShowHelp: state.help.get('showHelp'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    switchHelp: () => {
        switchHelp(dispatch, false);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HelpOverlay)
