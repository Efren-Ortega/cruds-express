const _model = require('../models/crud_model.js')

module.exports = {
    selectpeople:function(req, res){

        _model.methods.selectAll()
        .then(rows=>{
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
        _model.methods.deletePerson(id)
        .then(result=>{
            res.send({
                'success':true,
                'message':'Registro Eliminado',
            })
        })
        .catch(err=>{
            res.send({
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
            image:'null'
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

    }


}