import React from 'react';
import { BsBook } from 'react-icons/bs';


export default function EmptyVocabulary(props) {
	// eslint-disable-next-line react/prop-types
	const { notify } = props;
	return (
		<div style={{ textAlign: 'center', flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', height: 250 }}>
			<div>
				<BsBook color="#1d5193" size={40} />
				<h2 style={{ color: '#7A7A7A', paddingTop: 10 }}>{notify}</h2>
			</div>
		</div>
	);
}
