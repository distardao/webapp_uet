/* eslint-disable react/prop-types */
import React from 'react';
import { ButtonToolbar} from 'react-bootstrap';
import styles from '../translateStyle.module.css';
import { FaExchangeAlt } from 'react-icons/fa';
import { useTranslation  } from 'react-i18next';

export default function ChooseLanguage(props) {

	const { t } = useTranslation();
	const {
		exchangeLanguage,
		fromLanguage,
		toLanguage,
		setFromLanguage,
		setToLanguage,
		autoDetectLang,
		setAutoDetectLang,
		// setExchangeLanguah
	} = props;
	// const listLanguage = [t('Translate.listLanguage.trung'), t('Translate.listLanguage.lao'), t('Translate.listLanguage.khome')];
	const listLanguage = [
		{
			text: t('Translate.listLanguage.anh'),
			code: 'en'
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
		}
	];
	const listLanguageTo = [
		{
			text: t('Translate.listLanguage.viet'),
			code: 'vi'
		}
	];
	const autoDetect = () => {
		setAutoDetectLang(true);
	};
	const changeFromLanguage = (language) => {
		setAutoDetectLang(false);
		setFromLanguage(language);
	};
	const changeToLanguage = (language) => {
		setToLanguage(language);
	};
	const buttonFromLanguage = () => {
		return (
			<div>
				<ul className="nav">
					{
						listLanguage.map((item, key) => 
							<li key={key} className="nav-item" style={{ marginBottom: '-0.5px' }}>
								<button 
									className={`nav-link ${item.code === fromLanguage.code && !autoDetectLang? styles.activeChoose : styles.normal} `} 
									onClick={() => changeFromLanguage(item)} 
								>
									{item.text}
								</button>
							</li>
						)
					}
				</ul>
			</div>
		);
	};

	const buttonToLanguage = () => {
		return (
			<div>
				<ul className="nav">
					{
						listLanguageTo.map((item, key) => 
							<li key={key} className="nav-item" style={{ marginBottom: '-0.5px' }}>
								<button  
									className={`nav-link ${item.code === toLanguage.code ? styles.activeChoose : styles.normal} `} 
									onClick={() => changeToLanguage(item)} 
								>
									{item.text}
								</button>
							</li>
						)
					}
					
				</ul>
			</div>
			// <button size="sm" className={styles.activeChoose}>{!exchangeLanguage?fromLanguage.text:toLanguage.text}</button>
		);
	};
	// const switchLanguage = () => {
	// 	setExchangeLanguahe(exchangeLanguage => !exchangeLanguage);
	// 	const tmp = fromLanguage;
	// 	setFromLanguage(toLanguage);
	// 	setToLanguage(tmp);
	// };

	return (
		<>
			<div style={{ flex: 1, display: 'flex', overflow:'auto', whiteSpace: 'nowrap'}}>
				<ButtonToolbar>
					<button 
						className={autoDetectLang? styles.activeChoose : styles.normal} 
						onClick={autoDetect}
					>
						{t('Translate.phathienngonngu')}
					</button>
					{exchangeLanguage ? buttonFromLanguage() : buttonToLanguage()}
				</ButtonToolbar>
			</div>
			<div style={{  alignSelf: 'center'}}>
				<button className={[styles.buttonExchange]} >
					<FaExchangeAlt size={18}/>
				</button>
			</div>
			<div style={{ flex: 1, }}>
				{!exchangeLanguage ? buttonFromLanguage() : buttonToLanguage()}
			</div>
		</>
	);
}