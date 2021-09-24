import { GETHISTORY, GETHISTORY_FAIL, GETHISTORY_SUCCESS } from '../constant/historyTypes';

export const STATE = {
	INIT: 'INIT',
	LOADING: 'LOADING',
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE',
};

const initialState = {
	currentState: STATE.INIT,
	listHistory: [],
	err: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
	case GETHISTORY: {
		return {
			...state,
			currentState: STATE.LOADING,
		};
	}
	case GETHISTORY_SUCCESS: {
		return {
			...state,
			currentState: STATE.SUCCESS,
			listHistory: action.payload.data
		};
	}
	case GETHISTORY_FAIL: {
		return {
			...state,
			currentState: STATE.FAILURE,
			err: action.payload.err,
		};
	}
	default:
		return state;
	}
}
