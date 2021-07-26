/* eslint-disable react/prop-types */
import React from 'react';
import {Row, Col, ButtonToolbar} from 'react-bootstrap';
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
							// eslint-disable-next-line react/jsx-key
							<li className="nav-item">
								<button key={key} className={`nav-link ${item.code === fromLanguage.code && !autoDetectLang? styles.activeChoose : styles.normal} `} onClick={() => changeFromLanguage(item)} >{item.text}</button>
							</li>
						)
					}
				</ul>
			</div>
		);
	};
	const buttonDetectTrue = () => {
		return (
			<button size="sm" className={styles.activeChoose} style={{ marginRight: '5px' }} onClick={() => {autoDetect();}}>{t('Translate.phathienngonngu')}</button>
		);
	};
	const buttonDetectFalse = () => {
		return (
			<button size="sm" className={styles.normal} style={{ marginRight: '5px' }} onClick={() => {autoDetect();}}>{t('Translate.phathienngonngu')}</button>
		);
	};
	const buttonToLanguage = () => {
		return (
			<div>
				<ul className="nav">
					{
						listLanguageTo.map((item, key) => 
							// eslint-disable-next-line react/jsx-key
							<li className="nav-item">
								<button key={key} className={`nav-link ${item.code === toLanguage.code ? styles.activeChoose : styles.normal} `} onClick={() => changeToLanguage(item)} >{item.text}</button>
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
			<Col>
				<Row>
					<Col md={12}>
						<ButtonToolbar>
							{autoDetectLang?buttonDetectTrue():buttonDetectFalse()}
							{exchangeLanguage ? buttonFromLanguage() : buttonToLanguage()}
						</ButtonToolbar>
									
					</Col>
				</Row>
			</Col>
			<Col md={1} style={{ textAlign: 'center', paddingTop: '5px' }}>
				<button className={[styles.buttonExchange]} >
					<FaExchangeAlt />
				</button>
			</Col>
			<Col>
				{!exchangeLanguage ? buttonFromLanguage() : buttonToLanguage()}
			</Col>
		</>
	);
}