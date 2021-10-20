import React from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton } from '@mui/material';
import styles from '../historyAndFavorite.module.css';
import { connect } from 'react-redux';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TextareaAutosize from 'react-textarea-autosize';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import { get } from 'lodash';

function ResultComponent(props) {
	const {historyState} = props;
	const { t } = useTranslation();

	const changeCodeToText = (code) => {
		switch (code) {
		case 'en':
			return t('Translate.listLanguage.anh');
		case 'vi':
			return t('Translate.listLanguage.viet');
		case 'zh':
			return t('Translate.listLanguage.trung');
		case 'lo':
			return t('Translate.listLanguage.lao');
		case 'km':
			return t('Translate.listLanguage.khome');
		default:
			return code;
		}
	};

	return (
		<div className={styles.innerBodyRight}>
			<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center'}}>
				<Typography variant='h5'>
					{changeCodeToText(get(historyState.currentHistory, 'source_lang', ''))} 
					<ArrowForwardIcon style={{marginLeft: 10, marginRight: 10}}/> 
					{changeCodeToText(get(historyState.currentHistory, 'target_lang', ''))} 
				</Typography>
				<div style={{display: 'flex'}}>
					<IconButton aria-label="directions" id="basic-button">
						<StarBorderIcon />
					</IconButton>
					<IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
						<SendIcon />
					</IconButton>
				</div>
			</div>
			<div className={styles.innerBodyRightBox} style={{marginBottom: 40}}>
				<TextareaAutosize
					minRows={3}
					disabled
					value={get(historyState.currentHistory, 'source_text', '')}
					className={[styles.from_language]}
				/>
				<div style={{marginTop: 30, display: 'flex', justifyContent: 'flex-end'}}>
					<IconButton 
						type="submit" 
						sx={{ p: '10px' }} 
						aria-label="search" 
						size='large' 
						onClick={() => navigator.clipboard.writeText(historyState.currentHistory.source_text)}
					>
						<ContentCopyIcon />
					</IconButton>
				</div>
			</div>
			<div className={styles.innerBodyRightBox}>
				<TextareaAutosize
					minRows={3}
					disabled
					value={get(historyState.currentHistory, 'target_text', '')}
					className={[styles.from_language]}
				/>
				<div style={{marginTop: 30, display: 'flex', justifyContent: 'flex-end'}}>
					<IconButton 
						type="submit" 
						sx={{ p: '10px' }} 
						aria-label="search" 
						size='large' 
						onClick={() => navigator.clipboard.writeText(historyState.currentHistory.target_text)}
					>
						<ContentCopyIcon fontSize='medium'/>
					</IconButton>
				</div>
			</div>
		</div>
	);
}

ResultComponent.propTypes = {
	historyState: PropTypes.object,
};

const mapStateToProps = (state) => ({
	historyState: state.historyReducer,
});


export default connect(mapStateToProps)(ResultComponent);