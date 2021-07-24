/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { VscWordWrap } from 'react-icons/vsc';
import { BsFileEarmarkText } from 'react-icons/bs';
import { useTranslation  } from 'react-i18next';

export default function ChooseLanguage(props) {
	const { t } = useTranslation();
	const {
		setTextCategory
	} = props;
	const [variantText, setVariantText] = useState('primary');
	const [variantDoc, setVariantDoc] = useState('outline-primary');
	const selectOptionText = () => {
		setVariantText('primary');
		setVariantDoc('outline-primary');
		setTextCategory(true);
		console.log('text');
	};
	const selectOptionDocument = () => {
		setVariantText('outline-primary');
		setVariantDoc('primary');
		setTextCategory(false);
		console.log('document');
	};
	return (
		<>
			<Button onClick={() => selectOptionText()} style={{ marginRight: '10px'}} size="sm" variant={variantText}><VscWordWrap /> {t('Translate.vanban')}</Button>
			<Button onClick={() => selectOptionDocument()} size="sm" variant={variantDoc}><BsFileEarmarkText /> {t('Translate.tailieu')}</Button>
		</>
	);
}