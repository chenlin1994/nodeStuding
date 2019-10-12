const mongoose = require('mongoose')
const foodSchema = new mongoose.Schema({
  name:{type:String,required:true},
  price:{type:String,required:true},
  desc:{type:String,require:true},
  typename:{type:String,required:true},
  typeid:{type:Number,required:true},
  img:{type:String,required:true},
  img:{type:String,required:true}
})

var food = mongoose.model('foods',foodSchema); //该数据对象和结合关联('集合名',schema对象)
module.exports = food