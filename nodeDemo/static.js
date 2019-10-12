const path =require('path')
const express = require('express')
const app = express()
console.log(__dirname)
console.log(path.join(__dirname,'./imgs'))
app.use('/public',express.static(path.join(__dirname,'./imgs')))
app.listen(3003,()=>{
  
})