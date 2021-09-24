import { GETHISTORY, GETHISTORY_FAIL, GETHISTORY_SUCCESS } from '../constant/historyTypes';
import * as axiosHelper from '../../helpers/axiosHelper';


/**
 * @description get history
 */
export function getHistoryLoading() {
	return {
	  type: GETHISTORY,
	};
}

/**
 * @description Thành công và trả về kết quả dịch
 */
export function getHistorySuccess(data) {
	return {
	  type: GETHISTORY_SUCCESS,
	  payload: {
			data,
		}
	};
}

/**
 * @description Thành công và trả về err
 */
export function getHistoryFailed(err) {
	return {
	  type: GETHISTORY_FAIL,
	  payload: {
			err,
		}
	};
}

/**
 * @description Thunk function cho việc dịch từ và lấy kết quả
 */
// { "sourceText": "string", "sourceLang": "zh", "targetLang": "zh"
export const getHistoryAsync = () => async (dispatch) => {
	dispatch(getHistoryLoading());
	try {
		const result = await axiosHelper.getTranslateResult();
		dispatch(getHistoryFailed(result.list));

	}catch(e) {
		dispatch(getHistoryFailed(e));
	}
};