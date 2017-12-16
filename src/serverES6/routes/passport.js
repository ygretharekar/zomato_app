import passport from 'passport';
import githubStrategy from  'passport-github2';
import twitterStrategy from 'passport-twitter';
import jwt from 'jsonwebtoken';
import secret from '../jwt-config';

import express from 'express';
import User from '../models/users';

const app = express.Router();

const createToken = username => jwt.sign({user: username}, secret, {expiresIn: 60*60});

passport.use(
	new githubStrategy(
		{
			clientID: process.env.GH_CLIENT_ID,
			clientSecret: process.env.GH_CLIENT_SECRET,
			callbackURL: process.env.GH_CALLBACK_URL
		}
	),
	(accessToken, refreshToken, profile, done) => {
		User.findOne(
			{
				id: profile.id
			},
			(err, user) => {
				if(err) return done(err);

				if(!user){
					user = new User(
						{
							id: profile.id,
							displayName: profile.displayName,
							username: profile.username,
							password: '',
							githubID: profile.id,
							twitterID: '',
							userData: []
						}
					);
					user.save(
						err => {
							if(err) console.log(err);
							return done(err, user);
						}
					);
				}
				else{
					console.log('user, ', user);
					return done(err, user);
				}
			}
		);
	}
);

app.get(
	'/auth/github',
	passport.authenticate('github')
);

app.get(
	'/auth/github/callback',
	passport.authenticate(
		'github',
		{
			failureRedirect: '/login'
		}
	),
	(req, res) => res.redirect('/account')
);


passport.use(
	new twitterStrategy(
		{
			consumerKey: process.env.T_CON_ID,
			consumerSecret: process.env.T_CON_SECRET,
			callbackURL: '/auth/twitter/callback'
		}
	),
	(accessToken, refreshToken, profile, done) => {
		User.findOne(
			{
				id: profile.id
			},
			(err, user) => {
				if(err) return done(err);

				if(!user){
					user = new User(
						{
							id: profile.id,
							displayName: profile.displayName,
							username: profile.username,
							password: '',
							githubID: '',
							twitterID: profile.id,
							userData: []
						}
					);
					user.save(
						err => {
							if(err) console.log(err);
							return done(err, user);
						}
					);
				}
				else{
					console.log('user, ', user);
					return done(err, user);
				}
			}
		);
	}
);

app.get(
	'/auth/twitter',
	passport.authenticate('twitter')
);

app.get(
	'/auth/twitter/callback/',
	passport.authenticate('twitter', { failureRedirect: '/login' }),
	(req, res) => res.redirect('/account')
);

app.post(
	'/verify',
	(req, res) => {
		console.log('user: ', req.user.username);

		if(req.isAuthenticated()){
			res.status(201).send(
				{
					id_token: createToken(req.user.username),
					userID: req.user.id,
					user: req.user.username
				}
			);
		}
		else res.redirect('/login');
	}
);

app.get(
	'/logout',
	(req, res) => {
		req.logout();
		res.redirect('/');
	}
);


