
// actions


const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

//

export const requestLogout = () => (
	{
		type: LOGOUT_REQUEST,
		isFetching: true,
		isAuthenticated: true
	}
);

export const receiveLogout = () => (
	{
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false
	}
);

export const receiveFailure = () => (
	{
		type: LOGOUT_FAILURE,
		isFetching: false,
		isAuthenticated: true
	}
);

//async

export const logoutUser = 
	() =>
		dispatch => {
			dispatch(requestLogout());
			localStorage.removeItem('id_token');
			localStorage.removeItem('user');
			dispatch(receiveLogout());
		};

//