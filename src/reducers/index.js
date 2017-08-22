import { combineReducers } from 'redux';
import main from './main';
import help from './help';
import board from './board';
import project from './project';

export default combineReducers({
    main,
    help,
    board,
    project,
});