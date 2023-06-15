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

router.get('/links/delete/:id', async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM pizza WHERE id = ?', [id])
  res.redirect('/links/list')
});

router.get('/links/edit/:id', async (req, res) => {

  const { id } = req.params
  const [ pizza ] = await pool.query('SELECT * FROM pizza WHERE id = ?', [id])
  res.render('links/edit', {pizza:pizza[0]})
})

router.post('/links/edit/:id', async (req, res) => {
  const { id } = req.params
  const { title, url, description} = req.body
  const newpizza = {
    title,
    url,
    description
  }
  await pool.query('UPDATE pizza SET ? WHERE id = ?', [newpizza, id])
  res.redirect('/links/list')
})

module.exports = router;
