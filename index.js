const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./config/routes.js')

const app = express();

//Para poder leer el json retornado por una petición
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use('/', routes)

//Establecer una ruta estatica
app.use(express.static(__dirname+'/public'));



//Iniciando servidor
app.listen(3000, ()=>{
    console.log('Escuchando en el pueto 3000')
})