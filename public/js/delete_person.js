import fetchAJAX from './fetch.js'
import cargarTabla from './cargar_tabla.js';

export default function deletePerson(){
    let id;

    document.addEventListener('click', e=>{
        if(e.target.matches(`.icon-delete *`) || e.target.matches(`.icon-delete`)){
            id = e.target.dataset.id;
            const settings = {
                url:`http://localhost:3000/deletepeople/${id}`,
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