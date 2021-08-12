/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useTranslation  } from 'react-i18next';
import { Tooltip, OverlayTrigger, Col } from 'react-bootstrap';
// import { BsStar, BsFillStarFill } from 'react-icons/bs';
import { MdContentCopy, MdEdit } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import styles from '../translateStyle.module.css';
import { useNotification } from '../../../components/NotificationProvider';
import TextareaAutosize from 'react-textarea-autosize';
// import Fomart from './Format.json';
// import * as historyHelperHis from '../../../helpers/localStorageHistoryHelper.js';
// import * as DictHelper from '../../../helpers/localStorageDictHelpers.js';
// import { useSelector } from 'react-redux';
export default function ResultTranslateBox(props) {
	const {isLoading, resultTranslate, setResultTranslate} = props;
	// const [currentResultTranslate, setCurrentResultTranslate] = useState(resultTranslate);
	const [isEditMode, setEditMode] = useState(false);
	const dispatchNoti = useNotification();
	const { t } = useTranslation();
	const copyTextResult = (text) => {
		navigator.clipboard.writeText(text);
		dispatchNoti(t('Translate.daSaoChep'));
	};

	const Footer = () => {
		if(!isLoading) {
			if(!isEditMode){
				return (
					<div className={styles.boxclick}>
						<button onClick={() => copyTextResult(resultTranslate)} className={styles.buttonUtility}><MdContentCopy size={22}/></button>
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
				);
			}
			return (
				<div className={styles.boxclick}>
					<button 
						onClick={() => {
							setResultTranslate(resultTranslate);
							setEditMode(false);
						}} 
						className={styles.buttonTextUtility}
					>
						Hủy
					</button>
					<button className={styles.buttonTextUtility} style={{color: '#34639E'}} onClick={() => setEditMode(false)}>Gửi</button>
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
					value={resultTranslate}
					onChange={(event) => {
						event.preventDefault();
						setResultTranslate(event.target.value);
					}}
					disabled={isEditMode ? false : true}
					style={{backgroundColor: isEditMode ? '#f3f3f3' : 'white'}}
					// ref={textareaRef}
					className={[isLoading ? styles.resultTranslate_bandich : styles.resultTranslate_dadich]}/>
				<div md={1} style={{ padding: '0' }} className={['text-center']}>
					{isEditMode && resultTranslate ? (<button onClick={() => setResultTranslate('')} className={styles.buttonUtility} style={{backgroundColor: '#f3f3f3'}}> <CgClose size={20}/></button>):''}
				</div>
			</div>
			<Footer />
		</Col>
	);
}