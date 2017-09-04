import { connect } from 'react-redux';
import Banner from '../components/banner';
import { switchGuide } from '../actions'

const mapDispatchToProps = (dispatch, ownProps) => ({
    switchGuide: (id) => {
        switchGuide(dispatch, id);
    }
})

export default connect(null, mapDispatchToProps)(Banner)
