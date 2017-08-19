<<<<<<< HEAD
=======
// TODO: user app.params to find the lion using the id
// and then attach the lion to the req object and call next. Then in
// '/lion/:id' just send back req.lion

// create a middleware function to catch and handle errors, register it
// as the last middleware on app


// create a route middleware for POST /lions that will increment and
// add an id to the incoming new lion object on req.body

>>>>>>> master
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

<<<<<<< HEAD
var lionRouter = require('./lions');
var tigerRouter = require('./tigers')

app.use(morgan('dev'));
=======
var lions = [];
var id = 0;

var updateId = function(req, res, next) {
  // assign increamented id converted to a string.
  if (!req.body.id) {
    id = id + 1 + '';
    req.body.id = id;
  }
  next();
};

app.use(morgan('dev'))
>>>>>>> master
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// this is called mounting. when ever a req comes in for
// '/lion' we want to use this router
app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);

<<<<<<< HEAD
app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
=======
app.param('id', function(req, res, next, id) {
  // fill this out to find the lion based off the id
  var lion = _.find(lions, {id: id});

  // and attach it to req.lion. Rember to call next()
  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }

});

app.get('/lions', function(req, res){
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  // use req.lion
  var lion = req.lion;
  res.json(lion || {});
});

app.post('/lions', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});


app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(err)
  }
>>>>>>> master
});

app.listen(3000);
console.log('on port 3000');
