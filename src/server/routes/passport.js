'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github2');

var _passportGithub2 = _interopRequireDefault(_passportGithub);

var _passportTwitter = require('passport-twitter');

var _passportTwitter2 = _interopRequireDefault(_passportTwitter);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtConfig = require('../jwt-config');

var _jwtConfig2 = _interopRequireDefault(_jwtConfig);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = _express2.default.Router();

const createToken = username => _jsonwebtoken2.default.sign({ user: username }, _jwtConfig2.default, { expiresIn: 60 * 60 });

_passport2.default.use(new _passportGithub2.default({
	clientID: process.env.GH_CLIENT_ID,
	clientSecret: process.env.GH_CLIENT_SECRET,
	callbackURL: process.env.GH_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
	_users2.default.findOne({
		id: profile.id
	}, (err, user) => {
		if (err) return done(err);

		if (!user) {
			user = new _users2.default({
				id: profile.id,
				displayName: profile.displayName,
				username: profile.username,
				password: '',
				githubID: profile.id,
				twitterID: '',
				userData: []
			});
			user.save(err => {
				if (err) console.log(err);
				return done(err, user);
			});
		} else {
			console.log('user, ', user);
			return done(err, user);
		}
	});
}));

app.get('/auth/github', _passport2.default.authenticate('github'));

app.get('/auth/github/callback', _passport2.default.authenticate('github', {
	failureRedirect: '/login'
}), (req, res) => res.redirect('/account'));

_passport2.default.use(new _passportTwitter2.default({
	consumerKey: process.env.T_CON_KEY,
	consumerSecret: process.env.T_CON_SECRET,
	callbackURL: '/auth/twitter/callback'
}, (accessToken, refreshToken, profile, done) => {
	_users2.default.findOne({
		id: profile.id
	}, (err, user) => {
		if (err) return done(err);

		if (!user) {
			user = new _users2.default({
				id: profile.id,
				displayName: profile.displayName,
				username: profile.username,
				password: '',
				githubID: '',
				twitterID: profile.id,
				userData: []
			});
			user.save(err => {
				if (err) console.log(err);
				return done(err, user);
			});
		} else {
			console.log('user, ', user);
			return done(err, user);
		}
	});
}));

app.get('/auth/twitter', _passport2.default.authenticate('twitter'));

app.get('/auth/twitter/callback/', _passport2.default.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => res.redirect('/account'));

app.post('/verify', (req, res) => {
	console.log('user: ', JSON.stringify(req.user));

	if (req.isAuthenticated()) {
		res.status(201).send({
			id_token: createToken(req.user.username),
			userID: req.user.id,
			user: req.user.username
		});
	} else res.redirect('/login');
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

const _default = app;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(app, 'app', 'src/serverES6/routes/passport.js');

	__REACT_HOT_LOADER__.register(createToken, 'createToken', 'src/serverES6/routes/passport.js');

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/serverES6/routes/passport.js');
}();

;