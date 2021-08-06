import React from 'react';

export default function HistoryAndFavorite() {
	return (
		<div style={{
			display: 'flex', 
			flex: 1, 
			backgroundColor: 'white', 
			height:'94vh', 
		}}>
			<div className="border border-dark" style={{
				flex: 1, 
				backgroundColor: 'white', 
				marginLeft: 70, 
				marginRight: 70, 
				marginTop: 50, 
				marginBottom: 80, 			
				borderRadius: 10,
			}}/>
		</div>
	);
}