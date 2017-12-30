

//state

const initialState = {
	user: '',
	userID: '',
	registrationError: '',
	loginError:'',
	id_token:'',
	isFetching:false,
	isAuthenticated:false
};

//reducer

const authReducer = (state = initialState, action) => {

	switch (action.type) {
	case 'LOGIN_REQUEST':
		return {
			...state,
			isFetching: true,
			isAuthenticated: false,
			user: action.user	
		};
	
	case 'LOGIN_SUCCESS':
		return {
			...state,
			isFetching: false,
			isAuthenticated: true,
			loginError: '',
			registrationError: '',
			user: action.user,
			userID: action.userID,
			id_token: action.id_token
			
		};

	case 'LOGIN_FAILURE':
		return {
			...state,
			isFetching: false,
			isAuthenticated: false,
			loginError: action.err
		};

	case 'LOGOUT_SUCCESS':
		return {
			...state,
			isFetching: false,
			isAuthenticated:false,
			user: '',
			userID: '',
			id_token: ''
		};

	case 'NEW_SIGNUP':
		return {
			...state,
			isFetching: true,
			isAuthenticated: false
		};
	
	case 'REGISTERATION_ERROR':
		return {
			...state,
			isFetching: false,
			isAuthenticated: false,
			registrationError: action.err
		};

	default:
		return state;
	}

};

export default authReducer;
