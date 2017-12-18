import express from 'express';
import assert from 'assert';
import dotenv from 'dotenv';

import appConfig from './config/middlwares';

dotenv.config({ silence: true });

const app = express();

appConfig(app);


app.listen(
	process.env.PORT || 3000,
	err => {
		if(err) throw err;

		else {
			console.log(
				`
					Server is running on port: ${process.env.PORT}
    				---
				`
			);
		}
	}
);