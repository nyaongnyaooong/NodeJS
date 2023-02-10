const http = require('http');

//서버에 요청이 오면 실행되는 함수
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.write('<p>Hello server</p>');
  res.end('<p>Test</p>');
}).listen(8080)

server.on('listening', () => {
  console.log('8080port에서 서버 대기 중');
});
server.on('error', (error) => {
  console.log('error');
});