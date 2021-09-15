import React, { useState, useEffect } from 'react';
import { 
	Row,
	Col,
	Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from './translateStyle.module.css';
import ChooseTextCategory from './components/chooseTextCategory';
import ChooseLanguage from './components/chooseLanguage';
import InputTranslateBox from './components/inputTranslateBox';
import ResultTranslateBox from './components/resultTranslateBox';
import { useDispatch } from 'react-redux';
import { sideBarHide } from '../../redux/actions/navbarAction';
import { createTranslation ,detectLang } from '../../helpers/axiosHelper';

import FeedBack from './components/ModalFeedback';
function TranslateScreen() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(sideBarHide(false));
	}, [dispatch]);
	// eslint-disable-next-line react/prop-types
	// const { toText } = props;
	const { t } = useTranslation();
	const [textCategory, setTextCategory] = useState(true);
	const [isLoading, setLoading] = useState(true);
	const [autoDetectLang, setAutoDetectLang] = useState(false);
	const [modalShow, setModalShow] = React.useState(false);
	const [fromLanguage, setFromLanguage] = useState({
		text: t('Translate.listLanguage.anh'),
		code: 'en'
	});
	const [toLanguage, setToLanguage] = useState({
		text: t('Translate.listLanguage.viet'),
		code: 'vi'
	});
	const [exchangeLanguage, setExchangeLanguahe] = useState(true);
	const [textInputTranslate, setTextInputTranslate] = useState('');
	// Khi nhận kết quả, luôn luôn gán kết quả vảo result và edit 
	// Hỗ trợ cho phần editing
	const [resultTranslate, setResultTranslate] = useState({
		result: '',
		edit: ''
	});

	// fucntion map code => text.
	// eslint-disable-next-line no-unused-vars
	const mapCodeToText = (code) => {
		switch (code) {
		case 'en':
			return t('Translate.listLanguage.anh');
		case 'zh':
			return  t('Translate.listLanguage.trung');
		case 'lo':
			return  t('Translate.listLanguage.lao');
		case 'km':
			return  t('Translate.listLanguage.khome');
		case 'vi':
			return  t('Translate.listLanguage.viet');
		default:
			return null;
		}
	};

	useEffect (() => {
		const translateWithAutoDetect = async () => {
			try {
				const result = await detectLang({data: textInputTranslate});
				const text = mapCodeToText(result.data.lang);
				if(text === null || !result.data.status){
					throw 'error';
				}
				setFromLanguage({
					text: mapCodeToText(result.data.lang),
					code: result.data.lang,
				});
				const resultTranslate = await createTranslation({
					data: textInputTranslate,
					direction: `${fromLanguage.code}-${toLanguage.code}`
				});
				setResultTranslate({
					result: resultTranslate.data.data,
					edit: resultTranslate.data.data,
				});
			} catch (e) {
				setLoading(false);
			}
		};
		if(autoDetectLang && textInputTranslate !== ''){
			setLoading(true);
			setResultTranslate({
				result: `${t('Translate.dangdich')}`,
				edit: `${t('Translate.dangdich')}`,
			});
			const timerId = setTimeout(() => {
				translateWithAutoDetect();
				setLoading(false);
			 // make a request after 1 second since there's no typing 
			}, 1000);
			return () => {
				clearTimeout(timerId);
			};
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoDetectLang, textInputTranslate]);

	return (
		<>
			<div className={styles.outerContainer}>
				<div className={styles.outerTab}>
					<ChooseTextCategory textCategory={textCategory} setTextCategory={setTextCategory} />
				</div>
				<div className={styles.content}>
					<div style={{ padding: '0px 20px', borderBottom: '1px solid #ccc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
						<ChooseLanguage
							exchangeLanguage={exchangeLanguage}
							fromLanguage={fromLanguage}
							toLanguage={toLanguage}
							setFromLanguage={setFromLanguage}
							setToLanguage={setToLanguage}
							setExchangeLanguahe={setExchangeLanguahe}
							setAutoDetectLang={setAutoDetectLang}
							autoDetectLang={autoDetectLang}
						/>
					</div>
					<Col md={12} className={styles.boxTranslate}>
						{textCategory ? (
							<Row style={{ minHeight: '150px' }}>
								<Col md={6} style={{ borderRight: '1px solid #ccc' }}>
									<InputTranslateBox
										fromLanguage={fromLanguage}
										toLanguage={toLanguage}
										textInputTranslate={textInputTranslate}
										setTextInputTranslate={setTextInputTranslate}
										setLoading={setLoading}
										setResultTranslate={setResultTranslate}
										isLoading={isLoading}
										autoDetectLang={autoDetectLang}
										setFromLanguage={setFromLanguage}
									/>
								</Col>
								<ResultTranslateBox 
									isLoading={isLoading}
									resultTranslate={resultTranslate}
									setResultTranslate={setResultTranslate}
								/>
							</Row>
						) : (
							<Row style={{ minHeight: '150px' }} className={styles.documentOption}>
								<Col md={12} >
									<span style={{ fontSize: 22 }}>Chọn tài liệu</span><br />
									<span style={{ color: '#616161',  fontSize: 18 }}>Tải lên tệp .doc, .docx, .pdf, .txt trên máy tính của bạn</span>
								</Col>
								<Col md={12} style={{ padding: '10px' }} >
									<Button size='md'>Chọn tệp của bạn</Button>
								</Col>
							</Row>
						)}
					</Col>
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 5 }}>
					<button onClick={() => setModalShow(true)} style={{ backgroundColor: '#fff', borderWidth: 0, color: '#63676C', fontStyle: 'italic', fontSize: 13 }}>
						Gửi phản hồi
					</button>
				</div>
				<FeedBack
					show={modalShow}
					onHide={() => setModalShow(false)} />
			</div>
		</>
	);
}

export default TranslateScreen;
