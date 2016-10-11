// Main file
// Imports
const express = require('express');
const bodyParser = require('body-parser');

const port = 3001;

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
var users = [];
var user = require('./models/models.js');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

// Escolher o render engine, surpreendentemente não é é preciso um require
app.set('views','./views')
app.set('view engine','pug')
// Router para api

router.use(function (req,res,next){
    console.log('middleware api')
    next();
})

router.get('/',(req,res)=>{
    user.find((err,users)=>{
        if(err){
            res.send("Erro a encontrar users")
        }
        console.log(users)
        res.render('listaUsers',{users:users})
    })
})

router.post('/',(req,res)=>{
    var newUser = new user();
    newUser.name=req.body.name;
    newUser.age =req.body.age;
    newUser.save(err =>{
        if(err){
            console.log(err);
            res.send("Failed! with :"+err)
        }
    })
    res.render('userCreationSuccess',newUser)
})

router.route('/:id')
    .get((req,res)=>{
        user.findById(req.params.id,(err,foundUser)=>{
            if(err){
                res.send("Erro na ligação à base de dados" + err)
            }
            res.render('listaUsers',{users : [foundUser]})
        })
    })
    .put(function (req,res){
        user.findById(req.params.id,(err,foundUser)=>{
            foundUser.name=req.body.name;
            foundUser.age=req.body.age;
            foundUser.save(err=>{
                if(err){
                    res.send(err)
                }
                res.send("User modificado com sucesso")
            })
        })
    })
app.use('/api',router)




// Rencaminha o index
app.get('/',function (req,res){

    res.render('index',{title:"Título",Body: "Sucesso"})
})


// Inicia o servidor
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log('listening')
})
