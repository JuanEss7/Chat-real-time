let btn_enviar = document.querySelector(".btn-enviar");
let cont_mensajes = document.querySelector(".mensajes");
let id = 0 + localStorage.length;
addEventListener("load",()=>localStorage.clear())
if(navigator.serviceWorker){
    navigator.serviceWorker.register("./sw.js");
}
btn_enviar.addEventListener("click",enviarMensaje)
function enviarMensaje (){
    let input = document.querySelector(".input");
    let mensaje = input.value;
    if(mensaje.length > 0){
        navigator.serviceWorker.ready.then(sw =>{
            sw.active.postMessage(mensaje)
        })
        cont_mensajes.innerHTML += agregarMensaje({msj:mensaje,clase:"enviado"});
    }
    input.value = "";
}
function agregarMensaje (obj){
    let{msj,clase} = obj;
    return `<div class="mensaje ${clase}">
                <p>${msj}</p>
        </div>`
}
addEventListener("storage",()=>{
    let key = localStorage.length -1;
    let mjs = localStorage.getItem(key);
    cont_mensajes.innerHTML += agregarMensaje({msj:mjs,clase:"recibido"});
})
navigator.serviceWorker.addEventListener("message",(e)=>{
    localStorage.setItem(id,e.data);
})