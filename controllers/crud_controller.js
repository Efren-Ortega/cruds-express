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
    }
}