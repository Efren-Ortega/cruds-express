import fetchAJAX from './fetch.js'
import cargarTable from './cargar_tabla.js'

export default function insertPerson(){

    const $BTN_INSERT = document.getElementById('btn-insert'),
          $FORM = document.getElementById('form'),
          $FORM_ACTION = document.getElementById('form-action'),
          $FILE = document.getElementById('image')
    let data, $INPUT_HIDDEN = document.getElementById('idPerson')

    document.addEventListener('click', e=>{
        if(e.target===$BTN_INSERT){
            if($BTN_INSERT.textContent === 'New +'){
                $FORM.classList.replace('hidden', 'visible')
                $BTN_INSERT.textContent = 'Cancelar'
            }else if($BTN_INSERT.textContent === 'Cancelar'){
                $FORM_ACTION.reset()
                $FORM.classList.replace('visible', 'hidden')
                $BTN_INSERT.textContent = 'New +'
                $INPUT_HIDDEN.value=""
            }
        }
    })

    document.addEventListener('submit', e=>{
        if(e.target === $FORM_ACTION && $INPUT_HIDDEN.value === "" ){
            e.preventDefault()
            
        //  Estas 3 lineas son para poder asignarle un nombre nuevo a la imagen y
        //  evitar que las imagenes con el mismo nombre se remplacen en el servidor.
            const typeImg = $FILE.files[0].type;
            const timeStamp = (new Date().getTime().toString());
            const newNameImage = timeStamp+'.'+(typeImg.split('/'))[(typeImg.split('/').length)-1]
            
            data = {
                nombre:document.getElementById('name').value,
                apellido : document.getElementById('last').value,
                telefono : document.getElementById('number').value,
                newNameImage : newNameImage
            }

            let settings = {
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
    })

}