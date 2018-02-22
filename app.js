const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mirsa',
  database: 'longlat_finder'
});

db.connect((err) => {
  if (err) throw err;
  console.log('db connected!');
});

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// set body parser to read all input form
// body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

let index = require('./controllers/index')
app.use('/', index);

app.listen(3000, ()=> {
  console.log('running on port 3000');
});
