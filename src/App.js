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
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import RulesAndPolicy from './screens/RulesAndPolicy';

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path='/' exact component={TranslateScreen} />
				<Route path='/about' exact component={About} />
				<Route path='/login' exact component={Login} />
				<Route path='/register' exact component={Register} />
				<Route path='/forgot-password' exact component={ForgotPassword} />
				<Route path='/rules-and-policy' exact component={RulesAndPolicy} />
			</Switch>
		</Router>
	);
}

export default App;
