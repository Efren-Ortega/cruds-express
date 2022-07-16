
import cargarTabla from './cargar_tabla.js'
import deletePerson from './delete_person.js'
import insertPerson from './insert_persona.js'


document.addEventListener('DOMContentLoaded', e=>{
    cargarTabla()
})


deletePerson();
insertPerson();