var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./categoryController');
var createRoutes = require('../../util/createRoutes');
createRoutes(controller, router);
// setup boilerplate route just to satisfy a request
// for building

module.exports = router;
