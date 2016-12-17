var express = require('express');
var app = express();

app.use(express.static('static'))

//  主页输出 "Hello World"
app.get('/', function (req, res) {
  console.log("index.html");
})

//  POST 请求
// app.post('/', function (req, res) {
//    console.log("主页 POST 请求");
//    res.send('Hello POST');
// })

//  GET 请求
app.get('/ajax/*', function (req, res) {
  console.log("path", req.path);
  path = req.path;
  res.sendFile(path);
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})