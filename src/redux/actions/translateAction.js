import { 
	TRANSLATION, 
	CHANGE_SOURCE, 
	CHANGE_SOURCE_TEXT,
	CHANGE_TARGET, 
	DETECTLANG,
	DETECTLANG_FAIL,
	DETECTLANG_SUCCESS,
	SWAP_TRANSLATE,
	TRANSLATION_FAIL,
	TRANSLATION_SUCCESS,
	DISABLEINPUT,
	RESET,
} from '../constant/translateTypes';
import * as axiosHelper from '../../helpers/axiosHelper';
import { debounce } from 'lodash';

const STATUS = {
	TRANSLATING: 'translating',
	TRANSLATED: 'translated',
	CANCELLED: 'cancelled',
};

/**
 * @description Reset cả input text và output text
 */
export const reset = () => {
	return {
		type: RESET,
	};
};

/**
 * @description Fix cứng input text được nhập vào
 */
export const changeSourceText = (data) => {
	return {
		type: CHANGE_SOURCE_TEXT,
		payload: {
			data
		}
	};
};

/**
 * @description Chỉnh loại ngôn ngữ đầu vào
 */
export const changeSource = (data) => {
	return {
		type: CHANGE_SOURCE,
		payload: {
			data
		}
	};
};

/**
 * @description Chỉnh loại ngôn ngữ đầu ra
 */
export const changeTarget = (data) => {
	return {
		type: CHANGE_TARGET,
		payload: {
			data
		}
	};
};

/**
 * @description Hoán đổi loại ngôn ngữ ở ra và vào
 */
export const swapTranslate = (dataSource, dataTarget) => {
	return {
		type: SWAP_TRANSLATE,
		payload: {
			dataSource,
			dataTarget,
		}
	};
};

/**
 * @description Chặn người dùng nhập text vào input
 */
export function disableInput() {
	return {
	  type: DISABLEINPUT,
	};
}

/**
 * @description Có 2 TH để dùng
 * 1. khi người dùng đang nhập text
 * 2. Khi đang lấy kết quả từ BE (Hiện tại trường này 
 * được thay bằng hàm disableInput)
 */
export function translationLoading() {
	return {
	  type: TRANSLATION,
	};
}

/**
 * @description Thành công và trả về kết quả dịch
 */
export function translationSuccess(data) {
	return {
	  type: TRANSLATION_SUCCESS,
	  payload: {
			targetText: data.target_text,
		}
	};
}

/**
 * @description Thành công và trả về err
 */
export function translationFailed(err) {
	return {
	  type: TRANSLATION_FAIL,
	  payload: {
			err,
		}
	};
}

export function detectLangLoading() {
	return {
	  type: DETECTLANG,
	};
}

/**
 * @description Thành công và trả về kết quả dịch
 */
export function detectLangSuccess(data) {
	return {
	  type: DETECTLANG_SUCCESS,
	  payload: {
			targetText: data.target_text,
			sourceLang: data.source_lang,
		}
	};
}

/**
 * @description Thành công và trả về err
 */
export function detectLangFailed(err) {
	return {
	  type: DETECTLANG_FAIL,
	  payload: {
			err,
		}
	};
}

/**
 * @description Do BE bắt fai kiểm tra status 
 * nên sẽ gọi lại API khi nào status được dịch.
 * Đặt thời gian mỗi lần gọi lại API 
 * ! => tránh việc gọi liên tục và ko cần thiết
 */
const recursiveCheckStatus = async (translationHistoryId, taskId) => {
	const getTranslationHistoryResult = await axiosHelper.getTranslateHistoryGetSingle({
		translationHistoryId,
		taskId,
	});
	if(getTranslationHistoryResult.data.status === STATUS.TRANSLATING){
		// return await promiseHisoryResult(translationHistoryId, taskId);
		return new Promise((resolve) => {
			setTimeout(async () => {
				const getTranslationHistoryResult = await recursiveCheckStatus(translationHistoryId, taskId);
				resolve(getTranslationHistoryResult);
			}, 1000);
		});
	} else {
		return getTranslationHistoryResult;
	}
};

/**
 * @description Nhập từ input => đợi 1 khoảng thời gian đẻ nhận text
 * ! Tránh việc gọi API ko cần thiêt và liên tục
 */
const debouncedTranslate = debounce(async (body, dispatch) => {
	try {
		dispatch(disableInput());
		const postTranslationResult = await axiosHelper.postTranslate(body);
		const getTranslationHistoryResult = await recursiveCheckStatus(postTranslationResult.data.translationHitoryId, postTranslationResult.data.taskId);
		const getTranslationResult = await axiosHelper.getTranslateResult(getTranslationHistoryResult.data.resultUrl);
		dispatch(translationSuccess(getTranslationResult));
	} catch(error) {
		dispatch(translationFailed(error));
	}
}, 1000);

/**
 * @description Thunk function cho việc dịch từ và lấy kết quả
 */
// { "sourceText": "string", "sourceLang": "zh", "targetLang": "zh"
export const translationAsync = (body) => (dispatch) => {
	if(body.sourceText.trim() !== '' ){
		dispatch(translationLoading());
		debouncedTranslate(body, dispatch);
	}
};

const debouncedTranslateAndDetect = debounce(async (body, dispatch) => {
	try {
		dispatch(disableInput());
		const postTranslationResult = await axiosHelper.postTranslate(body);
		const getTranslationHistoryResult = await recursiveCheckStatus(postTranslationResult.data.translationHitoryId, postTranslationResult.data.taskId);
		const getTranslationResult = await axiosHelper.getTranslateResult(getTranslationHistoryResult.data.resultUrl);
		dispatch(detectLangSuccess(getTranslationResult));
	} catch(error) {
		dispatch(detectLangFailed(error));
	}
}, 1000);

/**
 * @description Thunk function cho việc dịch từ và lấy kết quả
 */
// { "sourceText": "string", "sourceLang": null, "targetLang": "zh"
export const translationAndDetectAsync = (body) => (dispatch) => {
	if(body.sourceText.trim() !== '' ){
		dispatch(detectLangLoading());
		debouncedTranslateAndDetect(body, dispatch);
	}
};


export const makeTranslation = (translationResult, translationData) => {
	const dataTo = translationResult;
	const { direction } = translationData;
	const dataFrom = translationData.data;
	return {
		type: TRANSLATION,
		payload: {
			fromText: dataFrom,
			toText: dataTo,
			direction,
		}
	};
};

export const makeTranslationAsync = (translationData) => async (dispatch) => {
	try {
		const translationResult = await axiosHelper.createTranslation(translationData);
		dispatch(makeTranslation(translationResult.data.data, translationData));
	} catch(error) {
		console.warn(error);
	}
};
