import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router';

import ErrorBoundry from './containers/ErrorBoundry';
import routes from './routes';
import configureStore from './store/store';
import App from './containers/App';
import HomeComp from './containers/homeComp';

export const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<Router>
				<Switch>
					<Route path='/' component={HomeComp}/>
				</Switch>
			</Router>
		</ErrorBoundry>
	</Provider>	,
	document.getElementById('root')
);