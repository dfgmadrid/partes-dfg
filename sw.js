/* App desactivada: este service worker borra la copia guardada y se elimina a sí mismo. */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys())await caches.delete(k);
  await self.registration.unregister();
  for(const c of await self.clients.matchAll({type:"window"}))try{c.navigate(c.url)}catch(err){}
})())});
