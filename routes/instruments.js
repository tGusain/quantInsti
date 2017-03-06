'use strict';

var Q = require('q');
var dbQueries = require('../model/dbQueries');
var constants = require('../model/constants');


var instruments  = {
  showAll : function showAll(req, res) {
    dbQueries.select(function(err,resp) {
      resp.forEach(function(instrument) {
       instrument.status = constants.STATUS[instrument.status];
      });
      return res.send(resp);
    });
  },
  postData : function postData(req, res, next) {

    function fetchInstrumentById(instrument) {
      var deferred = Q.defer();
      dbQueries.byId(instrument.instrument_id, function(err,res) {
        return deferred.resolve(res);
      });
      return deferred.promise;
    }
    function instrumentCreate(instrument) {
      var deferred = Q.defer();
      dbQueries.insert(instrument, function(err,res) {
        return deferred.resolve();
      });
      return deferred.promise;
    }

    function instrumentUpdate(instrument) {
      var deferred = Q.defer();
      dbQueries.update(instrument, function(err,res) {
        return deferred.resolve();
      });
      return deferred.promise;
    }


    const data = req.body.data;
    if(data == undefined || data ==  null) {
        return res.send("Empty Data. Cannot insert");
    }
    let splitData = data.split('|');
    const instrument = {};
    splitData.forEach(function(entity) {
      let keyValue = entity.split('=');
      switch(keyValue[0]) {
      case '48' : instrument.instrument_id = keyValue[1];break;
      case '54' : instrument.status = keyValue[1];break;
      case '32' : instrument.units = keyValue[1];break;
      }
    });
    fetchInstrumentById(instrument)
      .then(function(res) {
        var position = 0;
        position = (instrument.status == 1) ? Number(instrument.units) : -Number(instrument.units);
        if (res && res.length) {
          position +=Number(res[0].position);
          instrument.position = position;
          return instrumentUpdate(instrument);
        } else {
          instrument.position = position;
          return instrumentCreate(instrument);
        }
      }).then(function(response) {
        return res.send('Succesfully Inserted');
      }).fail(function(err) {
        console.log(err);
      });

  },
  byId : function byId(req, res, next) {
    var instrument_id = req.params.id;
    dbQueries.byId(instrument_id,function(err,resp) {
      if (err || !resp || !resp.length) {
        var error = new Error('Not Found');
        error.status=404;
        return next(error);
      } else {
        resp.forEach(function(instrument) {
          instrument.status = constants.STATUS[instrument.status];
        });
        return res.send(resp);

      }
    });
  }
}


module.exports = instruments;
