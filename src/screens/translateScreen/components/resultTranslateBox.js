/* eslint-disable react/prop-types */
import React from 'react';
import { useTranslation  } from 'react-i18next';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
// import { BsStar, BsFillStarFill } from 'react-icons/bs';
import { MdContentCopy, MdEdit } from 'react-icons/md';
import styles from '../translateStyle.module.css';
import { useNotification } from '../../../components/NotificationProvider';
// import Fomart from './Format.json';
// import * as historyHelperHis from '../../../helpers/localStorageHistoryHelper.js';
// import * as DictHelper from '../../../helpers/localStorageDictHelpers.js';
// import { useSelector } from 'react-redux';
export default function ResultTranslateBox(props) {
	const {isLoading, resultTranslate} = props;
	// const [saveCopy, setSaveCopy] = useState(false);
	const dispatchNoti = useNotification();
	const { t } = useTranslation();
	// const { fromText, toText, direction } = useSelector((state) => state.translateReducer);
	const copyTextResult = (text) => {
		navigator.clipboard.writeText(text);
		dispatchNoti(t('Translate.daSaoChep'));
	};
	// const saveTranslateToVocabulary = async () => {
	// 	const newDict = {
	// 		...Fomart[direction],
	// 		textTranslateFrom: fromText,
	// 		textTranslateTo: toText,
	// 		id: new Date().toString()
	// 	};
	// 	if(newDict !== null){
	// 		// setSaveCopy(true);
	// 		await DictHelper.createRecord(newDict);
	// 		dispatchNoti(t('Translate.daThemVaoTuVung'));
	// 	}
	// };
	// useEffect(() => {
	// 	setSaveCopy(false);
	// }, [isLoading]);
	return (
		<>
			<div className={styles.boxdich}>
				<p className={isLoading?styles.resultTranslate_bandich:styles.resultTranslate_dadich}>{resultTranslate}</p>
			</div>
			<div className={styles.boxclick}>
				{
					!isLoading?(
						<>
							{/* <Col md={1}> */}
							{/* <button className={styles.buttonUtility}><HiVolumeUp /></button> */}
							{/* </Col> */}
							{/* {!saveCopy?(
								<button onClick={() => saveTranslateToVocabulary()} className={styles.buttonUtility}><BsStar /></button>
							):(
								<button className={styles.buttonUtility}><BsFillStarFill color='#FBBC04' /></button>
							)} */}
							<button onClick={() => copyTextResult(resultTranslate)} className={styles.buttonUtility}><MdContentCopy /></button>
							<OverlayTrigger
								placement="bottom"
								delay={{ show: 250, hide: 400 }}
								overlay={
									<Tooltip>
										Đề xuất chỉnh sửa
									</Tooltip>
								}
							>
								<button className={styles.buttonUtility} ><MdEdit /></button>
							</OverlayTrigger>
						</>
					):
						('')
				}
			</div>
		</>
	);
}