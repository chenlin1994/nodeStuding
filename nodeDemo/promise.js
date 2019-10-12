const fs = require('fs')
// fs.stat('./hehe.js',(err,stats)=>{
//   if(err){
//     console.log('文件不存在')
//   }else{
//     fs.unlink('./hehe.js',(err)=>{
//       console.log(err)
//       fs.writeFile('./text.js','...',()=>{

//       })
//     })
//   }
// })
function delfile(){
  return new Promise((resolve,reject) => {
    fs.unlink('./hehe.js',(err)=>{
      if(err){
        resolve('错误')
      }else{
        resolve('成功了')
      }
    })
  })
}
delfile().then((msg)=>{
  console.log(msg)
}).catch((err)=>{
  console.log(err)
})