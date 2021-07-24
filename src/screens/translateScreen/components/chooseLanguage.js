/* eslint-disable react/prop-types */
import React from 'react';
import {Row, Col, ButtonToolbar, Button, Dropdown} from 'react-bootstrap';
import styles from '../translateStyle.module.css';
import { FaExchangeAlt } from 'react-icons/fa';
import { HiLightBulb } from 'react-icons/hi';
import { useTranslation  } from 'react-i18next';

export default function ChooseLanguage(props) {
	const { t } = useTranslation();
	const {
		exchangeLanguage,
		fromLanguage,
		toLanguage,
		setFromLanguage,
		setToLanguage,
		// autoDetectLang,
		setAutoDetectLang,
		// setExchangeLanguah
	} = props;
	// const listLanguage = [t('Translate.listLanguage.trung'), t('Translate.listLanguage.lao'), t('Translate.listLanguage.khome')];
	const listLanguage = [
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
	const autoDetect = () => {
		setAutoDetectLang(true);
	};
	const changeFromLanguage = (language) => {
		if (exchangeLanguage) {
			setFromLanguage(language);
			setToLanguage({
				text: t('Translate.listLanguage.viet'),
				code: 'vi'
			});
		} else {
			setFromLanguage({
				text: t('Translate.listLanguage.viet'),
				code: 'vi'
			});
			setToLanguage(language);
		}
	};
	const buttonFromLanguage = () => {
		return (
			<div>
				<Dropdown size="sm">
					<Dropdown.Toggle size="sm" variant="primary" id="dropdown-basic">{exchangeLanguage?fromLanguage.text:toLanguage.text}</Dropdown.Toggle>
					<Dropdown.Menu>
						{
							listLanguage.map((item, key) => 
								<Dropdown.Item key={key} size="sm" href="" onClick={() => changeFromLanguage(item)}>{item.text}</Dropdown.Item>
							)
						}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	};
	const buttonToLanguage = () => {
		return (
			<Button size="sm" variant="outline-primary">{!exchangeLanguage?fromLanguage.text:toLanguage.text}</Button>
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
							<Button size="sm" variant="outline-primary" style={{ marginRight: '5px' }} onClick={() => {autoDetect();}}><HiLightBulb style={{ lineHeight: '5px' }} />{t('Translate.phathienngonngu')}</Button>
							{exchangeLanguage ? buttonFromLanguage() : buttonToLanguage()}
						</ButtonToolbar>
									
					</Col>
				</Row>
			</Col>
			<Col md={1} style={{ textAlign: 'center' }}>
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