if(process.env.NODE_ENV === 'prod') module.exports = require('./store.prod');
else module.exports = require('./store.dev');