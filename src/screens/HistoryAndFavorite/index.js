import React, { useState, useEffect } from 'react';
import styles from './historyAndFavorite.module.css';
import { 
	Tab, 
	Tabs, 
	Typography, 
	LinearProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
// import { IS_AUTH } from '../../constants/envVar';
import FeedBack from './components/ModalFeedBack';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ResultComponent from './components/ResultComponent';
import TranslationItem from './components/TranslationItem';
import { STATE } from '../../redux/reducers/historyReducer';
import { getHistoryAsync } from '../../redux/actions/historyAction';
import { isEmpty } from 'lodash';

const favorite = [17, 18 ];

function HistoryAndFavorite(props) {
	const { historyState } = props;
	// const fakeAuth = {
	// 	isAuthenticated: sessionStorage.getItem(IS_AUTH),
	// };
	// const [modelShown, setModelShown] = useState(!fakeAuth.isAuthenticated);

	const [modelShown, setModelShown] = useState(false);
	const [option, setOption] = useState('history');
	// const [shownId, setShownId] = useState(1);
	const { t } = useTranslation();

	/**
	 * @description useEffect cho việc check kết quả và báo noti cho 
	 * người dùng
	 */
		 useEffect(() => {
		switch (historyState.currentState) {
		case STATE.SUCCESS:
			break;
		case STATE.FAILURE:
			alert(`${historyState.err}`);
			break;
		default:
			break;
		}
	}, [historyState.currentState]);

	useEffect(() => {
		props.getHistoryAsync({
			status: 'translated',
			translationType: 'public_plain_text_translation',
		});
	}, []);

	const TextListEmpty = () => {
		return  <Typography sx={{p: 2}} align="center" variant="subtitle1">{t('danhSachTrong')}</Typography>;
	};

	const List = () => {
		if(option === 'history'){
			return isEmpty(historyState.listHistory) ?  <TextListEmpty /> : 
				historyState.listHistory.map((item) => <TranslationItem key={item.taskId} item={item} id={item.taskId}/>);
		} else {
			return isEmpty(favorite) ? <TextListEmpty /> : favorite.map((item) => <TranslationItem key={item.toString()} id={item}/>);
		}
	};

	return (
		<div style={{ display: 'flex', flex: 1, backgroundColor: 'white', height:'94vh' }}>
			<div className={styles.innerBox}>
				<div className={styles.tabBox}>
					<Tabs Text
						value={option}
						onChange={(event, newValue) => setOption(newValue)}
						variant="scrollable"
						scrollButtons="auto"
					>
						<Tab label={t('History.lichsu')} value={'history'} style={{fontWeight: 'bold'}}/>
						<Tab label={t('History.tuvung')} disabled value={'favorite'} style={{fontWeight: 'bold'}}/>
					</Tabs>
				</div>
				<div className={styles.innerBody}>
					<div className={styles.innerBodyLeft}>
						{/* <div className={styles.innerSearchBox}>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder="Tìm kiếm"
								inputProps={{ 'aria-label': 'Tìm kiếm' }}
							/>
							<IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
								<SearchIcon />
							</IconButton>
						</div> */}
						<div className="form-select" style={{flex: 1, overflow: 'auto'}}>
						    {historyState.currentState === STATE.LOADING ? <LinearProgress /> : null}
							<List />
						</div>
					</div>
					<ResultComponent />
				</div>
			</div>
			<FeedBack
				show={modelShown}
				onHide={() => setModelShown(false)} 
			/>
		</div>
	);
}

HistoryAndFavorite.propTypes = {
	historyState: PropTypes.object,
	getHistoryAsync: PropTypes.func,
};

const mapStateToProps = (state) => ({
	historyState: state.historyReducer,
});

const mapDispatchToProps = { 
	getHistoryAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryAndFavorite);