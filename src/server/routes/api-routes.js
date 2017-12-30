'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _hotels = require('../models/hotels');

var _hotels2 = _interopRequireDefault(_hotels);

var _jwtConfig = require('../jwt-config');

var _jwtConfig2 = _interopRequireDefault(_jwtConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silent: true });

const app = _express2.default.Router();

app.post('/api/zomato', (req, res) => {
	const { results } = req.body;

	//console.log('the data ', results);


	_hotels2.default.find({}, (err, docs) => {
		_assert2.default.equal(null, err, 'Error while connecting!!');
		if (!err) {

			// console.log(docs[docs.length - 1]);

			let restaurants = docs.map(item => ({ id: item.id, attendees: item.attendees }));

			const payload = {
				data: results,
				attendance: restaurants
			};

			res.status(201).json(payload);
		}
	});
});

app.post('/api/attend', (req, res, next) => {
	const { res_id, userID, token } = req.body;

	// console.log(userID, ' ',res_id, ' ',token);

	_jsonwebtoken2.default.verify(token, _jwtConfig2.default, (err, decoded) => {
		if (!err) {

			// console.log('aaaaaaaaaaaaaaaaaaaaa', decoded);

			_hotels2.default.findOne({
				id: res_id
			}, (err, hotel) => {

				if (err) return next(err);

				let d = new Date();

				let today = d.getDate().toString() + ' ' + d.getMonth().toString() + ' ' + d.getFullYear().toString();

				if (hotel) {
					const present = item => item == userID;

					if (hotel.date !== today) {
						hotel.date = today;
						hotel.attendees = [];
					}

					if (hotel.attendees.find(present)) {
						console.log('user not going');
						let index = hotel.attendees.findIndex(present);

						hotel.attendees.splice(index, 1);

						hotel.save(err => {
							if (err) throw err;
						});
						res.end();
					} else {
						console.log('user going');
						hotel.attendees.push(userID);
						hotel.save(err => {
							if (err) throw err;
						});
						res.end();
					}
				} else if (!hotel) {
					hotel = new _hotels2.default({
						id: res_id,
						attendees: [userID],
						date: today
					});

					hotel.save(err => console.log(err));

					res.end();
				}
			});
		} else {
			res.status(401).send('User not Authenticated!!');
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

	__REACT_HOT_LOADER__.register(app, 'app', 'src/serverES6/routes/api-routes.js');

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/serverES6/routes/api-routes.js');
}();

;