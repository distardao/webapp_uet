/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
// import { HiVolumeUp } from 'react-icons/hi';
// import { BsFillMicFill } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { MdVolumeUp } from 'react-icons/md';
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
		autoDetectLang,
		setTitleAutoDetect,
	} = props;
	const { t } = useTranslation();
	let timeOutID;
	useEffect(() => {
		if (isLoading){
			if(textInputTranslate === ''){
				setResultTranslate({
					result: `${t('Translate.bandich')}`,
					edit: `${t('Translate.bandich')}`,
				});
			}else{
				setResultTranslate({
					result: `${t('Translate.dangdich')}`,
					edit: `${t('Translate.dangdich')}`,
				});
			}
		}else{
			setResultTranslate({
				result: toText,
				edit: toText,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, textInputTranslate, toText]);
	useEffect(() => {
		clearTimeout(timeOutID);
		if(textInputTranslate !== '' && !autoDetectLang){
			// eslint-disable-next-line react-hooks/exhaustive-deps
			timeOutID = setTimeout(async () => {
				try {
					await makeTranslation({ data: textInputTranslate, direction: `${fromLanguage.code}-${toLanguage.code}` });
					setLoading(false);
				} catch (error) {
					// console.log(error);
				}
			}, 1000);
		}else{
			setResultTranslate({
				result: `${t('Translate.bandich')}`,
				edit: `${t('Translate.bandich')}`,
			});
			// setResultTranslate(t('Translate.bandich'));
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
		setResultTranslate({
			result: `${t('Translate.bandich')}`,
			edit: `${t('Translate.bandich')}`,
		});
		setTitleAutoDetect(t('Translate.phathienngonngu'));
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
			<div style={{ paddingTop: '10px', paddingBottom: '30px', display: 'flex' }}>
				<div style={{ paddingRight: '0', flex: 1 }} >
					<TextareaAutosize
						minRows={3}
						onChange={handleChange}
						value={textInputTranslate}
						// ref={textareaRef}
						className={[styles.from_language]}/>
				</div>
				<div md={1} style={{ padding: '0' }} className={['text-center']}>
					{!isLoading?(<button onClick={closeInput} className={styles.buttonUtility}><CgClose size={22}/></button>):''}
				</div>
			</div>
			{!isLoading?(<button onClick={() => {}} className={styles.buttonUtility}><MdVolumeUp size={22}/></button>):null}
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
