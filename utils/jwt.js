const jwt = require('jsonwebtoken')
const secret = '343ldjsfsldfsln ke'
function createToken(palyload){
  //产生token
  palyload.ctime = Date.now()  //创建时间
  return jwt.sign(palyload,secret)
}

function checkToken(token){
  return new Promise((resolve,reject)=>{
    jwt.verify(token,secret,(err,data)=>{
      if(err){
        reject('token验证失败')
      }else{
        resolve(data)
      }
    })
  })
}
module.exports = {
  createToken,checkToken
}