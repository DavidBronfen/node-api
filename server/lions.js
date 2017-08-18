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

lionRouter.get('/', function(req,res) {
  res.json(lions);
});

lionRouter.get('/:id', function(req, res) {
  var lion = req.todo;
  res.json(lion || {});
});

lionRouter.post('/', updateId, function(req, res) {
  var lion  req.body;

  lions.push(lion);

  res.json(lion);

});

lionRouter.put('/:id', function(req, res) {
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

});

lionRouter.delete('lions/:id', function(req, res) {
  var index = _.findIndex(lions, {id: req.params.id});

  deleteLion = lions[index];
  lions.splice(index, 1);

  res.json(deleteLion);
});

module.exports = lionRouter;
