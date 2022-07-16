import fetchAJAX from './fetch.js'
import cargarTable from './cargar_tabla.js'

export default function insertPerson(){

    const $BTN_INSERT = document.getElementById('btn-insert'),
          $FORM = document.getElementById('form'),
          $FORM_ACTION = document.getElementById('form-action')
    
    let data

    document.addEventListener('click', e=>{
        if(e.target===$BTN_INSERT){
            if($BTN_INSERT.textContent === 'New +'){
                $FORM.classList.replace('hidden', 'visible')
                $BTN_INSERT.textContent = 'Cancelar'
            }else if($BTN_INSERT.textContent === 'Cancelar'){
                $FORM.classList.replace('visible', 'hidden')
                $BTN_INSERT.textContent = 'New +'
            }
        }
    })

    document.addEventListener('submit', e=>{
        if(e.target === $FORM_ACTION){
            e.preventDefault()

            data = {
                nombre:document.getElementById('name').value,
                apellido : document.getElementById('last').value,
                telefono : document.getElementById('number').value
            }

            //let {url, settings, resSuccess, resError} = parametros;

            const settings = {
                url : 'http://localhost:3000/insertperson',
                settings : {
                    method:'POST', 
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify(data)
                },
                resSuccess : (json)=>{
                    $FORM_ACTION.reset()
                    $FORM.classList.replace('visible', 'hidden')
                    $BTN_INSERT.textContent = 'New +'
                    cargarTable();
                },
                resError:(err)=>{
                    console.log(err)
                }
            }

            fetchAJAX(settings)



        }
    })

}