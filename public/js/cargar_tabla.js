import fetchAJAX from './fetch.js'  

export default function cargarTabla(){

    const $fragment = document.createDocumentFragment(),
          $tamplate = document.getElementById('table-row').content,
          $tbody = document.getElementById('table')

    let $cloneTemplate = null

    const getPeople = {
        url:'http://192.168.1.67:3000/selectpeople',
        settings:{
            method:'GET',
        },
        resSuccess:(json)=>{
            Array.from(json.response).forEach(el=>{
                console.log(el)
                $tamplate.getElementById('id').textContent = el.id

                $cloneTemplate = $tamplate.cloneNode(true);
            })

            $tbody.appendChild($cloneTemplate)
        },
        resError:(err)=>{
            console.log(err)
        }
    }

    fetchAJAX(getPeople)

}