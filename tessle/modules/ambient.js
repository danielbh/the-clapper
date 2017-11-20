var tessel = require('tessel')
var ambientlib = require('ambient-attx4')
var ambient = ambientlib.use(tessel.port['A'])

function startAmbientSensor(done) {
  var maxClaps = 5
  var claps = 0
  var threshold = 0.15

  ambient.on('ready', function () {
    ambient.setSoundTrigger(threshold)
    ambient.once('sound-trigger', soundTrigger)
    console.log('Clap detection ready')
    if (done) done()
  })

  /*
    Sound sensor event handlers
  */
  function soundTrigger(delta) {

    // TODO what is delta?

    console.log('Clap detected', claps)
    ++claps
    // To create pauses for claps. Constant sounds can't work
    // TEST: Does this work?
    stopListening()
    setTimeout(startListening, 1)

    if (claps >= maxClaps) {
      stopListening()
      triggerClapResponse(startListening)
      claps = 0
    }
  }

  function startListening() {
    console.log('Started Listening', claps)
    ambient.once('sound-trigger', soundTrigger)
    ambient.setSoundTrigger(threshold)
  }

  function stopListening() {
    console.log('Stopped listening', claps)
    ambient.clearSoundTrigger()
  }

  function triggerClapResponse(io, done) {
    // TODO: Send request to initiate clap response
    // Call done when done
    io.emit('clap_back')
    done()
  }
}

module.exports = startAmbientSensor
