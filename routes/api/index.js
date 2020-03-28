const express = require('express');

const usersApi = require('./users');
const authApi = require('./auth');

const apiRoutes = express.Router();

apiRoutes.use('/users', usersApi);
apiRoutes.use('/auth', authApi);

module.exports = apiRoutes;
