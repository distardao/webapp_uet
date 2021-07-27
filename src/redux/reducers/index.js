import { combineReducers } from 'redux';
import testReducer from './testReducer';
import translateReducer from './translateReducer';
import navbarReducer from './navbarReducer';

export default combineReducers({ testReducer, translateReducer, navbarReducer });
