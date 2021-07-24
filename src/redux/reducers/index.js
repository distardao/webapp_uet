import { combineReducers } from 'redux';
import testReducer from './testReducer';
import translateReducer from './translateReducer';

export default combineReducers({ testReducer, translateReducer });
