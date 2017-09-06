import { connect } from 'react-redux';
import Project from '../components/project';
import { setEditorPath, selectProject, setProjectConfig, switchGuide, setComponentSize } from '../actions';
import { List } from 'immutable';
import * as GUIDE from '../constants/guide';

const mapStateToProps = (state) => ({
    project: state.project.get('currentProject'),
    allProjects: state.project.get('projects'),
    highlightProject: state.main.get('guideId') === GUIDE.PROJECT,
    highlightConfigCloud: state.main.get('guideId') === GUIDE.CONFIG_CLOUD,
    highlightConfigLocal: state.main.get('guideId') === GUIDE.CONFIG_LOCAL,
    highlightError: state.main.get('guideId') === GUIDE.CONFIG_ERROR,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setEditorPath: (path) => {
        setEditorPath(dispatch, path);
    },
    selectProject: (name) => {
        selectProject(dispatch, name);
    },
    setProjectConfig: (config) => {
        setProjectConfig(dispatch, config);
    },
    nextGuideAfterProject: () => {
        switchGuide(dispatch, GUIDE.PROJECT + 1);
    },
    nextGuideAfterConfigCloud: () => {
        switchGuide(dispatch, GUIDE.CONFIG_CLOUD + 1);
    },
    nextGuideAfterConfigLocal: () => {
        switchGuide(dispatch, GUIDE.CONFIG_LOCAL + 1);
    },
    nextGuideForConfigError: () => {
        switchGuide(dispatch, GUIDE.CONFIG_ERROR);
    },
    setProjectComponentSize: (size) => {
        setComponentSize(dispatch, GUIDE.PROJECT, size);
    },
    setConfigCloudComponentSize: (size) => {
        setComponentSize(dispatch, GUIDE.CONFIG_CLOUD, size);
    },
    setConfigLocalComponentSize: (size) => {
        setComponentSize(dispatch, GUIDE.CONFIG_LOCAL, size);
        setComponentSize(dispatch, GUIDE.CONFIG_ERROR, size);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
