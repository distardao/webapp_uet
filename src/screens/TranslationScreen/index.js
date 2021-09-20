import React, { useEffect, useRef } from 'react';
import { 
	Row,
	Col,
	Button,
} from 'react-bootstrap';
import { VscWordWrap } from 'react-icons/vsc';
import { BsFileEarmarkText } from 'react-icons/bs';
import styles from './translateStyle.module.css';
import { IconButton, Tab, Tabs } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { STATE } from '../../redux/reducers/translateReducer';
import { 
	changeSource, 
	changeTarget, 
	swapTranslate, 
	translationAsync, 
	changeSourceText, 
	reset,
} from '../../redux/actions/translateAction';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TextareaAutosize from 'react-textarea-autosize';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CloseIcon from '@mui/icons-material/Close';

import { useTranslation } from 'react-i18next';

function Index() {
	const inputEl = useRef(null);
	const state = useSelector(state => state.translateReducer);
	const dispatch = useDispatch();
	const { t } = useTranslation();

	/**
	 * @description useEffect cho việc check kết quả và báo noti cho 
	 * người dùng
	 */
	useEffect(() => {
		switch (state.currentState) {
		case STATE.SUCCESS:
			break;
		default:
			break;
		}
	}, [state.currentState]);


	const handleTranslate = (evt) => {
		evt.preventDefault();
		dispatch(changeSourceText(evt.target.value));
		if(evt.target.value !== '') {
			dispatch(translationAsync({
				sourceText: evt.target.value,
				sourceLang: state.translateCode.sourceLang,
				targetLang: state.translateCode.targetLang,
			}));
		}
	};

	const handleChange = (event, newValue) => {
		dispatch(changeSource(newValue));
	};

	const handleChangeTo = (event, newValue) => {
		dispatch(changeTarget(newValue));
	};

	const handleSwap = () => {
		dispatch(swapTranslate(state.translateCode.targetLang,state.translateCode.sourceLang));
	};

	const handleResetInput = () => {
		dispatch(reset());
		inputEl.current.focus();
	};
    
	const listLanguage = [
		// {
		// 	text: t('Translate.listLanguage.anh'),
		// 	code: 'en'
		// },
		{
			text: t('Translate.listLanguage.viet'),
			code: 'vi'
		},
		{
			text: t('Translate.listLanguage.trung'),
			code: 'zh'
		},
		{
			text: t('Translate.listLanguage.lao'),
			code: 'lo'
		},
		{
			text: t('Translate.listLanguage.khome'),
			code: 'km'
		},
	];

	const isShow = () => {
		if(state.currentState === STATE.LOADING || state.currentState === STATE.DISABLEINPUT) {
			return true;
		}
		if(state.translateText.sourceText === '') {
			return true;
		}
		if(state.translateText.sourceText === null) {
			return true;
		}
		return false;
	};

	const showValueResult = () => {
		if(state.currentState === STATE.LOADING){
			return t('Translate.dangNhap');
		}
		if(state.currentState === STATE.DISABLEINPUT) {
			return t('Translate.dangdich');
		}
		return state.translateText.targetText;
	};

	return (
		<>
			<div className={styles.outerContainer}>
				<div className={styles.outerTab} >
					<Button onClick={() => {}} style={{ display: 'flex', fontSize: 20, fontWeight: 500, marginRight: '20px'}} variant={'primary'}>
						<div style={{paddingRight: 5, alignContent: 'center'}}>
							<VscWordWrap size={28}/>	
						</div> 
						{t('Translate.vanban')}
					</Button>
					<Button onClick={() => {}} style={{ display: 'flex', fontSize: 20, fontWeight: 500 }} variant={'primary'}>
						<div style={{paddingRight: 5, alignContent: 'center'}}>
							<BsFileEarmarkText size={28}/> 
						</div> 
						{t('Translate.tailieu')}
					</Button>
				</div>
				<div className={styles.content} >
					<div style={{ padding: '0px 20px', borderBottom: '1px solid #ccc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
						{/* ChooseLang */}
						<div style={{ flex: 1, display: 'flex', overflow:'auto', whiteSpace: 'nowrap'}}>
							<Tabs 
								value={state.translateCode.sourceLang} 
								onChange={handleChange} 
								variant="scrollable"
								scrollButtons="auto"
							>
								{listLanguage.map(item => <Tab label={item.text} key={item.code} value={item.code}/>)}
							</Tabs>
						</div>
						<div style={{  alignSelf: 'center'}}>
							<IconButton aria-label="Example" onClick={handleSwap}>
								<SwapHorizIcon fontSize='medium'/>
							</IconButton>
						</div>
						<div style={{ flex: 1, display: 'flex', overflow:'auto', whiteSpace: 'nowrap'}}>
							<Tabs 
								value={state.translateCode.targetLang} 
								onChange={handleChangeTo} 
								variant="scrollable"
								scrollButtons="auto"
							>
								{listLanguage.map(item => <Tab label={item.text} key={item.code} value={item.code}/>)}
							</Tabs>
						</div>
					</div>
					{/* Box translate */}
					<Col md={12} className={styles.boxTranslate}>
						<Row style={{ minHeight: '150px' }}>
							<Col md={6} style={{ 
								borderRight: '1px solid #ccc', 
								backgroundColor: state.currentState === STATE.DISABLEINPUT ? '#f3f3f3' : 'white'  
							}}>
								<div style={{ 
									paddingTop: '10px', 
									paddingBottom: '30px', 
									display: 'flex',
								}}>
									<div style={{ paddingRight: '0', flex: 1 }} >
										<TextareaAutosize
											ref={inputEl}
											minRows={3}
											disabled={state.currentState === STATE.DISABLEINPUT}
											onChange={handleTranslate}
											value={state.translateText.sourceText}
											className={[styles.from_language]}/>
									</div>
									<div md={1} style={{ padding: '0' }} className={['text-center']}>
										{!isShow() ? 
											<IconButton aria-label="Example" onClick={handleResetInput}>
												<CloseIcon fontSize='small'/>
											</IconButton> : null}
									</div>
								</div>
							</Col>
		                    <Col md={6} className={styles.ResultTranslateBox} style={{backgroundColor:'white'}}>
								<div className={styles.boxdich}>
									<TextareaAutosize
										disabled={true}
										minRows={3}
										style={{backgroundColor: 'white'}}
										value={showValueResult()}
										// className={[ state.currentState === STATE.LOADING || state.currentState === STATE.DISABLEINPUT ? styles.resultTranslate_bandich : styles.resultTranslate_dadich]}
										className={[ styles.resultTranslate_bandich ]}
									/>
								</div>
							</Col>
						</Row>
					</Col> 
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 5 }}>
					<button onClick={() => {}} style={{ backgroundColor: '#fff', borderWidth: 0, color: '#63676C', fontStyle: 'italic', fontSize: 13 }}>
						Gửi phản hồi
					</button>
				</div>
			</div>
		</>
	);
}

export default Index;
