import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../reducers/actions/login_actions';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		};

		this.handleInput = this.handleInput.bind(this);
		this.submitLogin = this.submitLogin.bind(this);

	}

	handleInput(e){
		this.setState(
			{
				[e.target.name]: e.target.value
			}
		);
	}

	submitLogin(){
		const { email, password } = this.state;

		if(email !== '' && password !== ''){
			const creds = { email: email.trim(), password: password.trim() };

			this.props.loginUser(creds);
		}

	}

	render(){
		return(
			<div className='container login-page'>
				<div>
					<h1>login</h1>
					<form>
						<div className='form-group'>
							<input 
								type='email' 
								name='email'
								placeholder=''
								className='form-control form-input'
								required 
							/>
							<label className='form-label'>username</label>
						</div>
						<div className='form-group'>
							<input 
								type='password'
								name='password' 
								placeholder=''
								className='form-control form-input' 
								required 
							/>
							<label className='pwd-label'>password</label>
						</div>
					</form>
					<button className="btn btn-block btn-outline-info">Login</button>
					<a href='/auth/twitter' className='btn btn-block btn-outline-primary'>Login with twiiter</a>
					<a href='/auth/github' className='btn btn-block btn-outline-secondary'>Login with github</a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		errorMessage: state.auth.loginError
	}
);

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	errorMessage: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { loginUser })(Login);
