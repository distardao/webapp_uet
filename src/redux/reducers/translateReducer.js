import { CREATE_TRANSLATION } from '../actionTypes';

const initialState = {
	fromText: '',
	toText: '',
	direction: '',
};

export default function(state = initialState, action) {
	switch (action.type) {
	case CREATE_TRANSLATION: {
		return {
			...state,
			fromText: action.payload.fromText,
			toText: action.payload.toText,
			direction: action.payload.direction,
		};
	}
	default:
		return state;
	}
}
