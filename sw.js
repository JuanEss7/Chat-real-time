self.addEventListener("install",()=>{
    console.log("service worker instalado")
})
self.addEventListener("activate",()=>{
    console.log("service worker activado")
})
self.addEventListener("message",(e)=>{
    e.source.postMessage(e.data)
})