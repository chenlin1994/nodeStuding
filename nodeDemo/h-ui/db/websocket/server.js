const websocket = require('ws')
const ws = new websocket.Server({port:8001},()=>{
  console.log('socket start')
})
let clients = []

ws.on('connection',(client)=>{
  clients.push(client)
  client.send('欢迎光临')  //数据传输字符串
  client.on('message',(msg)=>{
    console.log('前端发送消息',msg)
    if(msg.indexOf('广播')!=-1){
      sendAll()
    }
  })
  client.on('close',(msg)=>{
    console.log('前端主动断开')
  })
})

function sendAll(){
  for(let index = 0;index<clients.length;index++){
    clients[index].send('lfjdlfdslfjsdlfjdls')
  }
}