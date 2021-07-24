/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
// import { HiVolumeUp } from 'react-icons/hi';
// import { BsFillMicFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import axios from 'axios';
import styles from '../translateStyle.module.css';
import { useTranslation  } from 'react-i18next';
// import * as axiosHelper from '../../../helpers/axiosHelper';
import * as translateAction from '../../../redux/actions/translateAction';

function InputTranslateBox(props) {
	const {
		fromLanguage,
		toLanguage,
		isLoading,
		textInputTranslate,
		setTextInputTranslate,
		setLoading,
		setResultTranslate,
		makeTranslation,
		toText,
		autoDetectLang
	} = props;
	const { t } = useTranslation();
	let timeOutID;
	useEffect(() => {
		if (isLoading){
			if(textInputTranslate === ''){
				setResultTranslate(t('Translate.bandich'));
			}else{
				setResultTranslate(t('Translate.dangdich'));
			}
		}else{
			setResultTranslate(toText);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, textInputTranslate, toText]);
	useEffect(() => {
		clearTimeout(timeOutID);
		if(textInputTranslate !== ''){
			// console.log('autodetect:', autoDetectLang);
			if(autoDetectLang){
				timeOutID = setTimeout(async () => {
					const data = { data:textInputTranslate };
					const headers = { 
						'Content-Type': 'application/json',
					};
					axios.post('http://nmtuet.ddns.net:1710/detect_lang', data, {headers})
						.then(res => {
							const detect = res.data;
							console.log('detect: ', detect);
						})
						.catch(error => console.log(error));
				}, 1000);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
			timeOutID = setTimeout(async () => {
				try {
					await makeTranslation({ data: textInputTranslate, direction: `${fromLanguage.code}-${toLanguage.code}` });
					setLoading(false);
				} catch (error) {
					console.log(error);
				}
			}, 1000);
		}else{
			setResultTranslate(t('Translate.bandich'));
		}
	}, [textInputTranslate]);
	const handleChange = async (event) => {
		clearTimeout(timeOutID);
		event.preventDefault();
		setTextInputTranslate(event.target.value);
		// setResultTranslate(t('Translate.dangdich'));
		setLoading(true);
		// if(event.target.value === ''){
		// 	setResultTranslate(t('Translate.bandich'));
		// 	setLoading(true);
		// }
	};
	const closeInput = () => {
		setTextInputTranslate('');
		setResultTranslate(t('Translate.bandich'));
		setLoading(true);
	};

	// const genRandomNoti = () => {
	// 	const utterThis = new SpeechSynthesisUtterance('你好');
	// 	utterThis.rate = 1;
	// 	utterThis.lang = 'zh-CN';
	// 	setTimeout(() => {
	// 		synthRef.current.speak(utterThis);
	// 	}, 1000);
	// };
	return (
		<>
			<Row style={{ paddingTop: '10px', paddingBottom: '30px' }}>
				<Col md={11} style={{ paddingRight: '0' }} >
					<TextareaAutosize
						minRows={3}
						onChange={handleChange}
						value={textInputTranslate}
						// ref={textareaRef}
						className={[styles.from_language]}/>
				</Col>
				<Col md={1} style={{ padding: '0' }} className={['text-center']}>
					{!isLoading?(<button onClick={closeInput} className={styles.buttonUtility}><CgClose /></button>):''}
				</Col>
			</Row>

			{/* <Row className="align-items-center" style={{ height: '50px' }}>
				<Col md={1}>
					<button onClick={() => genRandomNoti()} className={styles.buttonUtility} ><BsFillMicFill /></button>
				</Col>
				<Col md={1}>
					<button onClick={() => genRandomNoti()} className={styles.buttonUtility}><HiVolumeUp /></button>
				</Col>
			</Row> */}
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		makeTranslation: async (translationData) => await dispatch(translateAction.makeTranslationAsync(translationData))
	};
};

const mapStateToProps = (state) => {
	return {
		fromText: state.translateReducer.fromText,
		toText: state.translateReducer.toText,
		direction: state.translateReducer.direction,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTranslateBox);
