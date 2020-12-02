console.log(process.argv, __dirname);
// 返回值 第一个永远是node 第二个元素时钟是执行文件的路径，比如现在执行 node argv.js 下面即为其路径， 紧接着是命令行后紧跟着的参数
//《了不起的nodejs》p57
// [ '/usr/local/bin/node', '/Users/mac/Documents/project/node/argv.js' ]
// 要获取真正的元素，需要去掉前面连个元素 即
var argv = process.argv.slice(2);

// 
