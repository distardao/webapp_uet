/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './historyAndFavorite.module.css';
import { ButtonToolbar } from 'react-bootstrap';
import { MdMoreVert, MdArrowForward, MdSearch, MdStarBorder, MdContentCopy, MdVolumeUp } from 'react-icons/md';


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export default function HistoryAndFavorite() {
	// eslint-disable-next-line react/prop-types
	const Item = () => {
		return (
			<div style={{height: 166, width: '100%', color: 'white', display: 'flex'}}>
				<div className={styles.buttonListChosen}>
					{/* {number} */}
					<div style={{flex: 0.9, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 25}}>
						<div>
							<div>text 1</div>
							<div>text 2</div>
						</div>
						<div style={{color: '#A3A3A3', fontSize: 22}}>Trung <MdArrowForward style={{marginLeft: 10, marginRight: 10}}/> Viet</div>
					</div>
					<div style={{flex: 0.1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
						<MdMoreVert size={25} onClick={() => {}}/>
						<MdArrowForward size={25} onClick={() => {}}/>
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
						<button className={styles.tab}>LỊCH SỬ</button>
						<button className={styles.tab}>TỪ VỰNG</button>
					</ButtonToolbar>
				</div>
				<div className={styles.innerBody}>
					<div className={styles.innerBodyLeft}>
						<div className={styles.innerSearchBox}>
							{/* <input type='text' className={styles.inputSearch} placeholder="Enter email" /> */}
							<MdSearch size={30} />
							<div className="dropdown">
								<button className={styles.buttonDropDown} type="button" id="dropdownMenuButton" data-toggle="dropdown" >
									<MdMoreVert size={30} />
								</button>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<div className="dropdown-item" href="#">Action</div>
									<div className="dropdown-item" href="#">Another action</div>
									<div className="dropdown-item" href="#">Something else here</div>
								</div>
							</div>
						</div>
						<div className="form-select" size="5" style={{flex: 1, overflow: 'auto'}}>
							{numbers.map((number) => <Item key={number.toString()}/>)}
						</div>
					</div>
					<div className={styles.innerBodyRight}>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
							<div style={{fontWeight: 500, fontSize: 22, textTransform: 'uppercase' }}>
								Trung <MdArrowForward style={{marginLeft: 10, marginRight: 10}}/> Viet
							</div>
							<div>
								<MdStarBorder size={30} style={{marginRight: 10}}/>
								<MdArrowForward size={30} />
							</div>
						</div>
						<div className={styles.innerBodyRightBox} style={{marginBottom: 40}}>
							Text 1
							<div style={{marginTop: 30, display: 'flex', justifyContent: 'flex-end'}}>
								<MdContentCopy size={25} style={{marginRight: 5}}/>
								<MdVolumeUp size={25} />
							</div>
						</div>
						<div className={styles.innerBodyRightBox}>
							Text 2
							<div style={{marginTop: 30, display: 'flex', justifyContent: 'flex-end'}}>
								<MdContentCopy size={25} style={{marginRight: 5}}/>
								<MdVolumeUp size={25} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}