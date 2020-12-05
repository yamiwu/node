var net = require('net');

var colorStart = '\033[96m';
var colorEnd = '\033[39m';

// 记录当前聊天人数
var count = 0;
// 创建一个tcp服务
var server = net.createServer(function (conn) {
  // handle connection
  console.log('new connnection!');
  
  conn.write(
      '\n > Welcome to \033[92m node-chat!' + colorEnd
    + '\n > ' + count + ' other people are connected at this time.'
    + '\n > please write your name and press enter'
  );
  count++;
});

// 监听
server.listen(3000, function () {
  console.log(colorStart + 'server listening on *:3000' + colorEnd);
});
