const express = require('express')
const  app = express();
const server = require('http').Server(app)
var ws = require('socket.io')(server)

// app.use(express.static(__dirname,'/client'))



ws.on('connection',function(client){
  client.emit('hehe','欢迎光临')
})
server.listen(9093,'0.0.0.0')