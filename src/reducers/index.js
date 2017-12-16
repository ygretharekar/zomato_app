import { combineReducers } from 'redux';
import auth from './authReducer';
import zomato from './zomatoReducer';

export default combineReducers(
	{
		auth,
		zomato
	}
);