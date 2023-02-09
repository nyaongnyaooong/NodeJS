//dotenv, 라우터 분리
//비밀 키 관리
//프로젝트 폴더에 .env 파일 생성

//기본 익스프레스 서버 실행
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')

//dotenv 사용
const dotenv = require('dotenv');
dotenv.config();

//라우터 분리
//routes 폴더에 index, user.js 생성
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
  },
  name: 'connext.sid',
}));

//분리 라우터 불러오기
app.use('/', indexRouter);
app.use('/user', userRouter);





app.get('/', (req, res) => {
  //개개인의 저장 공간 할당
  req.session.id = 'id';
  req.cookies;
  req.signedCookies;
  res.cookies('name', encodeURIComponent(name), {
    expires: new Date(),
    httpOnly:true,
    path: '/',
  });
  res.clearCookie('name', encodeURIComponent(name), {
    httpOnly: true,
    path: '/',
  });

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