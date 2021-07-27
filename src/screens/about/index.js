/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from './aboutStyle.module.css';
function Products() {
	return (
		<Container>
			<Row>
				<div className={styles.aboutStyle}>
					<p className={styles.abouttext}>This Neural Machine Translation system is fully supported by the project "Building a machine translation system to support translation of documents between Vietnamese and Japanese to help managers and businesses in Hanoi approach to Japanese market", No. TC.02-2016-03.</p>
				</div>
			</Row>
			<Row className="justify-content-center">
				<div className={styles.aboutStyle1}>
					<p className={styles.abouttext1}>Contact UET-NLP Team</p>
					<p className={styles.abouttext2}>© 2019 UET Machine Translation Team</p>
				</div>
			</Row>
		</Container>
	);
}

export default Products;
