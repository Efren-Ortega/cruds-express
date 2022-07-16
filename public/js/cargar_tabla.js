import fetchAJAX from './fetch.js'  

export default function cargarTabla(){

    const $fragment = document.createDocumentFragment(),
          $template = document.getElementById('table-row').content,
          $tbody = document.getElementById('table')
    
    let $cloneTemplate = null
    $tbody.textContent = '';

    const getPeople = {
        url:'http://192.168.1.67:3000/selectpeople',
        settings:{
            method:'GET',
        },
        resSuccess:(json)=>{
            Array.from(json.response).forEach(el=>{
                console.log(el)
                $template.getElementById('id').textContent = el.id
                $template.getElementById('name').textContent = el.nombre,
                $template.getElementById('last').textContent = el.apellido,
                $template.getElementById('number').textContent = el.telefono

                $template.querySelector('[data-delete]').dataset.id = el.id

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