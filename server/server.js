var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

var users = require('./routes/users')
var horoscopes = require('./routes/horoscopes')

var server = express()

server.use(cors('*'))

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.use('/v1/api/users', users)
server.use('/v1/api/horoscopes', horoscopes)

module.exports = function(db) {
  server.set('db', db)
  return server
}
