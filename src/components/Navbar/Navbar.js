import React, { useState } from 'react';
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
import styles from './navbarStyle.module.css';
import { useTranslation } from 'react-i18next';
function Navbar() {
	const [sidebar, setSidebar] = useState(false);
	const { t } = useTranslation();
	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			<Container fluid>
				<Row className={styles.headerTop}>
					<div className={styles.buttonSidebars}><button onClick={() => showSidebar()} className={styles.buttonSidebar}><CgMenu /></button></div>
					<div className={styles.title}>
						{/* <Image style={{ width: '40px' }} src={Logo} alt="" roundedCircle /> */}
						{t('Translate.title')}
					</div>
				</Row>
			</Container>
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
								<Link to={item.path} onClick={showSidebar}>
									<span>{item.title}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
