import React, { useState, useEffect } from 'react';
import { 
	Row,
	Col,
	Button,
} from 'react-bootstrap';
import { useTranslation  } from 'react-i18next';
// import { CgMenu } from 'react-icons/cg';
// import { connect } from 'react-redux';
import styles from './translateStyle.module.css';
// import Logo from '../../assets/images/lg.png';
import ChooseTextCategory from './components/chooseTextCategory';
import ChooseLanguage from './components/chooseLanguage';
import InputTranslateBox from './components/inputTranslateBox'; 
import ResultTranslateBox from './components/resultTranslateBox';
// import HistoryTranslate from '../HistoryTranslate';
import { useDispatch  } from 'react-redux';
import { sideBarHide } from '../../redux/actions/navbarAction';
function TranslateScreen() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(sideBarHide(false));
	},[dispatch]);
	// eslint-disable-next-line react/prop-types
	// const { toText } = props;
	const { t } = useTranslation();
	const [textCategory, setTextCategory] = useState(true);
	const [isLoading, setLoading] = useState(true);
	const [autoDetectLang, setAutoDetectLang] = useState(false);
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
	const [resultTranslate, setResultTranslate] = useState('');
	return (
		<>
			{/* <Container fluid>
				<Row className={styles.headerTop}>
					<div className={styles.buttonSidebars}><button className={styles.buttonSidebar}><CgMenu /></button></div>
					<div className={styles.title}> */}
			{/* <Image style={{ width: '40px' }} src={Logo} alt="" roundedCircle /> */}
			{/* {t('Translate.title')} */}
			{/* </div>
				</Row>
			</Container> */}
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
						{textCategory?(
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
						):(
							<Row style={{ minHeight: '150px' }} className={styles.documentOption}>
								<Col md={12} >
									<span style={{ fontSize: '20px' }}>Chọn tài liệu</span><br />
									<span style={{ color: '#616161' }}>Tải lên tệp .doc, .docx, .pdf, .txt trên máy tính của bạn</span>
								</Col>
								<Col md={12} style={{ padding: '10px' }} >
									<Button size='sm'>Chọn tệp của bạn</Button>
								</Col>
							</Row>
						)}
					</Col>
				</div>
			</div>
			{/* <HistoryTranslate /> */}
		</>
	);
}

export default TranslateScreen;
