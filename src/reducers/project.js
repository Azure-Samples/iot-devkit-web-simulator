import {
    SET_EDITOR_PATH,
    SELECT_PROJECT,
    SET_PROJECT_CONFIG,
    UPDATE_DISPLAY_CODE,
} from '../constants/actionTypes';
import { Map, is } from 'immutable';
import { getAllProjects } from '../lib/projectFactory';
import * as CONSTANTS from '../constants/localStorageKeys';

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
    if (action.type === SET_EDITOR_PATH) {
        let file = state.getIn(['currentProject', 'files', ...action.path]);
        return state.merge(Map({
            codeInEditor: file.get('data'),
            codeLanguage: file.get('format'),
        }));
    } else if (action.type === SELECT_PROJECT) {
        let currentProject = state.getIn(['projects', action.data]);
        console.log(currentProject)
        if (!currentProject) {
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
    } else if (action.type === SET_PROJECT_CONFIG) {
        let currentProject = state.get('currentProject');
        let updatedProject = currentProject.update('config', map => map.merge(action.data));
        let currentProjectName = state.get('projects').findEntry(v => is(v, currentProject))[0];
        if (currentProjectName === "ShakeShake") {
            updatedProject = updatedProject.updateIn(['files', 'ShakeShake.ino', 'data'],
                value => value.replace(/("{\\"topic\\":\\")[^\\]*(\\"}";)/, '$1' + action.data.topic + '$2')
            );
            localStorage.setItem(CONSTANTS.SHAKESHAKE_CONNECTIONSTRING, action.data.connectionString);
            localStorage.setItem(CONSTANTS.SHAKESHAKE_TOPIC, action.data.topic);
        }else if(currentProjectName === "GetStarted") {
            localStorage.setItem(CONSTANTS.GETSTARTED_CONNECTIONSTRING, action.data.connectionString);
        }
        if (state.get('codeInEditor') === state.getIn(['currentProject', 'files', 'ShakeShake.ino', 'data'])) {
            return state.set('currentProject', updatedProject).setIn(['projects', currentProjectName], updatedProject)
                .set('codeInEditor', updatedProject.getIn(['files', 'ShakeShake.ino', 'data']));
        } else {
            return state.set('currentProject', updatedProject).setIn(['projects', currentProjectName], updatedProject);
        }
    } else {
        return state;
    }
};

export default project;