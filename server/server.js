var express = require('express');
var app = express();
var api = require('./api/api');

// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api/', api);
// set up global error handling

app.use(function(err, req, res, next) {
  if(err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// export the app for testing
module.exports = app;
