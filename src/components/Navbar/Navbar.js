import React, {useEffect, useRef} from 'react';
import { 
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
import { useSelector, useDispatch  } from 'react-redux';
import OutsideClick from '../../helpers/outsideClick';
function Navbar() {
	const boxRef = useRef(null);
	const boxOutsideClick = OutsideClick(boxRef);
	// console.log('boxOutsideClick',boxOutsideClick);
	
	// const [sidebar, setSidebar] = useState(false);
	const sidebar = useSelector(state => state.navbarReducer.shownavbar);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	useEffect(() => {
		if (boxOutsideClick){
			dispatch(sideBarHide(false));
		}
	},[boxOutsideClick, dispatch]);
	const showSidebar = () => {
		dispatch(sideBarShow(true));
	};
	const hideSidebar = () => {
		dispatch(sideBarHide(false));
	};
	return (
		<div ref={boxRef} style={{display: 'flex', height: '6vh'}}>
			<div style={{display: 'flex', flex: 1, backgroundColor:' #1d5193', color: 'white', flexDirection: 'row'}}>
				<div style={{position: 'relative', width:50 }}>
					<button onClick={() => showSidebar()} className={styles.buttonSidebar}>
						<CgMenu />
					</button>
				</div>
				<div style={{flex: 1, fontSize: 28, alignSelf:'center',}}>
					{t('Translate.title')}
				</div>
			</div>
			<nav className={sidebar ? [styles.nav_menu,styles.active].join(' ') : styles.nav_menu}>
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
