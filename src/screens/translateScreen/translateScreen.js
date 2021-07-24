import React, { useState } from 'react';
import { 
	Container,
	Row,
	Col,
	Image,
	Button,
} from 'react-bootstrap';
import { useTranslation  } from 'react-i18next';
// import { connect } from 'react-redux';
import styles from './translateStyle.module.css';
import Logo from '../../assets/images/lg.png';
import ChooseTextCategory from './components/chooseTextCategory';
import ChooseLanguage from './components/chooseLanguage';
import InputTranslateBox from './components/inputTranslateBox'; 
import ResultTranslateBox from './components/resultTranslateBox';

function TranslateScreen() {
	// eslint-disable-next-line react/prop-types
	// const { toText } = props;
	const { t } = useTranslation();
	const [textCategory, setTextCategory] = useState(true);
	const [isLoading, setLoading] = useState(true);
	const [autoDetectLang, setAutoDetectLang] = useState(false);
	const [fromLanguage, setFromLanguage] = useState({
		text: t('Translate.listLanguage.trung'),
		code: 'zh'
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
			<Container fluid>
				<Row className={styles.headerTop}>
					<Col className={styles.title}>
						<Image style={{ width: '40px' }} src={Logo} alt="" roundedCircle /> {t('Translate.title')}
					</Col>
				</Row>
			</Container>
			<Container>
				<Row style={{ padding: '10px 0'}}>
					<ChooseTextCategory textCategory={textCategory} setTextCategory={setTextCategory} />
				</Row>
				<Row className={styles.content}>
					<Col md={12} style={{ padding: '10px', borderBottom: '1px solid #ccc' }} >
						<Row>
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
						</Row>
					</Col>
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
								<Col md={6} style={{ position: 'relative' }}>
									<ResultTranslateBox 
										isLoading={isLoading}
										resultTranslate={resultTranslate}
									/>
								</Col>
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
				</Row>
				
					
				
			</Container>
		</>
	);
}

export default TranslateScreen;
