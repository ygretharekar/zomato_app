'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = _mongoose2.default.Schema;

const hotelSchema = new schema({
	id: String,
	attendees: Array,
	date: String
});

const Hotel = _mongoose2.default.model('Hotel', hotelSchema);

const _default = Hotel;
exports.default = _default;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(schema, 'schema', 'src/serverES6/models/hotels.js');

	__REACT_HOT_LOADER__.register(hotelSchema, 'hotelSchema', 'src/serverES6/models/hotels.js');

	__REACT_HOT_LOADER__.register(Hotel, 'Hotel', 'src/serverES6/models/hotels.js');

	__REACT_HOT_LOADER__.register(_default, 'default', 'src/serverES6/models/hotels.js');
}();

;