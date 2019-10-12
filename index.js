var fs = require('fs')
var demo = require('./demo')
demo.a()
//同步读取文件，在关键位置捕获错误信息 同步:try catch   异步:错误回到优先
try {
  let dirs = fs.readdirSync('./haha')
} catch (err) {
  // console.log(err)
}
//文件夹的创建 删除 重命名 读取
// fs.readdir('./',(err,data)=>{
  // console.log(error)
// })
// fs.mkdir('./textsss',(err)=>{
//   console.log(err)
// })
// fs.rename('./textsss','./test1',(err)=>{
//   console.log(err)
// })
// fs.rmdir('./test1',(err)=>{
//   console.log(err)
// })

//文件的创建 删除 读取 写入
// fs.writeFile('name.txt','今天天气不错',(err)=>{
//   console.log(err)
// })
// fs.appendFile('name.txt','yoyoyo',(err)=>{
//   console.log(err)
// })
// fs.readFile('name.txt',(err,msg)=>{
//   console.log(msg.toString('utf8'))
// })
// fs.readFile('name.txt','utf8',(err,msg)=>{
//   console.log(msg)
// })
fs.unlink('name.txt',(err)=>{
  console.log(err)
})



return
// let dirs = fs.readdirSync('./')
// console.log(dirs)
//异步读取
fs.readdir('./',(err,data)=>{
  if(err){
    console.log(err)
  }else{
    console.log(data)
  }
})
//错误的回调优先，在回调函数中第一个参数表示错误对象 默认为null 如果初夏错误err就是错误对象
