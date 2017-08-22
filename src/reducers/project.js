import {
    SET_EDITOR_PATH,
    SELECT_PROJECT,
} from '../constants/actionTypes';
import { Map } from 'immutable';
import { getAllProjects } from '../lib/projectFactory';

const getCodeInFirstFile = (project) => {
    for (let [k, v] of project.get('files')) {
        if (v.get('type') === 'file') {
            return [v.get('data'), v.get('format')];
        }
    }
};

const allProjects = getAllProjects();
const initProject = allProjects.get('ShakeShake');
let codeInEditor;
let codeLanguage;
[codeInEditor, codeLanguage] = getCodeInFirstFile(initProject);
const initialState = Map({
    codeInEditor,
    codeLanguage,
    currentProject: initProject,
    projects: allProjects,
});

const project = (state = initialState, action) => {
    switch (action.type) {
        case SET_EDITOR_PATH:
        console.log(['currentProject','files',...action.path])
            let file = state.getIn(['currentProject','files',...action.path]);
            console.log(file)
            return state.merge(Map({
                codeInEditor: file.get('data'),
                codeLanguage: file.get('format'),
            }));
        case SELECT_PROJECT:
            let currentProject = state.getIn(['projects', action.data]);
            if (!project) {
                return state;
            }
            let codeInEditor;
            let codeLanguage;
            [codeInEditor, codeLanguage] = getCodeInFirstFile(currentProject);
            return state.merge(Map({
                currentProject,
                codeInEditor,
                codeLanguage,
            }));
        default:
            return state;
    }
};

export default project;