import { CREATE_TRANSLATION } from '../actionTypes';
import * as axiosHelper from '../../helpers/axiosHelper';


export const makeTranslation = (translationResult, translationData) => {
	const dataTo = translationResult;
	const { direction } = translationData;
	const dataFrom = translationData.data;
	return {
		type: CREATE_TRANSLATION,
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
