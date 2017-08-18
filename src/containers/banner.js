import { connect } from 'react-redux';
import Banner from '../components/banner';
import { switchHelp } from '../actions'

const mapDispatchToProps = (dispatch, ownProps) => ({
    switchHelp: () => {
        switchHelp(dispatch, true);
    }
})

export default connect(null, mapDispatchToProps)(Banner)
