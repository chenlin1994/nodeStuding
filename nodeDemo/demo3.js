const qs = require('querystring')
let string = 'name=chen&pas=122&sex=0'
let obj = qs.parse(string,'&','=')
let obj1 = { name: 'chen', pas: '122', sex: '0' }
console.log(obj)
console.log(qs.stringify(obj1,'&','='))
console.log(qs.escape('我是'))
console.log(qs.unescape('%E6%88%91%E6%98%AF'))