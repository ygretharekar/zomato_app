import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import { loginUser } from '../reducers/actions/login_actions';

class LoginComp extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			error: false
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
		else this.setState(
			{
				error: true
			}
		);
	}

	render(){
		return(
			<div>
				{
					(this.state.error || this.props.errorMessage ) &&
					<div className="alert alert-danger">
						Login error please retry 
					</div>
				}

				<form>
					<div className='form-group'>
						<input 
							type='text' 
							name='email'
							placeholder=''
							className='form-control form-input'
							value={this.state.email}
							onChange={this.handleInput}
							required 
						/>
						<label className='form-label'>e-mail</label>
					</div>
					<div className='form-group'>
						<input 
							type='password'
							name='password' 
							placeholder=''
							className='form-control form-input'
							value={this.state.password}
							onChange={this.handleInput} 
							required 
						/>
						<label className='pwd-label'>password</label>
					</div>
				</form>
				<button 
					className='btn btn-block btn-success'
					onClick={this.submitLogin}
				>
					LogIn
				</button>
				<a 
					href='/auth/twitter'
					className='btn btn-block btn-primary'
					style={{background:'#4AB3F4', color: '#fff'}}
				>
						Login with twitter
				</a>
				<a 
					href='/auth/github'
					className='btn btn-block btn-secondary'
					style={{background:'#24292e', color: '#fff'}}
				>
						Login with github
				</a>
				{
					this.props.loggedIn &&
					<Redirect to={'/'} />
				}
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		errorMessage: state.auth.loginError,
		loggedIn: state.auth.isAuthenticated
	}
);

LoginComp.propTypes = {
	errorMessage: PropTypes.string.isRequired,
	loginUser: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { loginUser })(LoginComp);