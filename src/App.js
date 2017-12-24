import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomeComp from './containers/homeComp';
import PassportAuth from './containers/passportAuth';
import Login from './containers/loginPage';

class App extends React.Component {
	render(){
		return(
			<Router>
				<div>
					<Switch>
						<Route exact path='/' component={HomeComp}/>
						<Route exact path='/login' component={Login}/>
						<Route exact path='/account' component={PassportAuth}/>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;