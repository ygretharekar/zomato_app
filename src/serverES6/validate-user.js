import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default data => {
	let err = {};

	if(validator.isEmpty(data.username)) err.username = 'Username is required';
	if(validator.isEmpty(data.password)) err.password = 'Password is required';
	if(validator.isEmpty(data.confirmPassword)) err.confirmPassword = 'Password is required';
	if(!validator.equals(data.password, data.confirmPassword)) err.confirmPassword = 'Password do not match';
	if(validator.isEmpty(data.email)) err.email = 'Email is required';
	if(!validator.isEmail(data.email)) err.email = 'Email is invalid';

	return {
		errors: err,
		isValid: isEmpty(err)
	};
};