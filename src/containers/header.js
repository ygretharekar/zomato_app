import React from 'react';

import ErrorBoundry from './ErrorBoundry';
import Navbar from '../components/navbar';

class Header extends React.Component {
	render(){
		return(
			<ErrorBoundry>
				<Navbar/>
			</ErrorBoundry>
		);
	}
}

export default Header;