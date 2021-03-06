var test = require('ava')
var request = require('supertest')

var createServer = require('../../server/server')
var usersDb = require('../../server/db/users')
var horoscopesDb = require('../../server/db/horoscopes')
var setupDb = require('./setup-db')

setupDb(test,createServer)

test.cb.serial('testing GET /api/horoscopes & 12 horoscopes', t => {
  request(t.context.app)
    .get('/v1/api/horoscopes')
    .expect(200)
    .end((err,res) => {
      if (err) console.log(err);
      t.is(res.body.length, 12)
      t.end()
    })
})


test.cb.serial('testing GET /api/horoscopes/signs/aries for correct data', t => {
  request(t.context.app)
    .get('/v1/api/horoscopes/sign/Aries')
    .expect(200)
    .end((err,res) => {
      if (err) console.log(err);
      t.is("Aries", res.body[0].star_signs)
      t.is(1, res.body.length)
      t.regex(res.body[0].image_url, /Aries\.jpg/)
      t.true(res.body[0].horoscope_1.length>0)
      t.end()
    })
})

test.cb.serial('testing GET /api/horoscopes/aries for correct data', t => {
  request(t.context.app)
    .get('/v1/api/horoscopes/201')
    .expect(200)
    .end((err,res) => {
      if (err) console.log(err);
      t.is("Bob1", res.body[0].name)
      t.is("201", res.body[0].horoscope_id)
      t.is("Aries", res.body[0].star_signs)
      t.end()
    })
})

// AVA ASSERTIONS:
// truthy
// falsy
// is
//regex
