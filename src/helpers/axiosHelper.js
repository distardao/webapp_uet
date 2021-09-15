import axios from 'axios';

const axiosDefault = axios.create({
	baseURL: 'http://nmtuet.ddns.net:1710/',
	// baseURL: 'http://nmtuet.ddnsfree.com:6010/',
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 100000,
});

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
