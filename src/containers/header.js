import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Navbar from '../components/navbar';
import { logoutUser }  from '../reducers/actions/logout_actions';

class Header extends React.Component {

	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(){
		console.log('Logging out');
		this.props.logoutUser();
	}

	render(){
		return(
			<Navbar loggedIn={this.props.loggedIn} name={this.props.name} logout={this.handleLogout} />
		);
	}
}

const mapStateToProps = state => (
	{
		loggedIn: state.auth.isAuthenticated,
		name: state.auth.user
	}
);

Header.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logoutUser })(Header);