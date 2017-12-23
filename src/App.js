import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomeComp from './containers/homeComp';
import Header from './containers/header';
import Login from './containers/loginPage';

class App extends React.Component {
	render(){
		return(
			<Router>
				<div>
					<Header />
					<Switch>
						<Route exact path='/' component={HomeComp}/>
						<Route exact path='/login' component={Login}/>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;