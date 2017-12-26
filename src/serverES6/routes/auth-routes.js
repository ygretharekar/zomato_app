import _ from 'lodash';
import assert from 'assert';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import mongodb from 'mongodb';

import secret from '../jwt-config';
import validateUser from '../validate-user';

import User from '../models/users';

const url = process.env.MONGO_HOST;

const mongoClient = mongodb.MongoClient;

const app = express.Router();

const createToken = username => jwt.sign({user: username}, secret, {expiresIn: 60*60});

app.post(
	'/register',
	(req, res, next) => {
		const userInfo = req.body;
		console.log('New register received: ', userInfo);

		const validation = validateUser(userInfo);

		if(validation.isValid){
			User.findOne(
				{
					id: userInfo.email
				},
				(err, user) => {
					if(err) return next(err);

					if(!user){
						const passwordDigest = bcrypt.hashSync(userInfo.password, 10);
						user = new User(
							{
								id: userInfo.email,
								displayName: userInfo.username,
								username: userInfo.username,
								password: passwordDigest,
								githubID: '',
								twitterID: '',
								userData: []
							}
						);

						user.save(
							err => {
								if(err) console.log(err);
								res.status(201).send(
									{
										username: userInfo.username,
										userID: userInfo.email,
										id_token: createToken(userInfo.username)
									}
								);
							}
						);
					}
					else if( user.password === '' ){
						const passwordDigest = bcrypt.hashSync(user.password, 10);
						user.password = passwordDigest;
						user.save(
							err => {
								if(err) console.log(err);
								res.status(201).send(
									{
										username: user.username,
										id_token: createToken(user.username)
									}
								);
							}
						);
					}
					else {
						console.log('user, ', user);
						res.status(201).send(
							{
								username: user.username,
								userID: user.id,
								id_token: createToken(user.username)
							}
						);
					}
				}
			);
		}
		else {
			console.log('invalid registration', validation.errors);
			res.status(400).send('registration was invalid ', validation.errors);
		}
	}
);

app.post(
	'/session/create',
	(req, res) => {
		const { email, password } = req.body;

		User.findOne(
			{
				id: email
			},
			(err, user) => {

				if(user && bcrypt.compareSync(password, user.password)) {
					//console.log(JSON.stringify(user));
					res.status(201).send(
						{
							id_token: createToken(user.username),
							userID: user.id,
							user: user.username
						}
					);
				}

				else if(!user) {
					res.status(401).send('invalid login attemt');
				}

				else {
					res.status(401).send('Password Incorrect');
				}
			}
		);
	}
);

export default app;