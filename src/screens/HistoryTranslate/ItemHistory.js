/* eslint-disable quotes */
import React, { useContext, useState, useEffect } from 'react';
import styles from './historyStyle.module.css';
import { BsArrowRight } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import * as historyHelperHis from '../../helpers/localStorageHistoryHelper.js';
import * as historyHelperDict from '../../helpers/localStorageDictHelpers.js';
import { ReloadContext } from '../../context/reloadContext';

export default function ItemHistory() {
	// eslint-disable-next-line react/prop-types
	const Reload = useContext(ReloadContext);
	// const { historyData } = props || [];
	const [historyData, setHistoryData] = useState([]);

	const getAllHistory = async () => {
		const userHistoryData = await historyHelperHis.listRecord();
		setHistoryData(userHistoryData);
	};

	useEffect(() => {
		getAllHistory();
	}, [Reload.reload]);

	const SaveTranslate = (id) => {
		historyData.forEach(async (history) => {
			if (history.id === id) {
				const saveWord = {
					id: history.id,
					textFrom: history.textFrom,
					textTo: history.textTo,
					textTranslateFrom: history.textTranslateFrom,
					textTranslateTo: history.textTranslateTo,
					codeFrom: history.codeFrom,
					codeTo: history.codeTo,
				};
				await historyHelperHis.updateRecord(id);
				await historyHelperDict.createRecord(saveWord);
				await Reload.setReload(!Reload.reload);
			}
		});
	};

	const removeHisTran = async (id) => {
		await historyHelperHis.removeRecord(id);
		Reload.setReload(!Reload.reload);
	};


	return (
		<>
			{historyData.map((history, id) => {
				return (
					<div key={id} style={{ width: '100%', borderBottom: 'solid', borderBottomWidth: 0.5, borderColor: '#F0F0F0' }}>
						<div style={{ display: 'flex', marginRight: 10, marginLeft: 10, justifyContent: 'space-between' }}>
							<div style={{ flexDirection: 'row', display: 'flex', padding: '10px 0 0 5px' }}>
								<div style={{ color: '#797979', fontSize: '14px' }}>{history.textFrom}</div>
								<div style={{ color: '#797979', fontSize: '14px' }}><BsArrowRight size={20} /></div>
								<div style={{ color: '#797979', fontSize: '14px' }}>{history.textTo}</div>
							</div>
							<div style={{ marginTop: 5, textAlignLast: 'right' }}>
								{history.isSave ?
									<button className={styles.buttonUtility} onClick={() => SaveTranslate(history.id)} disabled>
										<AiFillStar size={20} color="#FBBC04" />
									</button> : <button className={styles.buttonUtility} onClick={() => SaveTranslate(history.id)}>
										<AiOutlineStar size={20} color="#000000" />
									</button>
								}
								<button className={styles.buttonUtility} onClick={() => removeHisTran(history.id)}>
									<FiTrash2 size={20} color="#1d5193" />
								</button>
							</div>
						</div>
						<div style={{ padding: '2px 0 0 15px' }}>
							<p style={{ margin: 0 }}>{history.textTranslateFrom}</p>
							<p style={{ margin: 0 }}>{history.textTranslateTo}</p>
						</div>
					</div>
				);
			})}
		</>
	);
}
