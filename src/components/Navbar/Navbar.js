import React, { useEffect, useRef, useState } from 'react';
import {
	Container,
	Row,
	Image,
	Dropdown,
} from 'react-bootstrap';
import { IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AiOutlineUser } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import Logo from '../../assets/images/lg.png';
import { sideBarHide, sideBarShow } from '../../redux/actions/navbarAction';
import styles from './navbarStyle.module.css';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import OutsideClick from '../../helpers/outsideClick';
import { useGoogleLogout, useGoogleLogin } from 'react-google-login';
import Button from '@mui/material/Button';
import Modal from '../Modal';
import * as axiosHelper from '../../helpers/axiosHelper';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/envVar';

// const clientId =
// 	'1006597644137-plgvccnt0d3keaojro5q3j69vkjudfvs.apps.googleusercontent.com';

const clientId = '678502825589-nqgohudq0erdrtpghipkg00vj27v6q1r.apps.googleusercontent.com';

function Navbar() {
	const boxRef = useRef(null);
	const boxOutsideClick = OutsideClick(boxRef);
	const [modalShow, setModalShow] = useState(false);
	const [isSignIn, setIsSigIn] = useState(false);
	// const path = window.location.pathname;

	// const [sidebar, setSidebar] = useState(false);
	const sidebar = useSelector(state => state.navbarReducer.shownavbar);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	
	useEffect(() => {
		if (boxOutsideClick) {
			dispatch(sideBarHide(false));
		}
	}, [boxOutsideClick, dispatch]);

	useEffect(() => {
		if(localStorage.getItem(ACCESS_TOKEN)){
			setIsSigIn(true);
		}
	}, []);

	const showSidebar = () => {
		dispatch(sideBarShow(true));
	};

	const hideSidebar = () => {
		dispatch(sideBarHide(false));
	};

	const onSuccess = async (res) => {
		try {
			const siginInResult = await axiosHelper.SignIn({
				access_token: res.accessToken,
				platform: 'web'
			});
			setIsSigIn(true);
			localStorage.setItem(ACCESS_TOKEN, siginInResult.data.accessToken);
			localStorage.setItem(REFRESH_TOKEN, siginInResult.data.refreshToken);
		}catch (e) {
			alert(e);
		}
		// refreshTokenSetup(res);
	};

	// eslint-disable-next-line no-unused-vars
	const onFailure = (res) => {};

	const onLogoutSuccess = async () => {
		try {
			await axiosHelper.SignOut();
			localStorage.clear();
			setIsSigIn(false);
		}catch (e){
			alert(e);
		}
		// window.location.replace('/login');
	};

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: false,
		accessType: 'offline',
	});

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure,
		isSignedIn: false,
		accessType: 'offline',
	});

	return (
		// 	<nav className={sidebar ? [styles.nav_menu,styles.active].join(' ') : styles.nav_menu}>
		<div ref={boxRef}>
			<Container fluid>
				<Row className={styles.headerTop}>
					<IconButton onClick={() => showSidebar()}><MenuIcon size="large" sx={{color: 'white'}}/></IconButton>
					<div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
						<Typography sx={{}} variant="h5" className={styles.title}>
							{t('Translate.title')}
						</Typography>
						{isSignIn ? (
							<Dropdown style={{ alignSelf: 'center', paddingRight: 10 }}>
								<Dropdown.Toggle style={{ display: 'flex', alignItems: 'center' }}>
									<AiOutlineUser size={25} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item onClick={() => setModalShow(true)}>{t('chinhSuaThongTin')}</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={() => signOut()}>{t('dangXuat')}</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						) : <Button variant="text" sx={{color: 'white'}} onClick={() => signIn()}>{t('dangNhapVoiGoogle')}</Button>}
						{/* path == ('/login' || '/forgot-password' || '/register') ? (
								null
							) : (
								<a href="/login" style={{ color: '#fff', alignSelf: 'center', marginRight: 20 }}>
							 		Đăng nhập
							 	</a>
							 ) */}
						<Modal
							show={modalShow}
							onHide={() => setModalShow(false)} />
					</div>
				</Row>
			</Container>
			<nav className={sidebar ? [styles.nav_menu, styles.active].join(' ') : styles.nav_menu}>
				<ul className={styles.nav_menu_items}>
					<li className={styles.logo}>
						<div className={styles.logosub}>
							<Image style={{ width: '80px', padding: '10px 0' }} src={Logo} alt="" roundedCircle />
						</div>
					</li>
					{SidebarData.map((item, index) => {
						return (
							<li key={index} className={styles.nav_text}>
								<Link to={item.path} onClick={() => hideSidebar()}>
									<span>{item.title}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

export default Navbar;
