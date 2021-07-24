/* eslint-disable quotes */
import React from 'react';
import './App.css';
// import { useTranslation  } from 'react-i18next'; 
// import { useSelector, useDispatch } from 'react-redux';
// import { sayAnDepTrai } from './redux/actions/testAction';
import TranslateScreen from './screens/translateScreen/translateScreen';
import HistoryTranslate from './screens/HistoryTranslate';

function App() {
	// const testData = useSelector(state => state.testReducer.anDepTrai);
	// const dispatch = useDispatch();
	// const { t } = useTranslation();
	// const testContent = 'Đại tỉ phú An đẹp trai wooooo kakakakakaka';
	// const changePraise = (e) => {
	// 	e.preventDefault();
	// 	dispatch(sayAnDepTrai(testContent));
	// };
	return (
		// <div className="App">
		// 	<h1>{t('App.AnDepTrai')}</h1>
		// 	<h1>{testData}</h1>
		// 	<button onClick={changePraise}>Change</button>
		// </div>
		<>
			<TranslateScreen />
			<HistoryTranslate />
		</>
	);
}

export default App;
