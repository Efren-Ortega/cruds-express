import fetchAJAX from './fetch.js'
import cargarTabla from './cargar_tabla.js';

export default function deletePerson(){
    let id;

    document.addEventListener('click', e=>{
        if(e.target.matches(`.icon-edit *`) || e.target.matches(`.icon-edit`)){
            id = document.querySelector('[data-id]').dataset.id;
            const settings = {
                url:`http://192.168.1.67:3000/deletepeople/${id}`,
                settings:{
                    'method':'DELETE'
                },
                resSuccess:(json)=>{
                    cargarTabla()
                },
                resError:(err)=>{
                    console.log(err)
                }
            }
            fetchAJAX(settings)
        }
    })

}