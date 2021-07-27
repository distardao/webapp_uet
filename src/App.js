/* eslint-disable quotes */
import React from 'react';
import './App.css';
// import { useTranslation  } from 'react-i18next'; 
// import { useSelector, useDispatch } from 'react-redux';
// import { sayAnDepTrai } from './redux/actions/testAction';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TranslateScreen from './screens/translateScreen/translateScreen';
import About from './screens/about';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route path='/' exact component={TranslateScreen} />
					<Route path='/about' exact component={About} />
				</Switch>
			</Router>
			{/* <TranslateScreen />
			<HistoryTranslate /> */}
		</>
	);
}

export default App;
