'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuidV = require('uuid-v4');

var _uuidV2 = _interopRequireDefault(_uuidV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const secret = (0, _uuidV2.default)();

const _default = secret;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(secret, 'secret', 'src/serverES6/jwt-config.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/serverES6/jwt-config.js');
}();

;