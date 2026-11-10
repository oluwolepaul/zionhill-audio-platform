export class PlaylistStore {
 async database(){return new Promise((resolve,reject)=>{if(!globalThis.indexedDB)return reject(Error('This browser does not support saving playlists.'));const request=indexedDB.open('zionhill-device-playlist',1);request.onupgradeneeded=()=>request.result.createObjectStore('playlist');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
 async transaction(mode,operation){const db=await this.database();try{return await new Promise((resolve,reject)=>{const tx=db.transaction('playlist',mode),request=operation(tx.objectStore('playlist'));tx.oncomplete=()=>resolve(request.result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Storage could not be completed.'))})}finally{db.close()}}
 async save(tracks){if(tracks.reduce((n,t)=>n+t.file.size,0)>100*1024*1024)throw Error('Keep a saved device playlist under 100 MB.');return this.transaction('readwrite',store=>store.put(tracks.map(t=>({name:t.name,file:t.file})),'tracks'))}
 async load(){return await this.transaction('readonly',store=>store.get('tracks'))||[]}
 async clear(){return this.transaction('readwrite',store=>store.delete('tracks'))}
}
