const CACHE='flight-games-v2';
const FILES=['./','./index.html','./manifest.json','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./coin-dash/','./coin-dash/index.html','./crown-survivors/','./crown-survivors/index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='status')caches.open(CACHE).then(async c=>{const ok=(await Promise.all(FILES.map(f=>c.match(f)))).every(Boolean);e.source.postMessage({ready:ok})})});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{const net=fetch(e.request).then(res=>{if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return res}).catch(()=>r);return r||net}))});
