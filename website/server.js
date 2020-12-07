var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
  console.log('req-', req.url, req.method);
  if (
    req.method == 'GET'
    && req.url.substr(0, 7) == '/images'
    && req.url.substr(-4) == '.jpg') {
      // 静态文件托管
      fs.stat(__dirname + req.url, function(err, stat){
        if (err || !stat.isFile) {
          res.writeHead(404);
          res.end('Not Find');
          return;
        }
        serve(__dirname + req.url, 'application/jpg');
      });
  } else if (req.method == 'GET' && req.url == '/') {
    // 返回index.html文件
    serve(__dirname + '/index.html', 'text/html');
  } else {
    res.writeHead(404);
    res.end('Not found!');
  }
  // 响应方法
  function serve(path, type) {
    res.writeHead(200, { 'Content-Type': type });
    console.log('serve-', path, res);
    fs.createReadStream(path).pipe(res);
  }
});

// 监听
server.listen(8080, () => {
  console.log('监听')
});
