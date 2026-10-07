/* Parte Maquinaria DFG: guarda la app para abrirla sin cobertura. Siempre intenta la versión nueva primero. */
const C="partes-dfg-v1";
const FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-180.png",
 "./jspdf.min.js",
 "./jspdf.autotable.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(FILES.map(u=>c.add(u).catch(()=>{}))))
  .then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  const net=new Promise((ok,ko)=>{const t=setTimeout(ko,5000);fetch(r).then(res=>{clearTimeout(t);
    if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}ok(res)},err=>{clearTimeout(t);ko(err)})});
  e.respondWith(net.catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("./index.html"):Response.error()))))});
