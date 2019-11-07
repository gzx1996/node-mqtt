const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://127.0.0.1:1883')

client.on('connect', function () {
  client.subscribe('test')
  client.publish('test', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})