var fs = require('fs');
var stream = fs.createReadStream('stream.txt');
var files = fs.readdirSync(process.cwd());
files.forEach(f => {
  console.log('读取文件', f);
  // 只监听txt文件 有改变是会打告警日志
  if (/\.txt/.test(f)) {
    fs.watchFile(process.cwd() + '/' + f, () => {
      console.log('  -  ' + f + ' changed!');
    });
  }
});