//기본 익스프레스 서버 실행
const express = require('express');

const app = express();

//메인으로 접속시 response
app.get('/', (req, res) => {
  res.send('hello express');
});

//3000번 포트로 서버 실행
app.listen(3000, () => {
  console.log('익스프레스 서버 실행')
});