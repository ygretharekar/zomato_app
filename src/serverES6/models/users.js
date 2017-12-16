import mongoose from 'mongoose';

const schema = mongoose.Schema;

const userSchema = new schema(
	{
		id: String,
		displayName: String,
		username: String,
		password: String,
		twitterID: String,
		githubID: String,
		userData: Array
	}
); 

const User = mongoose.model('User', userSchema);

export default User;