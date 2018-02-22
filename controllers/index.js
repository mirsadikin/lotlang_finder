const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mirsa',
  database: 'longlat_finder'
});

router.get('/', (req,res) => {
  res.render('home' , {
    title: 'indexlah'
  })
})

router.post('/', (req,res) => {
  let posts = {
    name: req.body.name,
    lng: req.body.lng,
    lat: req.body.lat
  }
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, posts, (err,result) => {
    if (err) throw err;
    console.log(result);
    res.redirect('/');
  });
  return;
})

router.post('/search', (req,res) => {
  let sql = `SELECT * FROM posts WHERE (lng BETWEEN ${req.body.lng}-0.1 AND ${req.body.lng}+0.1) and (lat BETWEEN ${req.body.lat}-0.1 AND ${req.body.lat}+0.1)  `;
  let query = db.query(sql, (err, posts) => {
    if (err) throw err;
    res.render('search_result', {
      title: 'Search Result',
      posts: posts
    });
  });
});


module.exports = router;
