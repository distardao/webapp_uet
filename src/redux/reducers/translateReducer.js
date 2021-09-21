import { 
	TRANSLATION,
	TRANSLATION_SUCCESS,
	TRANSLATION_FAIL,
	DETECTLANG,
	DETECTLANG_FAIL,
	DETECTLANG_SUCCESS,
	CHANGE_SOURCE, 
	CHANGE_TARGET,
	SWAP_TRANSLATE,
	CHANGE_SOURCE_TEXT,
	CHANGE_TARGET_TEXT,
	RESET,
	DISABLEINPUT,
} from '../constant/translateTypes';

export const STATE = {
	INIT: 'INIT',
	LOADING: 'LOADING',
	DISABLEINPUT: 'DISABLEINPUT',
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE',
};

const initialState = {
	currentState: STATE.INIT,
	translateCode: {
		sourceLang: 'vi',
		targetLang: 'zh',
	},
	translateText: {
		sourceText: '',
		targetText: '',
		editSourceText: '',
	},
	isSwap: false,
	err: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
	case TRANSLATION: {
		return {
			...state,
			currentState: STATE.LOADING,
		};
	}
	case TRANSLATION_SUCCESS: {
		return {
			...state,
			currentState: STATE.SUCCESS,
			translateText: {
				...state.translateText,
				targetText: action.payload.targetText,
				editSourceText: action.payload.targetText,
			}
		};
	}
	case TRANSLATION_FAIL: {
		return {
			...state,
			currentState: STATE.FAILURE,
			err: action.payload.err,
		};
	}
	case DETECTLANG: {
		return {
			...state,
			currentState: STATE.LOADING,
		};
	}
	case DETECTLANG_SUCCESS: {
		return {
			...state,
			currentState: STATE.SUCCESS,
			translateCode: {
				...state.translateCode,
				sourceLang: action.payload.sourceLang,
			},
			translateText: {
				...state.translateText,
				targetText: action.payload.targetText,
				editSourceText: action.payload.targetText,
			}
		};
	}
	case DETECTLANG_FAIL: {
		return {
			...state,
			currentState: STATE.FAILURE,
			err: action.payload.err,
		};
	}
	case CHANGE_SOURCE: {
		return {
			...state,
			translateCode: {
				...state.translateCode,
				sourceLang: action.payload.data,
			}
		};
	}
	case CHANGE_TARGET: {
		return {
			...state,
			translateCode: {
				...state.translateCode,
				targetLang: action.payload.data,
			}
		};
	}
	case SWAP_TRANSLATE: {
		return {
			...state,
			isSwap: !state.isSwap,
			translateCode: {
				sourceLang: action.payload.dataSource,
				targetLang: action.payload.dataTarget,
			}
		};
	}
	case CHANGE_SOURCE_TEXT: {
		return {
			...state,
			translateText: {
				...state.translateText,
				sourceText: action.payload.data,
			},
		};
	}
	case CHANGE_TARGET_TEXT: {
		return {
			...state,
			translateText: {
				...state.translateText,
				targetText: action.payload.data,
				editSourceText: action.payload.data,
			},
		};
	}
	case RESET: {
		return {
			...state,
			currentState: STATE.INIT,
			translateText: {
				sourceText: '',
				targetText: '',
				editSourceText: '',
			},
		};
	}
	case DISABLEINPUT: {
		return {
			...state,
			currentState: STATE.DISABLEINPUT,
		};
	}
	default:
		return state;
	}
}
