const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  us:{type:String,required:true},
  ps:{type:String,required:true},
  age:Number,
  sex:{type:String,default:0},
})

var user = mongoose.model('testArr',userSchema); //该数据对象和结合关联('集合名',schema对象)
module.exports = user