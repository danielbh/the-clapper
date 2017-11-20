// var startAmbientSensor = require('./modules/ambient')
// var startServo = require('./modules/servo')
var { startServer } = require('./server')

startServer(function (app, io) {
  setInterval(function () {
     io.emit('clap_back')
  }, 10000)
})

