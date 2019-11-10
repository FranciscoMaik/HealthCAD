var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/cadastrodepacientes' ,function(req, res, next){
  res.render('cadastrodepacientes')
});

router.get("/cadastrodemedicos", function(req, res, next){
  res.render('cadastrodemedicos')
});

router.get('/pacientes', function(req, res, next){
  res.render('pacientes')
});

router.get('/medicos', function(req, res, next){
  res.render('medicos')
});

router.get('/consultas', function(req, res, next){
  res.render('consultas')
});
module.exports = router;
