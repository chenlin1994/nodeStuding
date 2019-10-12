const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error.'))
db.once('open',()=>{
  console.log('db is ok')
})
module.exports = db
