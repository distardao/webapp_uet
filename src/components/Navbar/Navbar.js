import React, { useEffect, useRef } from 'react';
import {
	Container,
	Row,
	Image,
} from 'react-bootstrap';
// import * as FaIcons from 'react-icons/fa';
import { CgMenu } from 'react-icons/cg';

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import Logo from '../../assets/images/lg.png';
import { sideBarHide, sideBarShow } from '../../redux/actions/navbarAction';
import styles from './navbarStyle.module.css';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import OutsideClick from '../../helpers/outsideClick';
import { useGoogleLogout } from 'react-google-login';

const clientId =
	'1006597644137-plgvccnt0d3keaojro5q3j69vkjudfvs.apps.googleusercontent.com';

function Navbar() {
	const boxRef = useRef(null);
	const boxOutsideClick = OutsideClick(boxRef);
	// console.log('boxOutsideClick',boxOutsideClick);

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
			'Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz'
		);
	};

	const onLogoutSuccess = () => {
		console.log('Logged out Success');
		alert('Logged out Successfully ✌');
		window.location.replace('/login');
	};

	const { signOut } = useGoogleLogout({
		clientId,
		onLogoutSuccess,
		onFailure,
	});
	return (
		<div ref={boxRef}>
			<Container fluid>
				<Row className={styles.headerTop}>
					<div className={styles.buttonSidebars}><button onClick={() => showSidebar()} className={styles.buttonSidebar}><CgMenu /></button></div>
					<div className={styles.title}>
						{/* <Image style={{ width: '40px' }} src={Logo} alt="" roundedCircle /> */}
						{t('Translate.title')}
					</div>
					<button onClick={signOut} style={{ borderRadius: 10 }} className="btn btn-warning btn-block">
						<i className="fab fa-google fa-fw" /> Đăng xuất
					</button>
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
