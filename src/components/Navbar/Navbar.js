/* eslint-disable no-constant-condition */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useRef } from 'react';
import {
	Container,
	Row,
	Image,
	Dropdown,
} from 'react-bootstrap';
// import * as FaIcons from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';
import { AiOutlineUser } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import Logo from '../../assets/images/lg.png';
import { sideBarHide, sideBarShow } from '../../redux/actions/navbarAction';
import styles from './navbarStyle.module.css';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import OutsideClick from '../../helpers/outsideClick';
import { useGoogleLogout } from 'react-google-login';
import Modal from '../Modal';
import { IS_AUTH } from '../../constants/envVar';

const clientId =
	'1006597644137-plgvccnt0d3keaojro5q3j69vkjudfvs.apps.googleusercontent.com';

function Navbar() {
	const boxRef = useRef(null);
	const boxOutsideClick = OutsideClick(boxRef);
	const [modalShow, setModalShow] = React.useState(false);
	const path = window.location.pathname;

	const fakeAuth = {
		isAuthenticated: sessionStorage.getItem(IS_AUTH),
	};

	// const [sidebar, setSidebar] = useState(false);
	const sidebar = useSelector(state => state.navbarReducer.shownavbar);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	useEffect(() => {
		if (boxOutsideClick) {
			dispatch(sideBarHide(false));
		}
	}, [boxOutsideClick, dispatch]);
	const showSidebar = () => {
		dispatch(sideBarShow(true));
	};

	const hideSidebar = () => {
		dispatch(sideBarHide(false));
	};

	const onFailure = (res) => {
		console.log('Login failed: res:', res);
		alert(
			'Failed to login.'
		);
	};

	const onLogoutSuccess = () => {
		alert('Logged out Successfully ✌');
		sessionStorage.clear();
		window.location.replace('/login');
	};

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure,
	});

	return (
		// <div ref={boxRef} style={{display: 'flex', height: '6vh'}}>
		// 	<div style={{display: 'flex', flex: 1, backgroundColor:' #1d5193', color: 'white', flexDirection: 'row'}}>
		// 		<div style={{position: 'relative', width:50 }}>
		// 			<button onClick={() => showSidebar()} className={styles.buttonSidebar}>
		// 				<CgMenu />
		// 			</button>
		// 		</div>
		// 		<div style={{flex: 1, fontSize: 28, alignSelf:'center',}}>
		// 			{t('Translate.title')}
		// 		</div>
		// 	</div>
		// 	<nav className={sidebar ? [styles.nav_menu,styles.active].join(' ') : styles.nav_menu}>
		<div ref={boxRef}>
			<Container fluid>
				<Row className={styles.headerTop}>
					<div className={styles.buttonSidebars}><button onClick={() => showSidebar()} className={styles.buttonSidebar}><CgMenu /></button></div>
					<div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
						<div className={styles.title}>
							{/* <Image style={{ width: '40px' }} src={Logo} alt="" roundedCircle /> */}
							{t('Translate.title')}
						</div>
						{fakeAuth.isAuthenticated ? (
							<Dropdown style={{ alignSelf: 'center', paddingRight: 10 }}>
								<Dropdown.Toggle style={{ display: 'flex', alignItems: 'center' }}>
									<AiOutlineUser size={25} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item onClick={() => setModalShow(true)}>Chỉnh sửa thông tin</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item onClick={signOut}>Đăng xuất</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						) : (
							path == ('/login' || '/forgot-password' || '/register') ? (
								null
							) : (
								<a href="/login" style={{ color: '#fff', alignSelf: 'center', marginRight: 20 }}>
									Đăng nhập
								</a>
							)
						)}
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
		</div >
	);
}

export default Navbar;
