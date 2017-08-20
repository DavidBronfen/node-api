var _ = require('lodash');
var lionRouter = require('express').Router();

var lions = [
  {
    id: 1,
    name: 'Hassan',
    age: '4 months',
    gender: 'Male',
  }
];

var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id){
    id = id + 1;
    // Set int to string.
    req.body.id = id + '';
  }
  next();
}

lionRouter.param('id', function(req, res, next, id) {
  var lion = _.find(lions, {id: id});

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

lionRouter.route('/')
  .get(function(req,res) {
    res.json(lions);
  })
  .post(updateId, function(req, res) {
    var lion = req.body;
    lions.push(lion);

    res.json(lion);
  })


lionRouter.route('/:id')
  .get(function(req, res) {
    var lion = req.lion;
    res.json(lion || {});
  })
  .put(function(req, res) {
    var update = req.body;

    if (update.id) {
      delete update.id
    }

    var lion = _.findIndex(lions, {id: req.params.id});

    if (!lions[lion]) {
      res.send();
    } else {
      updatedLion = _.assign(lions[lion],update);
      res.json(updatedLion);
    }

  })
  .delete(function(req, res) {
    var index = _.findIndex(lions, {id: req.params.id});

    deleteLion = lions[index];
    lions.splice(index, 1);

    res.json(deleteLion);
  })

module.exports = lionRouter;
