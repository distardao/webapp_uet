/* eslint-disable quotes */
import React from 'react';
import { BiHourglass } from 'react-icons/bi';

export default function EmptyHistory(props) {

	// eslint-disable-next-line react/prop-types
	const { notify } = props;
	return (
		<div style={{ textAlign: 'center', flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', height: 250 }}>
			<div>
				<BiHourglass color="#1d5193" size={40} />
				<h2 style={{ color: '#7A7A7A', paddingTop: 10 }}>{notify}</h2>
			</div>
		</div>
	);
}
