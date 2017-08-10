
var Knex = require('knex')
var config = require('../knexfile')[process.env.NODE_ENV || 'development']
var knex = Knex(config)

var createServer = require('./server')
var server = createServer(knex)
var PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
