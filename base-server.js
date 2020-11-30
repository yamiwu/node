/* 
 * marquee 标签 放滚动的文字
 */

const http = require('http');
const serv = http.createServer((req, res) => {
  res.writeHeader(200, { 'Content-Type': 'text/html'});
  res.end('<marquee>Smashing Node!</marquee>');
});

serv.listen(3000);
