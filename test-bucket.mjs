export class Bucket{
 data=new Map();versions=new Map();reads=0;delay=0;
 async put(key,value,options={}){const version=this.versions.get(key),condition=options.onlyIf;if(condition?.etagMatches&&condition.etagMatches!==version)return null;if(condition?.etagDoesNotMatch==='*'&&this.data.has(key))return null;this.data.set(key,typeof value==='string'?new TextEncoder().encode(value):new Uint8Array(value));const etag=crypto.randomUUID();this.versions.set(key,etag);return{etag}}
 async get(key,options){this.reads++;if(this.delay)await new Promise(r=>setTimeout(r,this.delay));let value=this.data.get(key);if(!value)return null;const etag=this.versions.get(key);if(options?.range)value=value.slice(options.range.offset,options.range.offset+options.range.length);let used=false;return{etag,json:async()=>{if(used)throw Error('Body already used');used=true;return JSON.parse(new TextDecoder().decode(value))},body:new Blob([value]).stream()}}
 async delete(keys){for(const key of Array.isArray(keys)?keys:[keys]){this.data.delete(key);this.versions.delete(key)}}
 async list({prefix}){return{objects:[...this.data.keys()].filter(key=>key.startsWith(prefix)).map(key=>({key})),truncated:false}}
}
