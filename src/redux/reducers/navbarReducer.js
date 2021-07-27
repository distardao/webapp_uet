import { SIDE_BAR_SHOW, SIDE_BAR_HIDE } from '../actionTypes';

const initialState = {
	shownavbar: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
	case SIDE_BAR_SHOW: {
		return {
			...state,
			shownavbar: true,
		};
	}
	case SIDE_BAR_HIDE: {
		return {
			...state,
			shownavbar: false,
		};
	}
	default:
		return state;
	}
}
