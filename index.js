const express = require('express')
const bodyParser = require('body-parser')


const app = express();

//Para poder leer el json retornado por una petición
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


//Establecer una ruta estatica
app.use(express.static(__dirname+'/public'));



//Iniciando servidor
app.listen(3000, ()=>{
    console.log('Escuchando en el pueto 3000')
})