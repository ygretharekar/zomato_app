import React from 'react';

import Header from './header';
import SearchComp from '../components/searchComp';

class HomeComp extends React.Component {

	render(){
		return(
			<div>
				<Header />
				<SearchComp />
			</div>
		);
	}
}

export default HomeComp;