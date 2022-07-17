import fetchAJAX from './fetch.js'
import cargarTabla from './cargar_tabla.js'
import {signalToValidation} from './validations_tailwind.js'

export default function (){

    const $BTN_INSERT = document.getElementById('btn-insert'),
          $FORM = document.getElementById('form'),
          $FORM_ACTION = document.getElementById('form-action'),
          $FILE = document.getElementById('image')

    let id, image, settings, $INPUT_HIDDEN = document.getElementById('idPerson');

    document.addEventListener('click',e=>{
        if(e.target.matches('.icon-edit *')  || e.target.matches('.icon-edit')){

            id = e.target.dataset.id
            image = e.target.dataset.image

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
                        document.getElementById('name').value = el.nombre
                        document.getElementById('last').value = el.apellido
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
        e.preventDefault()

        if(e.target === $FORM_ACTION && $INPUT_HIDDEN.value !== "" && signalToValidation === true){

            const typeImg = $FILE.files[0].type;

            const timeStamp = (new Date().getTime().toString());
            const newNameImage = timeStamp+'.'+(typeImg.split('/'))[(typeImg.split('/').length)-1]


            if($INPUT_HIDDEN.value !== ""){

                let data = {
                    nombre:document.getElementById('name').value,
                    apellido : document.getElementById('last').value,
                    telefono : document.getElementById('number').value,
                    newNameImage : newNameImage,
                    actualImage : image
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


                const formData = new FormData()
                formData.append('file', $FILE.files[0])
                formData.append('newNameImage', newNameImage)
                
                settings = {
                    url : 'http://localhost:3000/uploadimg',
                    settings : {
                        method:'POST', 
                        body : formData
                    },
                    resSuccess : (json)=>{
    
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