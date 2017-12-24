import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { checkAuth } from '../reducers/actions/login_actions';

class PassportAuth extends React.Component {
	componentWillMount() {
		this.props.checkAuth();
	}
	render(){
		return(
			<Redirect to={'/'} />
		);
	}
}
export default connect(null, {checkAuth})(PassportAuth);