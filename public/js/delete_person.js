import fetchAJAX from './fetch.js'
import cargarTabla from './cargar_tabla.js';

export default function deletePerson(){
    let id, image;

    document.addEventListener('click', e=>{
        if(e.target.matches(`.icon-delete *`) || e.target.matches(`.icon-delete`)){
            id = e.target.dataset.id;
            image = e.target.dataset.image

            const settings = {
                url:`http://localhost:3000/deletepeople/${id}`,
                settings:{
                    method:'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({image:image}),
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