const BD = require('./conexion_postgresql.js')

const callback = (err, rows, resolve, reject)=>{
    if(err) return reject(err);
    return resolve(rows);
}

module.exports = {

    methods:{
        selectAll:function(){
            return new Promise((resolve, reject)=>{
                BD.query('SELECT *FROM persona', (err, rows)=>{
                    callback(err, rows, resolve, reject)
                })
            })
        }
    }
}