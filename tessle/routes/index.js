const router = require('express').Router()
const path = require('path')

module.exports = function (io) {
  router.get('/', function (req, res) {
     res.sendfile(__dirname + '../public/index.html');
  })

  router.get('/image', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/cat2.jpg'))
  })
  return router
}
