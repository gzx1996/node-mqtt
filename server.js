const mosca = require('mosca');

//using mongodb
// const ascoltatore = {
//     //using ascoltatore
//     type: 'mongo',
//     url: 'mongodb://localhost:27017/mqtt',
//     pubsubCollection: 'ascoltatori',
//     mongo: {}
// };

// const settings = {
//     port: 1883,
//     backend: ascoltatore
// };
/*******************************************************/
//using redis
var ascoltatore = {
    type: 'redis',
    redis: require('redis'),
    db: 12,
    port: 6379,
    return_buffers: true, // to handle binary payloads
    host: "localhost"
};

var settings = {
    port: 1883,
    backend: ascoltatore,
    persistence: {
        factory: mosca.persistence.Redis,
        host: 'localhost',
        port: '6379'
    }
};
/*******************************************************/
const server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
    console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}