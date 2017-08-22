import { connect } from 'react-redux';
import Editor from '../components/editor';
// import { runSample, stopSample } from '../actions';

const mapStateToProps = (state) => ({
    data: state.project.get('codeInEditor'),
    language: state.project.get('codeLanguage'),
});

export default connect(mapStateToProps, null)(Editor)
