import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import LoginComp from './loginComp';
import SignupComp from './signupComp';
import LoadingComp from '../components/loadingAni';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			login: 'btn-info',
			signup: 'btn-secondary'
		};

		this.changeTab = this.changeTab.bind(this);
	}

	changeTab(){
		this.setState(
			prevState => (
				{
					login: prevState.signup,
					signup: prevState.login
				}
			)
		);
	}

	render(){
		return(
			<div>
				<nav className='navbar'>
					<Link 
						to='/'
						className='nav-link'
					>
						Back
					</Link>		
				</nav>
				<div className = 'container login-page'> 
					{
						!this.props.failed && 
						<div>
							<div className='btn-group d-flex justify-content-center'>
								<button
									type='button'
									onClick={this.changeTab}
									className={`btn ${this.state.login}`}>LogIn</button>
								<button
									type='button'
									onClick={this.changeTab}
									className={`btn ${this.state.signup}`}>SignUp</button>
							</div>
							{
								(
									() => {
										if (this.state.login == 'btn-info') {

											if (this.props.loading) return <LoadingComp/>;
											
											return <LoginComp/>;

										} else if (this.state.signup == 'btn-info') {
											if (this.props.loading) 
												return <LoadingComp/>;
											return <SignupComp/>;
										} else 
											return <h1>Nothing..!!</h1>;
									}
								)()
							}
						</div>
					}
					{
						this.props.failed &&
						<LoginComp />
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		loading: state.auth.isFetching,
		failed: state.auth.loginError 
	}
);

Login.propTypes = {
	loading: PropTypes.bool.isRequired,
	failed: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Login);