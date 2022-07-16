const express = require('express')
const {selectpeople} = require('../controllers/crud_controller.js')

const Router = express.Router();

//MIS RUTAS

Router.get('/selectpeople', selectpeople);


module.exports = Router;
