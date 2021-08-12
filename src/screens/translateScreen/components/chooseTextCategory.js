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
	};
	const selectOptionDocument = () => {
		setVariantText('outline-primary');
		setVariantDoc('primary');
		setTextCategory(false);
	};
	return (
		<>
			<Button onClick={() => selectOptionText()} style={{ display: 'flex', fontSize: 20, fontWeight: 500, marginRight: '20px'}} variant={variantText}>
				<div style={{paddingRight: 5, alignContent: 'center'}}>
					<VscWordWrap size={28}/>	
				</div> 
				{t('Translate.vanban')}
			</Button>
			<Button onClick={() => selectOptionDocument()} style={{ display: 'flex', fontSize: 20, fontWeight: 500 }} variant={variantDoc}>
				<div style={{paddingRight: 5, alignContent: 'center'}}>
					<BsFileEarmarkText size={28}/> 
				</div> 
				{t('Translate.tailieu')}
			</Button>
		</>
	);
}