var tessel = require('tessel')
var ambientlib = require('ambient-attx4')
var ambient = ambientlib.use(tessel.port['A'])

function startAmbientSensor(done) {
  var maxClaps = 5
  var claps = 0

  ambient.on('ready', function () {
    ambient.setSoundTrigger(0.20)
    ambient.on('sound-trigger', soundTrigger)
    console.log('Clap detection ready')
    if (done) done()
  })

  /*
    Sound sensor event handlers
  */
  function soundTrigger() {
    console.log('Clap detected', claps)
    ++claps
    // To create pauses for claps. Constant sounds can't work
    // TEST: Does this work?
    stopListening()
    setTimeout(startListening, 1)

    if (claps >= maxClaps) {
      stopListening()
      triggerClapResponse(startListening)
    }
  }

  function startListening() {
    console.log('Started Listening', claps)
    ambient.on('sound-trigger', soundTrigger)
    ambient.setSoundTrigger(0.17)
  }

  function stopListening() {
    console.log('Stopped listening', claps)
    ambient.removeListener('sound-trigger', soundTrigger)
    ambient.clearSoundTrigger()
  }

  function triggerClapResponse(done) {
    // TODO: Send request to initiate clap response
    // Call done when done
    done()
  }
}

module.exports = startAmbientSensor
