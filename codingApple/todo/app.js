const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true }));

const { MongoClient } = require('mongodb');
const { Script } = require('vm');
app.set('view engine', 'ejs');
 

let db;
const dbURL = 'mongodb+srv://luckyyou123:R4w7j2yNgEhShF2l@cluster0.pdr9saa.mongodb.net/?retryWrites=true&w=majority';
MongoClient.connect(dbURL, (err, result) => {
  if (err) {
    return console.log(err);
  }

  db = result.db('todoapp');
  console.log('DB connected.');

});


//basic head
const BS_Head = fs.readFileSync(__dirname + '/bootstrapHTML/head.html');

//basic body
const BS_Navbar = fs.readFileSync(__dirname + '/bootstrapHTML/navber.html');
const BS_JS = fs.readFileSync(__dirname + '/bootstrapHTML/js.html');
const BS_WriteBody = fs.readFileSync(__dirname + '/bootstrapHTML/writeBody.html');
console.log('HTML file loaded.');



function fullHTML(head, body) {
  // let fullHTML = '<head>' + head + '</head><body>' + body + '</body>';
  const fullHTML = '<!doctype html><html><head>' + head + '</head><body>' + body + '</body></html>';
  return fullHTML
}



//Main Router
app.get('/', (req, res) => {
  const head = BS_Head;
  const body = BS_Navbar + BS_JS;
  const HTML = fullHTML(head, body);
  res.send(HTML);
  // res.sendFile(__dirname + '/index.html');
});


//생성 Router
app.get('/write', (req, res) => {
  const head = BS_Head;
  let body;

  body = BS_Navbar + BS_WriteBody + BS_JS;
  const HTML = fullHTML(head, body);
  res.send(HTML);
});


//Read Router
app.get('/list', (req, res) => {
  const head = BS_Head;

  db.collection('post').find().toArray((err, result) => {
    let bodyList = `<ul class="list-group">`;
    for (let i = 0; i < result.length; i++) {
      bodyList = bodyList + 
      `
        <li class="list-group-item">
          <h5>List ${ i + 1 }</h5>
          <span>할일 : ${ result[i].title }</span><br>
          <span>날짜 : ${ result[i].date }</span></p>
          <button class="btn_delete" data-id="${ result[i]._id }">삭제</button>
        </li>
      `;
      
    }


    bodyList += `</ul>

    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>

    <script>
      const deleteBTN = document.querySelectorAll('.btn_delete');

      for(let i = 0; i < deleteBTN.length; i++) {
        deleteBTN[i].addEventListener('click', (event) => {
          let listID = event.target.dataset.id;
          $.ajax({
            method: 'DELETE',
            url: '/list/delete',
            data: {_id: listID},
          }).done((result) => {
          });
          location.reload();
  
        });
      }

      

    </script>
    `;
    const body = BS_Navbar + BS_JS + bodyList;
    const HTML = fullHTML(head, body);
    res.send(HTML);
    // console.log(result);
    // res.render('list.ejs', { posts : result });
  });
});


app.delete('/list/delete', (req, res) => {
  const head = BS_Head;

  const deleteDataOnDB = async () => {
    try {
      /*
      const { ID } = await db.collection('counter').findOne({ name: 'lastID' });
      const updateID = await db.collection('counter').updateOne({ name: 'lastID' }, { $inc : { ID: 1} });
      */

      console.log(req.body);
      //형변환 string > int, 글번호 -> _id 매칭
      req.body._id = parseInt(req.body._id);
      console.log(req.body);

      //db삭제
      const deleteDB = await db.collection('post').deleteOne(req.body);
      res.status(200).send({ message : 'complete' })
      //res.redirect('/list');
      
      // res.send(HTML);

    } catch (err) {
      console.error(err);
      const body = BS_Navbar + '<p>Failed</p>' + BS_JS;
      const HTML = fullHTML(head, body);
      res.send(HTML);
    }

  }

  deleteDataOnDB();
});


app.post('/write/complete', (req, res) => {
  const head = BS_Head;

  console.log(req.body.title);
  console.log(req.body.date);

  const addDataOnDB = async () => {
    try {
      //ID 찾기
      const { ID } = await db.collection('counter').findOne({ name: 'lastID' });
      //ID 숫자증가
      const updateID = await db.collection('counter').updateOne({ name: 'lastID' }, { $inc : { ID: 1} });

      //넣을 DB값 object형식으로 선언
      dbObject = {
        _id: ID,
        title: req.body.title,
        date: req.body.date,
      }

      //object를 db에 저장
      const addDB = await db.collection('post').insertOne(dbObject);

      //결과를 클라이언트한테 전송
      const body = BS_Navbar + '<p>Complete</p>' + BS_JS;
      const HTML = fullHTML(head, body);
      res.redirect('/write')
      // res.send(HTML);

    } catch (err) {
      console.error(err);
      //실패했음을 클라이언트한테 전송
      const body = BS_Navbar + '<p>Failed</p>' + BS_JS;
      const HTML = fullHTML(head, body);
      res.send(HTML);
    }

  }

  addDataOnDB();
});






//포트, 실행할 함수
app.listen(8080, function() {
  console.log('listening on 8080');
});