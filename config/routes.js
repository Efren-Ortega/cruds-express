const express = require('express')
const {selectpeople, deletePeople, insertPerson, selectPerson, uploadPerson} = require('../controllers/crud_controller.js')

const Router = express.Router();

//MIS RUTAS

Router.get('/selectpeople', selectpeople);
Router.delete('/deletepeople/:id', deletePeople)
Router.post('/insertperson', insertPerson)
Router.get('/selectperson/:id', selectPerson)
Router.put('/uploadperson/:id', uploadPerson)

module.exports = Router;
