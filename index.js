const express = require('express')
const bodyParser = require('body-parser')
const BD = require('./models/conexion_postgresql.js')

const app = express();

//Para poder leer el json retornado por una petición
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//PRUEBA DE CONEXIÓN A LA BASE DE DATOS
app.use('/testBD', (req, res)=>{
        BD.query('SELECT *FROM persona')
        .then(rows=>{
            res.send(rows.rows)
        })
        .catch(err=>{
            res.send({
                'success':false,
            })
        })
})

//Establecer una ruta estatica
app.use(express.static(__dirname+'/public'));



//Iniciando servidor
app.listen(3000, ()=>{
    console.log('Escuchando en el pueto 3000')
})