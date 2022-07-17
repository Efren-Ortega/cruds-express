const _model = require('../models/crud_model.js')
const {unlink} = require('node:fs')

module.exports = {
    selectpeople:function(req, res){

        _model.methods.selectAll()
        .then(rows=>{
            console.log(rows.rows)
            return res.send({
                'Success':true,
                'message':'Los datos fueron obtenidos',
                'response':rows.rows
            })
        })
        .catch(err=>{
            return res.send({
                'Success':false,
                'message':'No se pudieron obtener los datos'
            })
        })
    },

    deletePeople:function(req,  res){
        let id = req.params.id;
        let nameImage = req.body.image

        _model.methods.deletePerson(id)
        .then(result=>{

            unlink(`uploads/${nameImage}`, (err)=>{
                if(err) return err;
            })

            return res.send({
                'success':true,
                'message':'Registro Eliminado',
            })
        })
        .catch(err=>{
            return res.send({
                'success':false,
                'message':'Registro No pudo ser Eliminado',
            })
        })
    },
    
    insertPerson:function(req, res){
        let data = {
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            telefono:req.body.telefono,
            Image: req.body.newNameImage
        };
        _model.methods.insertPersona(data)
        .then(()=>{
            return res.send({
                'status':true,
                'message':'Resgistro Actualizado'
            })
        })
        .catch(err=>{
            console.log(err)
            return res.send({
                'status':false,
                'message':'Resgistro Actualizado'
            })
        })

    },

    selectPerson:function(req, res){
        
        _model.methods.selectPerson(req.params.id)
        .then(row=>{
            return res.send({
                'Success':true,
                'Message' : 'Datos seleccionados',
                'Response':row.rows
            })
        })
        .catch(err=>{
            console.log(err)
            return res.send({
                'Success':false,
                'Message' : 'No se pudo seleccionar el registro',
            })
        })
    },

    uploadPerson:function(req, res){
        
        let data = {
            Nombre : req.body.nombre,
            Apellido : req.body.apellido,
            Telefono : req.body.telefono,
            Image : req.body.newNameImage,
            oldImage : req.body.actualImage
        }
        _model.methods.updatePerson(data, req.params.id)
        .then(()=>{

            //Eliminar la imagen anterior para actualizarla con la nueva
            unlink(`uploads/${data.oldImage}`, (err)=>{
                if(err) return err;
                
                console.log("Eliminado")
            })

            return res.send({
                'Success':true,
                'Message':'Registro Actualizado',
            })
        })
        .catch((err)=>{
            return res.send({
                'Success':false,
                'Message':'Error Registro No Actualizado'
            })
        })
    },

//  Es necesario instalar express-fileupload https://www.npmjs.com/package/express-fileupload
    uploadImg:function(req, res){

        const archivo = req.files.file
        const newNameImage = req.body.newNameImage;
        const urlUpload = __dirname + '/../uploads/' + newNameImage;


        archivo.mv(urlUpload, (err)=>{
            if(err){
                return res.send({
                    'success':false,
                    'message': 'Error al subir la imagen'
                })
            }else{
                return res.send({
                    'success':true,
                    'message': 'La imagen se ha subido al servidor'
                })
            }
        })
    }


}