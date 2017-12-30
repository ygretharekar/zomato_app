'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _middlwares = require('./config/middlwares');

var _middlwares2 = _interopRequireDefault(_middlwares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({ silence: true });

const app = (0, _express2.default)();

(0, _middlwares2.default)(app);

app.listen(process.env.PORT || 3000, err => {
	if (err) throw err;else {
		console.log(`
					Server is running on port: ${process.env.PORT}
    				---
				`);
	}
});
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(app, 'app', 'src/serverES6/server.js');
}();

;