import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import { useGoogleLogout } from 'react-google-login';
import * as axiosHelper from '../../helpers/axiosHelper';
import PersonIcon from '@mui/icons-material/Person';

function NavBarProfile(props) {
	const { t } = useTranslation();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const onLogoutSuccess = async () => {
		try {
			await axiosHelper.SignOut();
			localStorage.clear();
			props.setIsSigIn(false);
		}catch (e){
			alert(e);
		}
		handleClose();
	};

	// eslint-disable-next-line no-unused-vars
	const onFailure = (res) => {
		handleClose();
	};

	const { signOut } = useGoogleLogout({
		// eslint-disable-next-line no-undef
		clientId: process.env.REACT_APP_CLIENT_ID,
		onLogoutSuccess,
		onFailure,
		isSignedIn: false,
		accessType: 'offline',
	});


	return (
		<>
			<Tooltip title={t('caiDatTaiKhoan')}>
				<IconButton onClick={handleClick} size="small" sx={{ mr: 2 }}>
					<Avatar sx={{ width: 30, height: 30 }}><PersonIcon /></Avatar>
				</IconButton>
			</Tooltip>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={() => {
					props.setModalShow(true);
					handleClose();
				}}>
					{t('chinhSuaThongTin')}
				</MenuItem>
				<MenuItem onClick={signOut}>{t('dangXuat')}</MenuItem>
			</Menu>
		</>
	);
}

NavBarProfile.propTypes = {
	setIsSigIn: PropTypes.func,
	setModalShow: PropTypes.func,
};

export default NavBarProfile;