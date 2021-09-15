import { combineReducers } from 'redux';
import translateReducer from './translateReducer';
import navbarReducer from './navbarReducer';

export default combineReducers({ translateReducer, navbarReducer });
