/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useTranslation  } from 'react-i18next';
import { Tooltip, OverlayTrigger, Col } from 'react-bootstrap';
// import { BsStar, BsFillStarFill } from 'react-icons/bs';
import { MdContentCopy, MdEdit, MdVolumeUp, MdStarBorder } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import styles from '../translateStyle.module.css';
import { useNotification } from '../../../components/NotificationProvider';
import TextareaAutosize from 'react-textarea-autosize';

export default function ResultTranslateBox(props) {
	const { t } = useTranslation();
	const {isLoading, resultTranslate, setResultTranslate} = props;
	const [isEditMode, setEditMode] = useState(false);
	const dispatchNoti = useNotification();
	const copyTextResult = (text) => {
		navigator.clipboard.writeText(text);
		dispatchNoti(t('Translate.daSaoChep'));
	};

	// Reset lại box dịch
	useEffect(() => {
		if(isEditMode && resultTranslate.result === `${t('Translate.bandich')}`){
			setEditMode(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[resultTranslate.result]);

	const Footer = () => {
		if(!isLoading) {
			if(!isEditMode){
				return (
					<div className={styles.boxclick}>
						<button onClick={() => {}} className={styles.buttonUtility}><MdVolumeUp size={22}/></button>
						<div>
							<button onClick={() => copyTextResult(resultTranslate.result)} className={styles.buttonUtility}><MdContentCopy size={22}/></button>
							<OverlayTrigger
								placement="bottom"
								delay={{ show: 250, hide: 400 }}
								overlay={
									<Tooltip>
									Đề xuất chỉnh sửa
									</Tooltip>
								}
							>
								<button className={styles.buttonUtility} onClick={() => isEditMode ? setEditMode(false) : setEditMode(true)}><MdEdit size={22}/></button>
							</OverlayTrigger>
						</div>
					</div>
				);
			}
			return (
				<div className={styles.boxclick} style={{justifyContent: 'flex-end'}}>
					<button 
						onClick={() => {
							setResultTranslate({
								...resultTranslate,
								edit: resultTranslate.result
							});
							setEditMode(false);
						}} 
						className={styles.buttonTextUtility}
					>
						Hủy
					</button>
					<button 
						onClick={() => {
							setResultTranslate({
								...resultTranslate,
								result: resultTranslate.edit
							});
							setEditMode(false);
						}}  
						className={styles.buttonTextUtility} 
						style={{color: '#34639E'}}
					>
						Gửi
					</button>
				</div>
			);
			
		}
		return null;
	};

	return (
		<Col md={6} className={styles.ResultTranslateBox} style={{backgroundColor: isEditMode ? '#f3f3f3' : 'white'}}>
			<div className={styles.boxdich}>
				<TextareaAutosize
					minRows={3}
					value={resultTranslate.edit}
					onChange={(event) => {
						event.preventDefault();
						setResultTranslate({
							...resultTranslate,
							edit: event.target.value
						});
					}}
					disabled={isEditMode? false : true}
					style={{backgroundColor: isEditMode ? '#f3f3f3' : 'white'}}
					// ref={textareaRef}
					className={[isLoading ? styles.resultTranslate_bandich : styles.resultTranslate_dadich]}/>
				<div md={1} style={{ padding: '0' }} className={['text-center']}>
					{isEditMode ? 
						(
							<button onClick={() => setResultTranslate({
								...resultTranslate,
								edit: ''
							})} 
							className={styles.buttonUtility} 
							style={{backgroundColor: '#f3f3f3'}}
							> 
								<CgClose size={22}/>
							</button>
						): null}
					{!isEditMode && resultTranslate.result !== `${t('Translate.bandich')}` && !isLoading ? 
						(
							<button onClick={() => {}} 
								className={styles.buttonUtility} 
							> 
								<MdStarBorder size={22}/>
							</button>
						): null}
				</div>
			</div>
			<Footer />
		</Col>
	);
}