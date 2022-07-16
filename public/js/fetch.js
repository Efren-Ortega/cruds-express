

export default function fetchAJAX(parametros){

    let {url, settings, resSuccess, resError} = parametros;

    fetch(url, settings)
    .then(res=>res.ok?res.json():Promise.reject(res))
    .then(json=>{
        resSuccess(json)
    })
    .catch(err=>{
        resError(err)
    })

}