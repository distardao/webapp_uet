import { combineReducers } from 'redux';
import translateReducer from './translateReducer';
import navbarReducer from './navbarReducer';
import historyReducer from './historyReducer';

export default combineReducers({ translateReducer, navbarReducer, historyReducer });
