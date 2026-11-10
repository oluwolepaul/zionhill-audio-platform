// One native audio element stays mounted for foreground and background playback.
export class LivePlayer {
 constructor(audio,{onState=()=>{},isLive=async()=>true,schedule=(fn,ms)=>setTimeout(fn,ms),cancel=id=>clearTimeout(id)}={}){
  Object.assign(this,{audio,onState,isLive,schedule,cancel,id:null,state:'idle',intentionalPause:false,attempt:0,generation:0,timer:null,waiting:null});
  audio.addEventListener('playing',()=>{this.clearTimers();this.attempt=0;this.setState('playing')});
  audio.addEventListener('pause',()=>{if(!this.id)return;if(!audio.error&&!audio.ended&&!this.replacing){this.intentionalPause=true;this.clearTimers();this.setState('paused')}});
  audio.addEventListener('waiting',()=>{if(!this.id||this.intentionalPause)return;this.setState('connecting');this.cancel(this.waiting);this.waiting=this.schedule(()=>this.reconnect(),12000)});
  audio.addEventListener('error',()=>this.reconnect());audio.addEventListener('ended',()=>this.reconnect());
 }
 setState(state){this.state=state;this.onState(state,this.attempt)}
 clearTimers(){this.cancel(this.timer);this.cancel(this.waiting);this.timer=this.waiting=null}
 async start(id){this.close();this.id=id;this.intentionalPause=false;this.attempt=0;await this.connect()}
 async connect(){if(!this.id||this.intentionalPause)return;this.replacing=true;this.audio.src='/api/live/'+this.id+'?t='+Date.now();this.audio.playbackRate=1;this.setState(this.attempt?'reconnecting':'connecting');try{await this.audio.play()}catch(e){if(e.name==='NotAllowedError'){this.intentionalPause=true;this.setState('paused')}else this.reconnect()}finally{this.replacing=false}}
 async reconnect(){if(!this.id||this.intentionalPause||this.timer)return;this.cancel(this.waiting);const generation=this.generation,id=this.id;this.setState('reconnecting');let live=true;try{live=await this.isLive(id)}catch{}if(generation!==this.generation||this.intentionalPause)return;if(!live){this.clearTimers();this.setState('ended');return}if(this.attempt>=5){this.setState('error');return}const delay=[1000,2000,4000,8000,15000][this.attempt++];this.timer=this.schedule(()=>{this.timer=null;this.connect()},delay)}
 pause(){this.intentionalPause=true;this.clearTimers();this.audio.pause();this.setState('paused')}
 async resume(){this.intentionalPause=false;this.attempt=0;this.clearTimers();await this.connect()}
 close(){this.generation++;this.id=null;this.clearTimers();this.intentionalPause=true;this.audio.pause();this.audio.removeAttribute('src');this.audio.load();this.setState('idle')}
}
