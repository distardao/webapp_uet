import axios from 'axios';

const axiosDefault = axios.create({
	// baseURL: 'http://nmtuet.ddns.net:1710/',
	baseURL: 'http://nmtuet.ddns.net:8000/',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 100000,
});

// sample data
// { "sourceText": "string", "sourceLang": "zh", "targetLang": "zh"
export const postTranslate = (body) => {
	return new Promise((resolve, reject) => {
		axiosDefault.post('translate', body)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// sample data
// { "translationHistoryId": "string", "taskId": "string",
export const getTranslateHistoryGetSingle = (params) => {
	return new Promise((resolve, reject) => {
		axiosDefault.get('translation-history/get-single', {
			params
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// sample data
export const getTranslateResult = (resultUrl) => {
	return new Promise((resolve, reject) => {
		axiosDefault({
			url: resultUrl,
			method: 'GET',
		})
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// -------------- API từ dưới xuống là của http://nmtuet.ddns.net:1710/ ------------- //

// sample data
// {"data":"年我国利用外","direction":"zh-vi"}
// eslint-disable-next-line no-unused-vars
export const createTranslation = (data) => {
	return new Promise((resolve, reject) => {
		axiosDefault
			.post('translate_paragraphs', data)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
				// console.warn('axios helper', error);
				reject(error);
			});
	});
};

/**
   * @description Call api nhận dạng ngôn ngũ
   * @input {
   * 			data: string
   * 		}
   * @output {lang: string, lang_str: string, status: boolean}
   */
export const detectLang = (data) => {
	return new Promise((resolve, reject) => {
		axiosDefault
			.post('detect_lang', data)
			.then((result) => {
				resolve(result.data);
			})
			.catch((error) => {
			// console.warn('axios helper', error);
				reject(error);
			});
	});
};
