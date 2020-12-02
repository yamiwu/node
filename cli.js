var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;

fs.readdir(process.cwd(), (err, files) => {
  console.log('__dirname', __dirname, process.cwd());
  if (!files.length) {
    return console.log(' \033[31m No files to show!\003[39m\n');
  }
  console.log('  Select which file or directory you want to see \n');
  
  // 保存stat对象 为了校验 选择的是目录时 展示目录下文件名
  var stats = [];
  function file(i) {
    var fileName = files[i];
    fs.stat(`${__dirname}/${fileName}`, (err, stat) => {
      stats[i] = stat;
      if (stat.isDirectory) {
        console.log('is  '+i + '    \033[36m' + fileName + '/\033[39m');
      } else {
        console.log('isnot   '  + i +'\033[90m' + fileName + '\033[39m');
      }

      if (++i == files.length) {
        read();
      } else {
        file(i);
      }
    });
  }

  function read() {
    console.log(' ');
    stdout.write('   \033[33mEnter your choice: \033[39m');
    //
    stdin.resume();
    stdin.setEncoding('utf-8');
    stdin.on('data', option);
  }

  function option(data) {
    var fileName = files[Number(data)];
    if (!fileName) {
      // 输入的文件是不存在的，则暂停
      stdout.write('   \033[31mEnter your choice: \033[39m')
    } else {
      // 输入的文件存在，则终止输入（不执行该命令，程序执行完fs操作后，程序无法退出）
      stdin.pause();
      if (stats[Number(data)].isDirectory()) {
        fs.readdir(`${__dirname}/${fileName}`, (err, files) => {
          console.log(' ');
          console.log('   (' + files.length + ' files)');
          files.forEach(file => {
            console.log('  -  ' + file);
          });
          console.log(' ');
        })
      } else {
        // 读取文件然后退出程序
        fs.readFile(`${__dirname}/${fileName}`, 'utf8', (err, data) => {
          console.log(' ');
          console.log('\033[90m' + data.replace(/(.*)/g, '   $1') + '\033[39m')
        });
      }
    }
  }
  file(0);
});