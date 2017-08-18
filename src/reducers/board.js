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
            return state.set('switchOn', action.data);
        case SET_SENSOR_DATA:
            if (action.sensor === sensorName.LSM6DSL) {
                let current = state.getIn(['sensor', sensorName.LSM6DSL]);
                if (!current.get('inMotion') && action.data.get('inMotion')) {
                    return state.updateIn(['sensor', action.sensor], value => value.merge(action.data.set('distance', 0)));
                } else if (current.get('inMotion') && action.data.get('inMotion')) {
                    return state.updateIn(['sensor', action.sensor, 'distance'], value => value + (Math.abs(current.get('x') - action.data.get('x')) + Math.abs(current.get('y') - action.data.get('y'))))
                        .updateIn(['sensor', action.sensor], value => value.merge(action.data));
                }
            }
            else {
                console.log('[zhiqing] ', state.getIn(['sensor', action.sensor]).get('0'), state.getIn(['sensor', action.sensor]).get('1'), state.getIn(['sensor', action.sensor]).get('2'), state.getIn(['sensor', action.sensor]).get('3'));
                let t = state.updateIn(['sensor', action.sensor], value => value.merge(action.data));

                console.log('[zhiqing] ', action.data.get('0'), action.data.get('1'), action.data.get('2'), action.data.get('3'));
                console.log('[zhiqing] ', is(t, state));
                return t;
            }
        default:
            return state;
    }
};

export default board;