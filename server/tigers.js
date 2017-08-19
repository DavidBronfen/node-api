// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server

var _ = require('lodash');

tigerRouter = require('express').Router();

var tigers = []
var id = 0;

// Update id
var updateId = function(req, res, next) {
  console.log(id);
  if (!req.body.id) {
    id = id + 1;
    req.body.id = id + '';
  }
  next();
}

// Set a tiger param to the request
tigerRouter.param('id', function(req, res, next, id) {
  var tiger = _.find(tigers, {id: id});

  if (tiger) {
    req.tiger = tiger;
    next()
  } else {
    res.send();
  }
});

tigerRouter.route('/')
  .get(updateId, function(req, res) {
    console.log(tigers);
    res.json(tigers);
  })
  .post(updateId, function(req, res) {
    var newTiger = req.body;

    tigers.push(newTiger);

    res.json(newTiger);
  })

tigerRouter.route('/:id')
  .get(function(req, res) {
    var tiger = req.tiger;
    res.json(tiger);

  })
  .put(function(req, res) {
    var update = req.body;
    if(update.id) {
      delete update.id;
    }

    var tiger = _.findIndex(tigers, {id: req.params.id});
    if (!tigers[tiger]) {
      res.send()
    } else {
      var updatedTiger = _.assign(tigers[tiger], update);
      res.json(updatedTiger);
    }

  })
  .delete(function(req, res) {
    var index = _.findIndex(tigers, {id: req.params.id});
    lions.splice(index, 1);

    res.json(req.tiger);
  })

module.exports = tigerRouter;
