'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _default = data => {
	let err = {};

	if (_validator2.default.isEmpty(data.username)) err.username = 'Username is required';
	if (_validator2.default.isEmpty(data.password)) err.password = 'Password is required';
	if (_validator2.default.isEmpty(data.confirmPassword)) err.confirmPassword = 'Password is required';
	if (!_validator2.default.equals(data.password, data.confirmPassword)) err.confirmPassword = 'Password do not match';
	if (_validator2.default.isEmpty(data.email)) err.email = 'Email is required';
	if (!_validator2.default.isEmail(data.email)) err.email = 'Email is invalid';

	return {
		errors: err,
		isValid: (0, _isEmpty2.default)(err)
	};
};

exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/serverES6/validate-user.js');
}();

;