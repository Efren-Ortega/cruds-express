import fetchAJAX from './fetch.js'
import cargarTabla from './cargar_tabla.js'

export default function (){

    const $BTN_INSERT = document.getElementById('btn-insert'),
          $FORM = document.getElementById('form'),
          $FORM_ACTION = document.getElementById('form-action')
          
    let id, settings, $INPUT_HIDDEN = document.getElementById('idPerson');

    document.addEventListener('click',e=>{
        if(e.target.matches('.icon-edit *')  || e.target.matches('.icon-edit')){

            id = e.target.dataset.id
            console.log(id)

            if($BTN_INSERT.textContent === 'New +'){
                $FORM.classList.replace('hidden', 'visible')
                $BTN_INSERT.textContent = 'Cancelar'
            }

            settings = {
                url:`http://localhost:3000/selectperson/${id}`,
                settings : {
                    method : 'GET'
                },
                resSuccess :(json)=>{
                    console.log(json)

                    Array.from(json.Response).forEach(el =>{
                        document.getElementById('name').value = el.nombre,
                        document.getElementById('last').value = el.apellido,
                        document.getElementById('number').value = el.telefono
                        $INPUT_HIDDEN.value = id
                    })
                },
                resError : (err)=>{
                    console.log(err)
                }
            }

            fetchAJAX(settings)

        }
    })


    document.addEventListener('submit', e=>{
        if(e.target === $FORM_ACTION){
            e.preventDefault()
            if($INPUT_HIDDEN.value !== ""){
                console.log("Hola")
                let data = {
                    nombre:document.getElementById('name').value,
                    apellido : document.getElementById('last').value,
                    telefono : document.getElementById('number').value
                }

                settings={
                    url : `http://localhost:3000/uploadperson/${$INPUT_HIDDEN.value}`,
                    settings : {
                        method : 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body : JSON.stringify(data)
                    },
                    resSuccess:()=>{
                        $INPUT_HIDDEN.value=""
                        $BTN_INSERT.textContent = 'New +'
                        $FORM.classList.replace('visible', 'hidden')
                        e.target.reset();
                        cargarTabla();
                    },
                    resError:(err)=>{
                        console.log(err)
                    }
                }

                fetchAJAX(settings)

            }
        }
    })

}