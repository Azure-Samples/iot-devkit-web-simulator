import {
    RUN_SAMPLE,
    STOP_SAMPLE,
    APPEND_CONSOLE_LOG,
} from '../constants/actionTypes';
import { Map } from 'immutable';

const initialState = Map({
    isSampleRunning: false,
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
        default:
            return state;
    }
};

export default main;