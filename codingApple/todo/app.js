const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : true }));

const { MongoClient } = require('mongodb');
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
    let bodyList = '';
    for (let i = 0; i < result.length; i++) {
      bodyList += `<p>할일 ${ i } : ${ result[i].title }</p><p>날짜 ${ i } : ${ result[i].date }`;
    }
    console.log(bodyList);
    const body = BS_Navbar + bodyList + BS_JS;
    const HTML = fullHTML(head, body);
    res.send(HTML);
    // console.log(result);
    // res.render('list.ejs', { posts : result });
  });
});

app.post('/add', (req, res) => {
  const head = BS_Head;

  console.log(req.body.title);
  console.log(req.body.date);

  const main = async () => {
    try {
      const { ID } = await db.collection('counter').findOne({ name: 'lastID' });
      const updateID = await db.collection('counter').updateOne({ name: 'lastID' }, { $inc : { ID: 1} });

      dbObject = {
        _id: ID,
        title: req.body.title,
        date: req.body.date,
      }

      const addDB = await db.collection('post').insertOne(dbObject);

      const body = BS_Navbar + '<p>Complete</p>' + BS_JS;
      const HTML = fullHTML(head, body);
      res.send(HTML);

    } catch (err) {
      console.error(err);
    }

  }

  main();
});






//포트, 실행할 함수
app.listen(8080, function() {
  console.log('listening on 8080');
});