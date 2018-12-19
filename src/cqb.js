const _ = require('lodash')
const cypher = require('cypher-query-builder')
const path = require('path')
const dbEnvConfig = require(path.join(__dirname, '..', 'config', 'db.json'))
const fetch = require('node-fetch')
const isomorphic_fetch = require('isomorphic-fetch')

global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

// Make sure to include the protocol in the hostname
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const dbConfig = _.get(dbEnvConfig, `${process.env.NODE_ENV}`)
let db = new cypher.Connection('http://localhost:7474', {
  username: dbConfig.username,
  password: dbConfig.password,
});

module.exports = db