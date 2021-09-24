/* eslint-disable quotes */
import React, { useState, useEffect, useContext } from 'react';
import {
	Container,
	Row,
	Col,
	Tabs,
	Tab
} from 'react-bootstrap';
import styles from './historyStyle.module.css';
import EmptyHistory from './EmptyHistory';
import EmptyVocabulary from './EmptyVocabulary';
import ItemHistory from './ItemHistory';
import ItemVocabulary from './ItemVocabulary';
// import { AiOutlineReload } from 'react-icons/ai';
import './HistoryTranslate.css';
import { useTranslation } from 'react-i18next';
import * as historyHelperHis from '../../helpers/localStorageHistoryHelper.js';
import * as historyHelperDict from '../../helpers/localStorageDictHelpers.js';
import { ReloadContext } from '../../context/reloadContext';
import { useSelector } from 'react-redux';
import Fomart from './Format.json';

const DoHaveHistoryData = () => {
	const Reload = useContext(ReloadContext);
	const { t } = useTranslation();
	const [isHistoryData, setIsHistoryData] = useState(null);
	const { fromText, toText, direction } = useSelector((state) => state.translateReducer);

	const addNewHistory = async () => {
		const newHistory = {
			...Fomart[direction],
			textTranslateFrom: fromText,
			textTranslateTo: toText
		};
		await historyHelperHis.createRecord(newHistory);
	};

	const removeHisTranAll = async () => {
		await historyHelperHis.removeAllRecord();
		Reload.setReload(prevReload => !prevReload);
	};

	const getAllTranslationHistory = async () => {
		const userHistoryData = await historyHelperHis.listRecord();
		if (userHistoryData.length >= 1) {
			setIsHistoryData(true);
		} else {
			setIsHistoryData(false);
		}
	};

	// const LoadTranslationHistory = () => {
	// 	Reload.setReload(prevReload => !prevReload);
	// };

	useEffect(() => {
		getAllTranslationHistory();
	}, [Reload.reload]);

	useEffect(() => {
		addNewHistory();
		Reload.setReload(prevReload => !prevReload);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fromText, toText]);
	return (
		<>
			<Row style={{ borderBottom: '1px solid #F0F0F0' }}>
				<Col className={styles.title_history}>{t('History.lichsudadich')} </Col>
				<Col style={{ textAlign: 'end', alignSelf: 'center' }}>
					{/* <button className={styles.buttonUtility} onClick={LoadTranslationHistory}><AiOutlineReload size={25} color="#095F00" /></button> */}
					{isHistoryData?(
						<button className={styles.buttonUtility} onClick={removeHisTranAll}>Xóa toàn bộ lịch sử</button>
					):('')}
					
				</Col>
			</Row>
			<Row>
				{
					// eslint-disable-next-line no-constant-condition
					isHistoryData ? <ItemHistory /> : <EmptyHistory notify={t('History.title1')} />
				}
			</Row>
		</>
	);
};

const DoHaveDictData = () => {
	const Reload = useContext(ReloadContext);
	const { t } = useTranslation();
	const [isDictData, setIsDictData] = useState(null);

	const getAllTranslationDict = async () => {
		const userDictData = await historyHelperDict.listRecord();
		if (userDictData.length >= 1) {
			setIsDictData(true);
		} else {
			setIsDictData(false);
		}
	};

	useEffect(() => {
		getAllTranslationDict();
	}, [Reload.reload]);

	const removeDictTranAll = async () => {
		await historyHelperHis.updateAllRecord();
		await historyHelperDict.removeAllRecord();
		Reload.setReload(prevReload => !prevReload);
	};
	return (
		<>
			<Row style={{ borderBottom: '1px solid #F0F0F0' }}>
				<Col className={styles.title_history}>{t('History.tuvungdaluu')}</Col>
				<Col style={{ textAlign: 'end', alignSelf: 'center' }}>
					{isDictData?(
						<button className={styles.buttonUtility} onClick={removeDictTranAll} >Xóa toàn bộ từ vựng</button>
					):('')}
				</Col>
			</Row>
			<Row className={styles.boxTranslate_history}>
				{
					// eslint-disable-next-line no-constant-condition
					isDictData ? <ItemVocabulary /> : <EmptyVocabulary notify={t('History.title2')} />
				}
			</Row>
		</>
	);
};

export default function HistoryTranslate() {
	const { t } = useTranslation();
	const [reload, setReload] = useState(false);
	useContext(ReloadContext);
	const getAllTranslationDict = async () => {
		await historyHelperDict.listRecord();
	};
	return (
		<ReloadContext.Provider value={{ reload: reload, setReload: setReload }}>
			<Container fluid>
				<Row style={{ marginTop: '20px' }}>
					<Col md={{ span: 6, offset: 3 }} className={styles.content__history}>
						<Tabs defaultActiveKey="home" id="uncontrolled-tab-examples">
							<Tab eventKey="home" title={t('History.lichsu')} tabClassName="Tab_style" >
								<DoHaveHistoryData />
							</Tab>
							<Tab onClick={() => getAllTranslationDict()} eventKey="profile" title={t('History.tuvung')} tabClassName="Tab_style">
								<DoHaveDictData />
							</Tab>
						</Tabs>
					</Col>
				</Row >
			</Container >
		</ReloadContext.Provider>
	);
}