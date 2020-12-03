var net = require('net');

var colorStart = '\033[96m';
var colorEnd = '\033[39m';
// 创建一个tcp服务
var server = net.createServer(function (conn) {
  // handle connection
  console.log(colorStart + 'new connection!' + colorEnd);
  // console.log('conn', conn);
});

// 监听
server.listen(3000, function () {
  console.log(colorStart + 'server listening on *:3000' + colorEnd);
});
