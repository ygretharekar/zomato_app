'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = _mongoose2.default.Schema;

const userSchema = new schema({
	id: String,
	displayName: String,
	username: String,
	password: String,
	twitterID: String,
	githubID: String,
	userData: Array
});

const User = _mongoose2.default.model('User', userSchema);

const _default = User;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(schema, 'schema', 'src/serverES6/models/users.js');

	__REACT_HOT_LOADER__.register(userSchema, 'userSchema', 'src/serverES6/models/users.js');

	__REACT_HOT_LOADER__.register(User, 'User', 'src/serverES6/models/users.js');

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/serverES6/models/users.js');
}();

;