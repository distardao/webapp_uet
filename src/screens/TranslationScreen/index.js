import React, { useEffect, useRef } from 'react';
import { 
	Row,
	Col,
} from 'react-bootstrap';
import styles from './translateStyle.module.css';
import { IconButton, Tab, Button, CircularProgress } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector, useDispatch } from 'react-redux';
import { STATE } from '../../redux/reducers/translateReducer';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { 
	changeSource, 
	changeTarget, 
	swapTranslate, 
	translationAsync, 
	translationAndDetectAsync,
	changeSourceText, 
	reset,
	changeTargetText,
} from '../../redux/actions/translateAction';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TextareaAutosize from 'react-textarea-autosize';
import TranslateIcon from '@mui/icons-material/Translate';
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
		case STATE.FAILURE:
			alert(`${state.err}`);
			break;
		default:
			break;
		}
	}, [state.currentState]);

	/**
 	* @description Function thay đổi source text, đồng thời reset lại target text
 	*/
	const handleChangeSourceText = (evt) => {
		evt.preventDefault();
		dispatch(changeSourceText(evt.target.value));
		if(evt.target.value === ''){
			dispatch(changeTargetText(''));
		}
	};

	/**
 	* @description Function dịch từ, (Ấn enter hoặc ấn nút dịch từ)
	* 1. Trong trường hợp có kết quả dịch => reset lại kết quả dịch về rỗng => gọi lại dịch
	* 2. Còn lại thì dịch vs 2 TH => sourcelang === null (Nhận dạng ngôn ngữ) và sourcelang === vi,cn .. 
 	*/
	const handleTranslate = () => {
		if( state.translateText.targetText !== '' ){
			dispatch(changeTargetText(''));
		}
		if(state.translateCode.sourceLang){
			dispatch(translationAsync({
				sourceText: state.translateText.sourceText,
				sourceLang: state.translateCode.sourceLang,
				targetLang: state.translateCode.targetLang,
			}));
		} else {
			dispatch(translationAndDetectAsync({
				sourceText: state.translateText.sourceText,
				targetLang: state.translateCode.targetLang,
			}));
		}
	};

	
	/**
 	* @description Function thay đổi loại ngôn ngữ source
	* Trong TH đã có kết quả dịch, sẽ reset kết quả về rỗng
 	*/
	const handleChangeFrom = (event, newValue) => {
		dispatch(changeSource(newValue));
		// if( state.translateText.targetText !== '' ){
		// 	dispatch(changeTargetText(''));
		// }
	};

	/**
 	* @description Function thay đổi ngôn ngữ target, 2 TH: 
	* 1. Có kết quả dịch => reset lại target text => gọi lại hàm dịch.
	* 2. Ko có kết quả dịch => không gọi lại hàm dịch.
 	*/
	const handleChangeTo = (event, newValue) => {
		dispatch(changeTarget(newValue));
		if( state.translateText.targetText !== '' ){
			dispatch(changeTargetText(''));
			if(state.translateCode.sourceLang){
				dispatch(translationAsync({
					sourceText: state.translateText.sourceText,
					sourceLang: state.translateCode.sourceLang,
					targetLang: newValue,
				}));
			} else {
				dispatch(translationAndDetectAsync({
					sourceText: state.translateText.sourceText,
					targetLang: newValue,
				}));
			}
		}
	};

	/**
 	* @description Function hoán đổi loại ngôn ngữ
 	*/
	const handleSwap = () => {
		dispatch(swapTranslate(state.translateCode.targetLang,state.translateCode.sourceLang));
		if( state.translateText.targetText !== '' ){
			dispatch(changeSourceText(state.translateText.targetText));
			dispatch(changeTargetText(state.translateText.sourceText));
		}
	};

	/**
 	* @description Function reset text nhập vào về rỗng => reset cả output text về rỗng
 	*/
	const handleResetInput = () => {
		dispatch(reset());
		inputEl.current.focus();
	};

	/**
 	* @description Function check điều kiện để hiển thị nút x
 	*/
	const isShowCloseButton = () => {
		if(state.currentState === STATE.LOADING) {
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

	return (
		<>
			<div className={styles.outerContainer}>
				<div className={styles.outerTab} >
					<LoadingButton 
						variant="contained" 
						onClick={handleTranslate}
						// loading={state.currentState === STATE.LOADING}
						disabled={state.translateText.sourceText === '' || state.currentState === STATE.LOADING}
						style={{ fontWeight: 'bold', marginRight: '20px', display: 'flex'}}
					>
						Dịch
					</LoadingButton>
					<Button onClick={() => {}} style={{ fontWeight: 'bold', marginRight: '20px', display: 'flex'}} variant={'contained'}>
						<div style={{paddingRight: 5, alignContent: 'center'}}>
							<TranslateIcon/>	
						</div> 
						{t('Translate.vanban')}
					</Button>
					{/* <Button onClick={() => {}} style={{ display: 'flex', fontSize: 20, fontWeight: 500 }} variant={'primary'}>
						<div style={{paddingRight: 5, alignContent: 'center'}}>
							<BsFileEarmarkText size={28}/> 
						</div> 
						{t('Translate.tailieu')}
					</Button> */}
				</div>
				<div className={styles.content} >
					<div style={{ borderBottom: '1px solid #ccc', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
						{/* ChooseLang */}
						<div style={{ flex: 1, display: 'flex', overflow:'auto', whiteSpace: 'nowrap'}}>
							<Tabs 
								value={state.translateCode.sourceLang} 
								onChange={handleChangeFrom} 
								variant="scrollable"
								scrollButtons='auto'
								sx={{
									[`& .${tabsClasses.scrollButtons}`]: {
									  '&.Mui-disabled': { opacity: 0.3 },
									},
								  }}
							>
								<Tab label={t('Translate.phathienngonngu')} value={null} disabled={state.currentState === STATE.LOADING} style={{fontWeight: 'bold'}}/>
								{state.isSwap ? <Tab label={t('Translate.listLanguage.anh')} value={'en'} disabled={state.currentState === STATE.LOADING} style={{fontWeight: 'bold'}}/> : null}
								{state.isSwap ? <Tab label={t('Translate.listLanguage.trung')} value={'zh'} disabled={state.currentState === STATE.LOADING} style={{fontWeight: 'bold'}}/> : null}
								{state.isSwap ? <Tab label={t('Translate.listLanguage.lao')} value={'lo'} disabled={state.currentState === STATE.LOADING} style={{fontWeight: 'bold'}}/> : null}
								{state.isSwap ? <Tab label={t('Translate.listLanguage.khome')} value={'km'} disabled={state.currentState === STATE.LOADING}style={{fontWeight: 'bold'}}/> : null}
								{!state.isSwap ? <Tab label={t('Translate.listLanguage.viet')} value={'vi'} disabled={state.currentState === STATE.LOADING} style={{fontWeight: 'bold'}}/> : null}
							</Tabs>
						</div>
						<div style={{  alignSelf: 'center'}}>
							<IconButton aria-label="Example" onClick={handleSwap} disabled={state.translateCode.sourceLang === null || state.currentState === STATE.LOADING}>
								<SwapHorizIcon fontSize='medium'/>
							</IconButton>
						</div>
						<div style={{ flex: 1, display: 'flex', overflow:'auto', whiteSpace: 'nowrap'}}>
							<Tabs 
								value={state.translateCode.targetLang} 
								onChange={handleChangeTo} 
								variant="scrollable"
								scrollButtons='auto'
								sx={{
									[`& .${tabsClasses.scrollButtons}`]: {
									  '&.Mui-disabled': { opacity: 0.3 },
									},
								  }}
							>
								{!state.isSwap ? <Tab label={t('Translate.listLanguage.anh')} value={'en'} disabled={state.currentState === STATE.LOADING} style={{fontWeight: 'bold'}}/> : null}
								{!state.isSwap ? <Tab label={t('Translate.listLanguage.trung')} value={'zh'} disabled={state.currentState === STATE.LOADING} style={{fontWeight: 'bold'}}/> : null}
								{!state.isSwap ? <Tab label={t('Translate.listLanguage.lao')} value={'lo'} disabled={state.currentState === STATE.LOADING} style={{fontWeight: 'bold'}}/> : null}
								{!state.isSwap ? <Tab label={t('Translate.listLanguage.khome')} value={'km'} disabled={state.currentState === STATE.LOADING}style={{fontWeight: 'bold'}}/> : null}
								{state.isSwap ? <Tab label={t('Translate.listLanguage.viet')} value={'vi'} disabled={state.currentState === STATE.LOADING} style={{fontWeight: 'bold'}}/> : null}
							</Tabs>
						</div>
					</div>
					{/* Box translate */}
					<Col md={12} className={styles.boxTranslate}>
						<Row style={{ minHeight: '150px' }}>
							<Col md={6} style={{ 
								borderRight: '1px solid #ccc', 
								backgroundColor: state.currentState === STATE.LOADING ? '#f3f3f3' : 'white'  
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
											disabled={state.currentState === STATE.LOADING}
											onChange={handleChangeSourceText}
											value={state.translateText.sourceText}
											className={[styles.from_language]}
											onKeyPress={(e) => e.key === 'Enter' ? handleTranslate() : null }
											placeholder={t('Translate.nhapVanBan')}
										/>
									</div>
									<div md={1} style={{ padding: '0' }} className={['text-center']}>
										{!isShowCloseButton() ? 
											<IconButton aria-label="Example" onClick={handleResetInput}>
												<CloseIcon fontSize='small'/>
											</IconButton> : null}
									</div>
								</div>
							</Col>
		                    <Col 
								md={6} 
								className={styles.ResultTranslateBox} 
								style={{
									backgroundColor: state.translateText.targetText === '' ? '#f3f3f3' : 'white'
								}}>
								{state.translateText.targetText !== '' ?
									<div>
										<div className={styles.boxdich}>
											<TextareaAutosize
												disabled={true}
												minRows={3}
												style={{backgroundColor: 'white'}}
												value={state.translateText.targetText}
												className={[ styles.resultTranslate_bandich ]}
											/> 
										</div>
										<div style={{ justifyContent: 'end', display: 'flex', paddingBottom: 5}}>
											<IconButton aria-label="Example" onClick={() => navigator.clipboard.writeText(state.translateText.targetText)}>
												<ContentCopyIcon fontSize='medium'/>
											</IconButton>
										</div>
									</div>
									: <div style={{
										backgroundColor: state.translateText.targetText === '' ? '#f3f3f3' : 'white' , 
										display: 'flex', 
										flex: 1, 
										alignItems: 'center', 
										justifyContent: 'center',
									}}>	
										{state.currentState === STATE.LOADING ? <CircularProgress /> : null}
									</div>
								}
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
