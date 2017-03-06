'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));


require('./routes')(app);
app.get('/', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.use(express.static(__dirname + '/public'));
app.listen(port,function() {
  console.log(`Listening on port ${port}`);
});
