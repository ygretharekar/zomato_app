import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { registerUser } from '../reducers/actions/login_actions';
import validateUser from '../serverES6/validate-user';

class SignupComp extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:'',
			confirmPassword:'',
			email:'',
			errors:{}
		};

		this.handleInput = this.handleInput.bind(this);
		this.submitUser = this.submitUser.bind(this);

	}

	handleInput(e){
		this.setState(
			{
				[e.target.name]: e.target.value
			}
		);
	}

	submitUser(){
		this.setState({ errors: {} });

		let { username, email, password, confirmPassword } = this.state;

		let newUser = { username, email, password, confirmPassword };

		const valid = validateUser(newUser);

		if(valid.isValid) {
			this.props.registerUser(newUser);
		}

		else{
			console.log(JSON.stringify(valid.errors));
			this.setState(
				{
					errors: valid.errors
				}
			);
		}

	}

	render(){
		return(
			<div>
				<form>
					<div className='form-group'>
						<input 
							type='text' 
							name='username'
							placeholder=''
							className='form-control form-input'
							value={this.state.username}
							onChange={this.handleInput}
							required 
						/>
						<label className='form-label'>username</label>
						{
							this.state.errors.username &&
							<div className="bd-example bd-example-tooltip-static">
								<div className="tooltip tooltip-bottom" role="tooltip">
									<div className="tooltip-inner">
										Tooltip on the bottom
									</div>
								</div>
							</div>
						}
					</div>
					<div className='form-group'>
						<input 
							type='email' 
							name='email'
							placeholder=''
							className='form-control form-input'
							value={this.state.email}
							onChange={this.handleInput}
							required 
						/>
						<label className='form-label'>email</label>
						{
							this.state.errors.email &&
							<div className="bd-example bd-example-tooltip-static">
								<div className="tooltip tooltip-bottom" role="tooltip">
									<div className="tooltip-inner">
										Tooltip on the bottom
									</div>
								</div>
							</div>
						}
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
						{
							this.state.errors.password &&
							<div className="bd-example bd-example-tooltip-static">
								<div className="tooltip tooltip-bottom" role="tooltip">
									<div className="tooltip-inner">
										Tooltip on the bottom
									</div>
								</div>
							</div>
						}
					</div>
					<div className='form-group'>
						<input 
							type='password'
							name='confirmPassword' 
							placeholder=''
							className='form-control form-input'
							value={this.state.confirmPassword}
							onChange={this.handleInput} 
							required 
						/>
						<label className='pwd-label'>confirm password</label>
						{
							this.state.errors.confirmPassword &&
							<div className="bd-example bd-example-tooltip-static">
								<div className="tooltip tooltip-bottom" role="tooltip">
									<div className="tooltip-inner">
										Tooltip on the bottom
									</div>
								</div>
							</div>
						}
					</div>
				</form>
				<button 
					className='btn btn-block btn-primary'
					onClick={this.submitUser}
				>
					SignUp
				</button>
				{ this.props.registered && <Redirect to={'/'} /> }
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		errorMessage: state.auth.registrationError,
		registered: state.auth.isAuthenticated
	}
);

SignupComp.propTypes = {
	errorMessage: PropTypes.string.isRequired,
	registerUser: PropTypes.func.isRequired,
	registered: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { registerUser })(SignupComp);