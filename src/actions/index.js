import * as types from '../constants/actionTypes';
import {dispatch} from 'redux';
// board
export const switchBoard = (dispatch, on) => {
    dispatch({
        type: types.SWITCH_ON_OFF_BOARD,
        data: on,
    });
};

export const setSensorData = (dispatch, sensor, data) => {
    dispatch({
        type: types.SET_SENSOR_DATA,
        sensor,
        data,
    });
};

// main
export const switchGuide = (dispatch, id) => {
    dispatch({
        type: types.SWITCH_HELP,
        data: id,
    });
};

export const setComponentSize = (dispatch, id, size) => {
    dispatch({
        type: types.SET_COMPONENT_SIZE,
        id,
        size,
    });
};

export const runSample = (dispatch) => {
    switchBoard(dispatch,true);
    dispatch({
        type: types.RUN_SAMPLE,
    });
};

export const stopSample = (dispatch) => {
    dispatch({
        type: types.STOP_SAMPLE,
    });
    switchBoard(dispatch,false);
};

export const appendConsoleLog = (dispatch, data) => {
    dispatch({
        type: types.APPEND_CONSOLE_LOG,
        data,
    });
};

export const showRunningInfo = (dispatch, data) => {
    dispatch({
        type: types.SHOW_RUNNING_INFO,
        data,
    });
};

export const setEditorPath = (dispatch, path) => {
    dispatch({
        type: types.SET_EDITOR_PATH,
        path,
    });
};

export const selectProject = (dispatch, name) =>{
	dispatch({
		type: types.SELECT_PROJECT,
		data: name,
	});
    stopSample(dispatch);
}

export const setProjectConfig = (dispatch, configObject) =>{
	dispatch({
		type: types.SET_PROJECT_CONFIG,
        data: configObject,
	});
}