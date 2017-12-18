import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;

dotenv.config({silence: true});


try {
	mongoose.connect(process.env.MONGO_HOST);
} catch (err) {
	mongoose.createConnection(process.env.MONGO_HOST);
}

const db = mongoose.connection;

db
	.once(
		'open',
		() => console.log('connected to mongodb')
	)
	.on(
		'error',
		err => {
			console.log(`Error while connecting to mongo ${err.message}`);
			throw err;
		}
	);


export default db;