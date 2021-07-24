/* eslint-disable quotes */
import React, { useState, useEffect, useContext } from 'react';
import styles from './historyStyle.module.css';
import { BsArrowRight } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import * as dictHelpers from '../../helpers/localStorageDictHelpers.js';
import * as HistoryHelpers from '../../helpers/localStorageHistoryHelper.js';
import { ReloadContext } from '../../context/reloadContext';

export default function ItemVocabulary() {
	// eslint-disable-next-line react/prop-types
	const Reload = useContext(ReloadContext);
	const [dictData, setDictData] = useState([]);
	const getAllTranslationDict = async () => {
		const userDictData = await dictHelpers.listRecord();
		setDictData(userDictData);
	};

	useEffect(() => {
		getAllTranslationDict();
	}, [Reload.reload]);

	const onRemoveDict = async (id) => {
		await HistoryHelpers.updateRecord(id);
		await dictHelpers.removeRecord(id);
		Reload.setReload(prevReload => !prevReload);
	};

	return (
		<>
			{
				dictData.map((dict, id) => {
					return (
						<div key={id} style={{ width: '100%', borderBottom: 'solid', borderBottomWidth: 0.5, borderColor: '#F0F0F0' }}>
							<div style={{ display: 'flex', marginRight: 10, marginLeft: 10, justifyContent: 'space-between' }}>
								<div>
									<div style={{ flexDirection: 'row', display: 'flex' }}>
										<div style={{ marginTop: 5, marginLeft: 5, color: '#797979' }}>{dict.textFrom}</div>
										<div style={{ marginTop: 5, marginLeft: 5, color: '#797979' }}><BsArrowRight size={20} /></div>
										<div style={{ marginTop: 5, marginLeft: 5, color: '#797979' }}>{dict.textTo}</div>
									</div>
								</div>
								<div style={{ marginTop: 5, textAlignLast: 'right' }}>
									<button className={styles.buttonUtility} onClick={() => onRemoveDict(dict.id)}><FiTrash2 size={20} color="#1d5193" /></button>
								</div>
							</div>
							<div style={{ marginRight: 10, flex: 1, marginLeft: 15, marginBottom: 10 }}>
								<p style={{ margin: 0 }}>{dict.textTranslateFrom}</p>
								<p style={{ margin: 0 }}>{dict.textTranslateTo}</p>
							</div>
						</div>
					);
				})}
		</>
	);
}
