import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import fallback from 'express-history-api-fallback';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

import db from './database';
import apiRoutes from '../routes/api-routes';
import authRoutes from '../routes/auth-routes';
import passportRoutes from '../routes/passport';

const mongoConnect = MongoStore(session);

export default app => {
	app.use(express.static('dist'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	
	const string  = process.env.COOKIE_SECRET;
	app.use(cookieParser(string));


	
	app.use(session(
		{
			secret: 'some secret',
			resave: true,
			secure: false,
			saveUninitialized: true,
			store: new mongoConnect(
				{
					mongooseConnection: db
				}
			)
		}
	));
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => done(null, user) );
	passport.deserializeUser((user, done) => done(null, user) );

	//app.use(apiRoutes);
	app.use(authRoutes);
	app.use(passportRoutes);
	app.use(apiRoutes);

	app.use(fallback(path.join(__dirname, '../../../dist/index.html')));

	app.use(
		(err, req, res, next) => {
			res.status(err.status || 500).json(
				{
					error: {
						message: err.message
					}
				}
			);
		}
	);

};

