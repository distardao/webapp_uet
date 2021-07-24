import { SAY_AN_DEP_TRAI } from '../actionTypes';

const initialState = {
	anDepTrai: 'An khá là đẹp trai',
};

export default function(state = initialState, action) {
	switch (action.type) {
	case SAY_AN_DEP_TRAI: {
		return {
			...state,
			anDepTrai: action.payload.content,
		};
	}
	default:
		return state;
	}
}
