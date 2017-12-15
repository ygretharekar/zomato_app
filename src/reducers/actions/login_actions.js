import axios from 'axios';
import { browserHistory } from 'react-router';


const HOST = 'http://127.0.0.1:3000';

// actions

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const NEW_SIGNUP = 'NEW_SIGNUP';
const REGISTERATION_ERROR = 'REGISTERATION_ERROR';


// action creators

export const requestLogin = info => (
	{
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		info
	}
);

export const receiveLogin = user => (
	{
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		user: user.user,
		userID: user.userID,
		id_token: user.id_token
	}
);

export const loginError = err => (
	{
		type: LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		err
	}
);

export const newSignup = () => (
	{
		type: NEW_SIGNUP,
		isFetching: true,
		isAuthenticated: false
	}
);
export const registerationError = err => (
	{
		type: REGISTERATION_ERROR,
		isFetching: false,
		isAuthenticated: false,
		err
	}
);

// async actions

export const checkAuth = 
() => 
	dispatch =>
		axios
			.post(`${HOST}/verify`)
			.then(
				res => {
					if(res.status == 201) {
						const user = res.data;
						dispatch(receiveLogin(user));
						browserHistory.push('/');
					}
				}
			)
			.catch(
				err => {
					console.log('User unathorized', err.response.data);
					dispatch(loginError(err.response.data));
				}
			);
//

export const loginUser = 
info =>
	dispatch => {
		dispatch(requestLogin(info));
		return axios
			.post(`${HOST}/sessions/create`, info)
			.then(
				res => {
					if(res.status === 201) {
						const user = res.data;
						dispatch(receiveLogin(user));
						browserHistory.push('/');
					}
				}
			)
			.catch(
				err => {
					console.log('Authentication Failed', err.response.data);
					dispatch(loginError(err.response.data));
				}
			);
	};
//

export const registerUser = 
	user =>
		dispatch => {
			dispatch(newSignup(user));
			return axios
				.post(`${HOST}/register`, user)
				.then(
					res => {
						let user = {
							user: res.data.username,
							userID: res.data.userID,
							id_token: res.data.id_token
						};
						dispatch(receiveLogin(user));
					}
				)
				.then(
					() => browserHistory.push('/')
				)
				.catch(
					err => {
						console.error('Registration Error: ' ,err.response.data);
						dispatch(registerationError(err.response.data));
					}
				);
		};

//