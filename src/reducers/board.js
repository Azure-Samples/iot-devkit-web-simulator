import {
    SWITCH_ON_OFF_BOARD,
    SET_SENSOR_DATA,
} from '../constants/actionTypes';
import { Map, is } from 'immutable';
import * as sensorName from '../constants/sensorName';

const initialState = Map({
    switchOn: false,
    sensor: Map({
        [sensorName.BUTTON_A]: Map({
            down: false,
        }),
        [sensorName.BUTTON_B]: Map({
            down: false,
        }),
        [sensorName.HTS221]: Map({
            temperature: 0,
            humidity: 0,
        }),
        [sensorName.LED]: Map({
            on: false,
            r: 0,
            g: 0,
            b: 0,
        }),
        [sensorName.LSM6DSL]: Map({
            x: 0,
            y: 0,
            z: 0,
            distance: 0,
            inMotion: false,
        }),
        [sensorName.OLED]: Map({
            "0": "",
            "1": "",
            "2": "",
            "3": "",
        }),
    }),
});

const board = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_ON_OFF_BOARD:
            if (action.data) {
                return state.set('switchOn', action.data);
            } else {
                return initialState;
            }
        case SET_SENSOR_DATA:
            if (action.sensor === sensorName.LSM6DSL) {
                let current = state.getIn(['sensor', sensorName.LSM6DSL]);
                if (!current.get('inMotion') && action.data.get('inMotion')) {
                    return state.updateIn(['sensor', action.sensor], value => value.merge(action.data.set('distance', 0)));
                } else if (current.get('inMotion') && action.data.get('inMotion')) {
                    return state.updateIn(['sensor', action.sensor, 'distance'], value => value + (Math.abs(current.get('x') - action.data.get('x')) + Math.abs(current.get('y') - action.data.get('y'))))
                        .updateIn(['sensor', action.sensor], value => value.merge(action.data));
                } else {
                    return state.updateIn(['sensor', action.sensor], value => value.merge(action.data));
                }
            }
            else {
                let t = state.updateIn(['sensor', action.sensor], value => value.merge(action.data));
                return t;
            }
        default:
            return state;
    }
};

export default board;