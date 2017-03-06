'use strict';
const instruments = require('./instruments');
module.exports = function(app) {
  app.get('/showAll',instruments.showAll);
  app.post('/postData',instruments.postData);
  app.get('/instrument/:id',instruments.byId);
}
