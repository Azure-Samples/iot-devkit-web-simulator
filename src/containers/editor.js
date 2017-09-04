import { connect } from 'react-redux';
import Editor from '../components/editor';
import { switchGuide, setComponentSize } from '../actions';
import * as GUIDE from '../constants/guide';

const mapStateToProps = (state) => ({
    data: state.project.get('codeInEditor'),
    language: state.project.get('codeLanguage'),
    highlight: state.main.get('guideId') === GUIDE.EDITOR,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setComponentSize: (size) => {
        setComponentSize(dispatch, GUIDE.EDITOR, size);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
