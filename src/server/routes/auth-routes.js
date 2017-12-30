'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _jwtConfig = require('../jwt-config');

var _jwtConfig2 = _interopRequireDefault(_jwtConfig);

var _validateUser = require('../validate-user');

var _validateUser2 = _interopRequireDefault(_validateUser);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const url = process.env.MONGO_HOST;

const mongoClient = _mongodb2.default.MongoClient;

const app = _express2.default.Router();

const createToken = username => _jsonwebtoken2.default.sign({ user: username }, _jwtConfig2.default, { expiresIn: 60 * 60 });

app.post('/register', (req, res, next) => {
	const userInfo = req.body;
	console.log('New register received: ', userInfo);

	const validation = (0, _validateUser2.default)(userInfo);

	if (validation.isValid) {
		_users2.default.findOne({
			id: userInfo.email
		}, (err, user) => {
			if (err) return next(err);

			if (!user) {
				const passwordDigest = _bcrypt2.default.hashSync(userInfo.password, 10);
				user = new _users2.default({
					id: userInfo.email,
					displayName: userInfo.username,
					username: userInfo.username,
					password: passwordDigest,
					githubID: '',
					twitterID: '',
					userData: []
				});

				user.save(err => {
					if (err) console.log(err);
					res.status(201).send({
						username: userInfo.username,
						userID: userInfo.email,
						id_token: createToken(userInfo.username)
					});
				});
			} else if (user.password === '') {
				const passwordDigest = _bcrypt2.default.hashSync(user.password, 10);
				user.password = passwordDigest;
				user.save(err => {
					if (err) console.log(err);
					res.status(201).send({
						username: user.username,
						id_token: createToken(user.username)
					});
				});
			} else {
				console.log('user, ', user);
				res.status(201).send({
					username: user.username,
					userID: user.id,
					id_token: createToken(user.username)
				});
			}
		});
	} else {
		console.log('invalid registration', validation.errors);
		res.status(400).send('registration was invalid ', validation.errors);
	}
});

app.post('/session/create', (req, res) => {
	const { email, password } = req.body;

	_users2.default.findOne({
		id: email
	}, (err, user) => {

		if (user && _bcrypt2.default.compareSync(password, user.password)) {
			//console.log(JSON.stringify(user));
			res.status(201).send({
				id_token: createToken(user.username),
				userID: user.id,
				user: user.username
			});
		} else if (!user) {
			res.status(401).send('invalid login attemt');
		} else {
			res.status(401).send('Password Incorrect');
		}
	});
});

const _default = app;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(url, 'url', 'src/serverES6/routes/auth-routes.js');

	__REACT_HOT_LOADER__.register(mongoClient, 'mongoClient', 'src/serverES6/routes/auth-routes.js');

	__REACT_HOT_LOADER__.register(app, 'app', 'src/serverES6/routes/auth-routes.js');

	__REACT_HOT_LOADER__.register(createToken, 'createToken', 'src/serverES6/routes/auth-routes.js');

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/serverES6/routes/auth-routes.js');
}();

;