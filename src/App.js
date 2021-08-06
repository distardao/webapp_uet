/* eslint-disable quotes */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TranslateScreen from './screens/translateScreen/translateScreen';
import About from './screens/about';
import HistoryAndFavorite from "./screens/HistoryAndFavorite";

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path='/' exact component={TranslateScreen} />
				<Route path='/about' exact component={About} />
				<Route path='/historyAndFavorite' exact component={HistoryAndFavorite} />
			</Switch>
		</Router>
	);
}

export default App;
