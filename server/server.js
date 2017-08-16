// TODO: make this work.
// if you go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [
  {
    id: 1,
    name: 'Hassan',
    age: '4 months',
    gender: 'Male',
  }
];

var id = 0;

app.get('/lions', function(req, res) {
  res.json(lions);
});

app.get('/lions/:id', function(req, res) {
  var lion = lions.filter(function(lion) {
    return lion.id == req.params.id;
  });

  if(lion != 'undefined') {
    res.json(lion);
  }

});

app.post('/lions', function(req, res) {
  var newLion = req.body;
  id = id + 1;
  newLion.id = id;

  lions.push(newLion);

  res.json(newLion);

});

app.put('/lions/:id', function(req, res) {
  var updateLion = req.body;

  var delta = lions.findIndex(function(lion) {
    return lion.id == req.params.id;
  });

  if (!lions[delta]) {
    res.send();
  } else {
    var updatedLion = Object.assign(lions[delta], updateLion);
    res.json(updatedLion);
  }

});

app.delete('lions/:id', function(req, res) {
  var index = lions.findIndex(function(lion) {
    return lion.id == req.params.id;
  });

  lions = lions.splice(index, 1);

  res.json(lions);
});

app.listen(3000);
console.log('on port 3000');
