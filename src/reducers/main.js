import {
    RUN_SAMPLE,
    STOP_SAMPLE,
    APPEND_CONSOLE_LOG,
    SHOW_RUNNING_INFO,
    SWITCH_HELP,
    SET_COMPONENT_SIZE,
} from '../constants/actionTypes';
import * as GUIDE from '../constants/guide';

import { Map, List } from 'immutable';

const initialState = Map({
    isSampleRunning: false,
    runningInfo: "",
    consoleMessage: "",
    guideId: GUIDE.CLOSE,
    guidePosition: List(new Array(GUIDE.END)),
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
        case SWITCH_HELP:
            return state.set('guideId', action.data);
        case SET_COMPONENT_SIZE:
            return state.update('guidePosition', oriList => oriList.set(action.id,action.size));
        default:
            return state;
    }
};

export default main;