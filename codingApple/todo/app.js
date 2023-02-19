const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended : true }));


/*
app.get('/', (req, res) => {
  res.send('Hello Express');
});
*/
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});

app.post('/add', (req, res) => {
  res.send('complete');
  console.log(req.body.title);
  console.log(req.body.date);
  //DB
});


//포트, 실행할 함수
app.listen(8080, () => {
  console.log('listening on 8080');
});