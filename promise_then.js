const fs = require('fs')
function  isExit(){
  return new Promise((resolve,reject)=>{
    fs.stat('./hehe.js',(err,stats)=>{
      if(err){
        reject('文件不存在')
      }else{
        resolve('文件存在')
      }
    })
  })
}

function delFile(){
  return new Promise((resolve,reject)=>{
    fs.unlink('./hehe.js',(err)=>{
      if(err){
        reject('del no ok')
      }else{
        resolve('del ok')
      }
    })
  })
}

isExit().then(()=>{
  console.log('is exit 的成功处理')
  return delFile()
}).then(()=>{
  console.log('删除文件成功的函数')
  throw new Error('手动终止')
}).catch((err)=>{
  console.log('catch')
  console.log(err)
})