const express = require('express');
const router = express.Router();
const pool = require('../database')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/links/add', (req, res) => {
  res.render('links/add')
})

router.post('/links/add', async (req, res) => {

  const { title, url, description } = req.body
  const newpizza = {
    title,
    url,
    description,
  }
  await pool.query('INSERT INTO pizza SET ?', [newpizza])
  res.redirect('/links/list')
})

router.get('/links/list', async (req, res, next) => {
  const [ pizza ] = await pool.query('SELECT * FROM pizza ')
  console.log(pizza)
  res.render('links/list', { pizza })
  
});

module.exports = router;
