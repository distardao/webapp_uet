/* eslint-disable react/prop-types */
import React, { useState, forwardRef } from 'react';
import styles from './historyAndFavorite.module.css';
import { ButtonToolbar, Dropdown } from 'react-bootstrap';
// import { IS_AUTH } from '../../constants/envVar';
import FeedBack from './components/ModalFeedBack';
import { MdMoreVert, MdArrowForward, MdStarBorder, MdContentCopy, MdVolumeUp } from 'react-icons/md';


const history = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const favorite = [17, 18 ];

export default function HistoryAndFavorite() {
	// const fakeAuth = {
	// 	isAuthenticated: sessionStorage.getItem(IS_AUTH),
	// };
	// const [modelShown, setModelShown] = useState(!fakeAuth.isAuthenticated);
	const [modelShown, setModelShown] = useState(false);
	const [option, setOption] = useState('history');
	const [shownId, setShownId] = useState(1);

	// eslint-disable-next-line react/display-name
	const CustomToggle = forwardRef(({ children, onClick }, ref) => (
		<button
		  className={styles.buttonDropDown}
		  href=""
		  ref={ref}
		  onClick={(e) => {
				e.preventDefault();
				onClick(e);
		  }}
		>
		  {children}
		  {/* &#x25bc; This is arrow dropdown */}
		</button>
	  ));
	  
	const Item = ({id}) => {
		return (
			<div style={{height: 166, width: '100%', color: 'white', display: 'flex'}}>
				<div className={id === shownId ? styles.buttonListChosenActive : styles.buttonListChosen}>
					{/* {number} */}
					<div style={{flex: 0.9, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 25}}>
						<div>
							<div>text 1</div>
							<div>text 2</div>
						</div>
						<div style={{color: '#A3A3A3', fontSize: 22}}>Trung <MdArrowForward style={{marginLeft: 10, marginRight: 10}}/> Viet</div>
					</div>
					<div style={{flex: 0.1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
						{option === 'history' ? 
							<Dropdown >
								<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
									<MdMoreVert size={25} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item >Thêm vào từ vựng</Dropdown.Item>
									<Dropdown.Item >Xóa</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown> : 
							<button className={styles.buttonDropDown}>
								<MdStarBorder size={25}/>
							</button>
						}
						<button className={styles.buttonDropDown} onClick={() => setShownId(id)}>
							<MdArrowForward size={25}/>
						</button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div style={{ display: 'flex', flex: 1, backgroundColor: 'white', height:'94vh' }}>
			<div className={styles.innerBox}>
				<div className={styles.tabBox}>
					<ButtonToolbar>
						<button className={option === 'history'? styles.tabActive : styles.tab} onClick={() => setOption('history')}>LỊCH SỬ</button>
						<button className={option === 'favorite'? styles.tabActive : styles.tab} onClick={() => setOption('favorite')}>TỪ VỰNG</button>
					</ButtonToolbar>
				</div>
				<div className={styles.innerBody}>
					<div className={styles.innerBodyLeft}>
						<div className={styles.innerSearchBox}>
							<input type='text' className={styles.inputSearch} placeholder="Tìm kiếm"/>
							{/* <MdSearch size={30} /> */}
							<Dropdown >
								<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
									<MdMoreVert size={30} />
								</Dropdown.Toggle>	
								<Dropdown.Menu>
									<Dropdown.Item >Xóa tất cả</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
						<div className="form-select" style={{flex: 1, overflow: 'auto'}}>
							{option === 'history' ? 
								history.map((number) => <Item key={number.toString()} id={number}/>) : 
								favorite.map((number) => <Item key={number.toString()} id={number}/>)}
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