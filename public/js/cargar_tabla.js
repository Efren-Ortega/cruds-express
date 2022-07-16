import fetchAJAX from './fetch.js'  

export default function cargarTabla(){
    document.getElementById('table').textContent = ''
    const $fragment = document.createDocumentFragment(),
          $template = document.getElementById('table-row').content,
          $tbody = document.getElementById('table');
    
    let $cloneTemplate = null

    const getPeople = {
        url:'http://localhost:3000/selectpeople',
        settings:{
            method:'GET',
        },
        resSuccess:(json)=>{
            Array.from(json.response).forEach(el=>{
                $template.getElementById('id').textContent = el.id
                $template.getElementById('name').textContent = el.nombre,
                $template.getElementById('last').textContent = el.apellido,
                $template.getElementById('number').textContent = el.telefono

                $template.querySelectorAll('[data-delete]').forEach(element=>{element.dataset.id = el.id})
                $template.querySelectorAll('[data-edit]').forEach(element=>{element.dataset.id = el.id})

                $cloneTemplate = $template.cloneNode(true);
                $fragment.appendChild($cloneTemplate)
            })

            $tbody.appendChild($fragment)
        },
        resError:(err)=>{
            console.log(err)
        }
    }

    fetchAJAX(getPeople)

}