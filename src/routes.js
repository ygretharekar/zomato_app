import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './containers/App';
import HomeComp from './containers/homeComp';

export default (
	<Switch>
		<Route path='/' component={HomeComp}/>
	</Switch>
);