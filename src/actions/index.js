import * as types from '../constants/actionTypes';

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

// help
export const switchHelp = (dispatch, on) => {
    dispatch({
        type: types.SWITCH_HELP,
        data: on,
    });
};

// main
export const runSample = (dispatch) => {
    dispatch({
        type: types.RUN_SAMPLE,
    });
};

export const stopSample = (dispatch) => {
    dispatch({
        type: types.STOP_SAMPLE,
    });
};

export const appendConsoleLog = (dispatch, data) => {
    dispatch({
        type: types.APPEND_CONSOLE_LOG,
        data,
    });
};