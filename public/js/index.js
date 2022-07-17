
import cargarTabla from './cargar_tabla.js'
import deletePerson from './delete_person.js'
import insertPerson from './insert_persona.js'
import uploadPerson from './upload_person.js'

document.addEventListener('DOMContentLoaded', e=>{
    cargarTabla()
})

insertPerson();
deletePerson();
uploadPerson();

