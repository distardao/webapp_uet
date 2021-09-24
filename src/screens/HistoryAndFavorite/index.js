import React, { useState } from 'react';
import styles from './historyAndFavorite.module.css';
import { 
	Tab, 
	Tabs, 
	Menu, 
	MenuItem, 
	Typography, 
	Card, 
	CardContent, 
	CardActionArea,
	CardActions,
	Divider,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
// import { IS_AUTH } from '../../constants/envVar';
import FeedBack from './components/ModalFeedBack';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { MdArrowForward, MdStarBorder, MdContentCopy, MdVolumeUp } from 'react-icons/md';


const history = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const favorite = [17, 18 ];

export default function HistoryAndFavorite() {
	// const fakeAuth = {
	// 	isAuthenticated: sessionStorage.getItem(IS_AUTH),
	// };
	// const [modelShown, setModelShown] = useState(!fakeAuth.isAuthenticated);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const [modelShown, setModelShown] = useState(false);
	const [option, setOption] = useState('history');
	// const [shownId, setShownId] = useState(1);
	const { t } = useTranslation();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};


	// eslint-disable-next-line no-unused-vars
	const NewItem = () => {
		return (
			<Card variant="outlined" style={{borderRadius: 0}}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div"> 
            				Text 1
						</Typography>
						<Typography gutterBottom variant="h5" component="div" color="text.secondary">
            				Text 2
						</Typography>
						<Typography variant="body2" color="text.secondary">Trung <ArrowForwardIcon sx={{fontSize: 20}}/> Viet</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions sx={{p: 0}} disableSpacing style={{justifyContent: 'end'}}>
					<IconButton aria-label="directions" id="basic-button">
						<StarBorderIcon />
					</IconButton>
					<IconButton aria-label="directions" id="basic-button">
						<DeleteIcon />
					</IconButton>
				</CardActions>
			</Card>
		);
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
						<Tab label={t('History.tuvung')} value={'favorite'} style={{fontWeight: 'bold'}}/>
					</Tabs>
				</div>
				<div className={styles.innerBody}>
					<div className={styles.innerBodyLeft}>
						<div className={styles.innerSearchBox}>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder="Tìm kiếm"
								inputProps={{ 'aria-label': 'Tìm kiếm' }}
							/>
							<IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
								<SearchIcon />
							</IconButton>
							<Divider sx={{ height: '100%' }} orientation="vertical" />
							<IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" id="basic-button" onClick={handleClick}>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
								<MenuItem onClick={handleClose}>Logout</MenuItem>
							</Menu>
						</div>
						<div className="form-select" style={{flex: 1, overflow: 'auto'}}>
							{option === 'history' ? 
								history.map((number) => <NewItem key={number.toString()} id={number}/>) : 
								favorite.map((number) => <NewItem key={number.toString()} id={number}/>)}
						</div>
					</div>
					<div className={styles.innerBodyRight}>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
							<div style={{fontWeight: 500, fontSize: 22, textTransform: 'uppercase' }}>
								Trung <MdArrowForward style={{marginLeft: 10, marginRight: 10}}/> Viet
							</div>
							<div style={{display: 'flex'}}>
								<button className={styles.buttonDropDown}>
									<MdStarBorder size={30}/>
								</button>
								<button className={styles.buttonDropDown}>
									<MdArrowForward size={30} />
								</button>
							</div>
						</div>
						<div className={styles.innerBodyRightBox} style={{marginBottom: 40}}>
							Text 1
							<div style={{marginTop: 30, display: 'flex', justifyContent: 'flex-end'}}>
								<button className={styles.buttonDropDown}>
									<MdContentCopy size={25}/>
								</button>
								<button className={styles.buttonDropDown}>
									<MdVolumeUp size={25} />
								</button>
							</div>
						</div>
						<div className={styles.innerBodyRightBox}>
							Text 2
							<div style={{marginTop: 30, display: 'flex', justifyContent: 'flex-end'}}>
								<button className={styles.buttonDropDown}>
									<MdContentCopy size={25}/>
								</button>
								<button className={styles.buttonDropDown}>
									<MdVolumeUp size={25} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FeedBack
				show={modelShown}
				onHide={() => setModelShown(false)} 
			/>
		</div>
	);
}