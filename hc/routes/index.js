var express = require('express');
var router = express.Router();
var firebase = require('firebase');
const bodyParser = require('body-parser');

var firebaseConfig = {
  apiKey: "AIzaSyBwq9n3Ysyyish7_OeCALDvgK5XfKdq5-Y",
  authDomain: "healthcad.firebaseapp.com",
  databaseURL: "https://healthcad.firebaseio.com",
  projectId: "healthcad",
  storageBucket: "healthcad.appspot.com",
  messagingSenderId: "150066884660",
  appId: "1:150066884660:web:2d492b12e43e8705f89a61",
  measurementId: "G-0N1CDDF853"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


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
  getPacientes().then(pacientes =>{
    res.render('pacientes', {pacientes});
    });
});

router.get('/medicos', function(req, res, next){
  getMedicos().then(medicos => {
    res.render('medicos', {medicos})
  })
});

router.get('/consulta', function(req,res, next){
  res.render('consulta')
});


/*Métodos post*/
router.post("/cadastrodepacientes", function(req,res,next){
  var getBody = req.body;
  console.log(req.body.nomedopaciente);
  var paciente = {
    nome: getBody.nomedopaciente,
    nascimento: getBody.datadenascimento,
    cpf: getBody.cpf,
    tiposangue: getBody.tiposangue,
    tel: getBody.telefone,
    descricaopac: getBody.descricao
  };

  firebase.database()
  .ref()
  .child('pacientes').push(paciente)
  .then(function(firebaseDatabase){
    res.redirect('cadastrodepacientes')
  })
  .catch(function(error){
    alert("Não foi possivel cadastrar o paciente")
  });
});

router.post("/cadastrodemedicos", function(req,res,next){
  var getBody = req.body;
  console.log(req.body.crm);
  var medico = {
    nome: getBody.nomemedico,
    crm: getBody.crm,
    especialidade: getBody.selectespecialidade
  };

  firebase.database()
  .ref()
  .child('medicos').push(medico)
  .then(function(firebaseDatabase){
    res.redirect('cadastrodemedicos');
  })
  .catch(function(error){
    alert("Não foi possivel cadastrar o paciente")
  });
});

//router.get('/', function(req, res, next) {
//  getNoticias().then(noticia =>{
//    res.render('index', {noticia});
//  });
//});


function getPacientes(){
  const ref = firebase.database().ref('pacientes');
  return ref.once('value').then(snap => snap.val());
};

function getMedicos(){
  const ref = firebase.database().ref('medicos');
  return ref.once('value').then(snap => snap.val());
};


module.exports = router;
