const cheerio = require('cheerio')
let $ = cheerio.load('<div><p>你好</p><img src="https://www.baidu.com"><img src="https://www1.baidu.com"></div>')
// 将一组html格式的字符串转化为dom 之后可以通过jq的语法选中其中的元素
$('img').each((index,el)=>{
  console.log($(el).attr('src'))
})