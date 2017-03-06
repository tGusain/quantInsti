'use strict';

var connection = require('./connection');

var dbQueries = {
  update : function update(instrument, cb) {
    var query = `update instrument set units = ${instrument.units}, position = ${instrument.position}, status = ${instrument.status} where instrument_id= ${instrument.instrument_id}`;

    connection.query(query, cb);

  },

  insert : function insert(instrument, cb) {
    var query = `insert into instrument(instrument_id, units, position, status) values (${instrument.instrument_id},${instrument.units},${instrument.position},${instrument.status})`;
    connection.query(query, cb);
  },

  select : function select(cb) {
    var query = 'select * from instrument';
    connection.query(query, cb);
  },

  byId : function byId(instrument_id, cb) {
    var query = `select * from instrument where instrument_id = ${instrument_id}`;
    connection.query(query, cb);
  }

}

module.exports = dbQueries;
