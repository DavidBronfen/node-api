var router = require('express').Router();
var logger = require('../../util/logger');
// setup boilerplate route just to satisfy a request
// for building
router.param('id', function(){});

router.route('/')

router.route('/:id')


module.exports = router;
