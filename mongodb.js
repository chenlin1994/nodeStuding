const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error.'))
db.once('open',()=>{
  console.log('db is ok')
})

// schema 对象

//创建一个和集合相关的schema对象  类似表头
// var schema = mongoose.Schema
// 获取schema对象
var userSchema = new mongoose.Schema({
  us:{type:String,required:true},
  ps:{type:String,required:true},
  age:Number,
  sex:{type:String,default:0},
})

//将schema对象转化为数据模型
var user = mongoose.model('testArr',userSchema); //该数据对象和结合关联('集合名',schema对象)
//操作数据库
// user.find() user.remove()  均是返回promise对象
user.insertMany({us:'wangyi',ps:'123',age:15}).then((data)=>{
  console.log('插入成功')
  console.log(data)
}).catch((err)=>{
  console.log('插入失败')
})

