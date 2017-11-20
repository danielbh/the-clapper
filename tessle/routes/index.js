const router = require('express').Router()

module.exports = function (io) {
  router.get('/', function (req, res) {
    res.render('index')
  })
  return router;
}
