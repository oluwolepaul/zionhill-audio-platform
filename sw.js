// Host pages, account responses and audio are deliberately never cached.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{if(event.request.mode!=='navigate'||new URL(event.request.url).pathname==='/studio')return;event.respondWith(fetch(event.request).catch(()=>new Response('<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Zionhill Playstation</title><body style="background:#522312;color:white;font:18px Arial;padding:40px"><h1>You’re offline</h1><p>Reconnect to listen to Zionhill Playstation.</p><button onclick="location.reload()">Try again</button>',{headers:{'Content-Type':'text/html; charset=utf-8'}})))});
