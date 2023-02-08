//기본 익스프레스 서버 실행
const express = require('express');
const path = require('path');

const app = express();

//express 포트 환경변수에 3000번 입력
app.set('port', process.env.PORT || 3000);
/*
app.set('port', 3000);
*/
/*
//모든 요청에 동일한 reponse를 사용하고 싶을 경우에는 미들웨어 사용
app.use((req, res, next) => {
  console.log('모든 요청에 사용');
  //콜백함수에 next인수를 넣고 함수를 실행해야 다음 라우터로 넘어감
  next();
});
*/

/*
//모든 요청이 아니라 특정 요청에서만 사용
app.use('/about', (req, res, next) => {
  console.log('모든 요청에 사용')
  next();
});

//미들웨어를 연달아 사용하기도 가능
app.use((req, res, next) => {
  console.log('모든 요청에 사용1')
  next();
}, (req, res, next) => {
  console.log('모든 요청에 사용2')
  next();
}, (req, res, next) => {
  console.log('모든 요청에 사용3')
  next();
});
*/

//에러처리
app.use((req, res, next) => {
  //res.send('hello express');
  next();
}, (req, res, next) => {
  try {
    //에러 발생 코드
    console.log(erownr);
  } catch (error) {
    //에러 catch시 에러처리 미들웨어로 넘김
    next(error);
  }
});


//메인으로 접속시 response
app.get('/', (req, res) => {
  res.send('hello express');
  //res.status(200).send('hello express');
});




app.post('/', (req, res) => {
  res.send('hello express!!!!');
});


//하드에서 html파일 읽어와서 보여줌
app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});



//라우트 매개변수 사용 route parameter (다른 라우터보다 아래에 둘 것)
app.get('/category/:name', (req, res) => {
  //res.send(`hello ${req.params.name}`);
  res.send('hello ' + req.params.name);
});


//애스터리스크 사용시 모든 요청에 대응 (라우터 중 가장 아래에 위치)
/*
app.get('*', (req, res) => {
  res.send('every');
});
*/

//에러 미들웨어 (4개의 매개변수(err, req, res, next)를 모두 사용할 것)
//에러 발생시 실행됨
app.use((err, req, res, next) => {
  console.error(err);
  res.send('error 발생');
});

//3000번 포트로 서버 실행
app.listen(app.set('port'), () => {
  console.log('익스프레스 서버 실행');
});

//한 라우터에 응답은 한번씩만