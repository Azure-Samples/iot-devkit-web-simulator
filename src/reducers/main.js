import {
    RUN_SAMPLE,
    STOP_SAMPLE,
    APPEND_CONSOLE_LOG,
    SHOW_RUNNING_INFO,
} from '../constants/actionTypes';
import { Map } from 'immutable';

const initialState = Map({
    isSampleRunning: false,
    runningInfo: "",
    consoleMessage: "",
});

const main = (state = initialState, action) => {
    switch (action.type) {
        case RUN_SAMPLE:
            return state.set('isSampleRunning', true);
        case STOP_SAMPLE:
            return state.set('isSampleRunning', false);
        case APPEND_CONSOLE_LOG:
            return state.update('consoleMessage', value => value + action.data);
        case SHOW_RUNNING_INFO:
            return state.set('runningInfo', action.data);
        default:
            return state;
    }
};

export default main;