import {
    SWITCH_HELP,
} from '../constants/actionTypes';
import {Map} from 'immutable';

const initialState = Map({
    showHelp: false,
});

const help = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_HELP:
            return state.set('showHelp', action.data);
        default:
            return state;
    }
};

export default help;