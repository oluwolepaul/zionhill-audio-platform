// Keep encoding continuous while amortizing slow storage requests over several seconds.
export const audioBytesPerSecond=quality=>quality==='music'?16000:8000;
export const queuedAudioSeconds=(queue,quality)=>queue.reduce((bytes,p)=>bytes+p.byteLength,0)/audioBytesPerSecond(quality);
export function audioBatch(queue,maxBytes=512*1024){let bytes=0,count=0;for(const packet of queue){if(count&&bytes+packet.byteLength>maxBytes)break;bytes+=packet.byteLength;count++}const body=new Uint8Array(bytes);let offset=0;for(let i=0;i<count;i++){body.set(queue[i],offset);offset+=queue[i].byteLength}return{body,count}}
