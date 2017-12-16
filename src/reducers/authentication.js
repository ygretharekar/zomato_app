

//state

const initialState = {
	user: '',
	userID: '',
	registrationError: '',
	loginError:'',
	isFetching:false,
	isAuthenticated:false
};


//reducer

const authReducer = (state = initialState, action) => {

	switch (action.type) {
	case 'LOGIN_REQUEST':
            
		break;
    
	default:
		return state;
	}

};

export default authReducer;