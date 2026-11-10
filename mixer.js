// Both sources reach the same recording input. Only music is locally monitored.
export class StudioMixer {
 constructor(context,microphone,capture,element){
  this.context=context;this.element=element;this.micLevel=1;this.musicLevel=.6;this.muted=false;this.duck=false;this.speaking=false;this.voiceUntil=0;
  this.mic=context.createGain();this.music=context.createGain();this.fade=context.createGain();this.monitor=context.createGain();this.bus=context.createGain();this.limiter=context.createDynamicsCompressor();
  this.limiter.threshold.value=-6;this.limiter.knee.value=6;this.limiter.ratio.value=12;this.limiter.attack.value=.003;this.limiter.release.value=.2;
  this.bus.channelCount=1;this.bus.channelCountMode='explicit';
  this.microphoneSource=context.createMediaStreamSource(microphone);this.musicSource=context.createMediaElementSource(element);
  this.microphoneSource.connect(this.mic);this.mic.connect(this.bus);this.musicSource.connect(this.music);this.music.connect(this.fade);this.fade.connect(this.bus);
  this.bus.connect(this.limiter);this.limiter.connect(capture);
  this.fade.connect(this.monitor);this.monitor.connect(context.destination);this.monitor.gain.value=0;this.update();
  this.meters=[];if(context.createAnalyser){for(const source of [this.microphoneSource,this.fade,this.limiter]){const analyser=context.createAnalyser();analyser.fftSize=512;source.connect(analyser);this.meters.push({node:analyser,data:new Float32Array(512)})}}
 }
 update(){const t=this.context.currentTime;this.mic.gain.setTargetAtTime(this.muted?0:this.micLevel,t,.03);this.music.gain.setTargetAtTime(this.musicLevel*(this.duck&&this.speaking&&!this.muted?.25:1),t,.12)}
 setSpeaking(value){if(this.speaking===value)return;this.speaking=value;this.update()}
 levels(){const levels=this.meters.map(({node,data})=>{node.getFloatTimeDomainData(data);let sum=0,peak=0;for(const value of data){sum+=value*value;peak=Math.max(peak,Math.abs(value))}return{rms:Math.sqrt(sum/data.length),peak}});if(levels[0]){if(levels[0].rms>.025&&!this.muted)this.voiceUntil=this.context.currentTime+.6;this.setSpeaking(this.context.currentTime<this.voiceUntil)}return levels}
 setMic(level,muted=this.muted){this.micLevel=level;this.muted=muted;this.update()}
 setMusic(level){this.musicLevel=level;this.update()}
 setDuck(enabled){this.duck=enabled;this.update()}
 setMonitor(enabled){this.monitor.gain.setTargetAtTime(enabled?1:0,this.context.currentTime,.03)}
 cancelFade(){clearTimeout(this.fadeTimer);this.fadeGeneration=(this.fadeGeneration||0)+1;this.fadeResolve?.();this.fadeResolve=null}
 async play(){this.cancelFade();this.fade.gain.setTargetAtTime(1,this.context.currentTime,.05);await this.context.resume();await this.element.play()}
 async fadePause(restart=false){this.cancelFade();const generation=this.fadeGeneration;this.fade.gain.setTargetAtTime(0,this.context.currentTime,.08);await new Promise(resolve=>{this.fadeResolve=resolve;this.fadeTimer=setTimeout(resolve,300)});if(generation!==this.fadeGeneration)return;this.fadeResolve=null;this.pause();if(restart)this.element.currentTime=0;this.fade.gain.setTargetAtTime(1,this.context.currentTime,.05)}
 pause(){this.element.pause()}
 stop(){this.pause();this.element.currentTime=0}
 close(){this.cancelFade();this.stop();for(const node of [this.microphoneSource,this.musicSource,this.mic,this.music,this.fade,this.bus,this.limiter,this.monitor,...this.meters.map(m=>m.node)])node.disconnect();this.element.removeAttribute('src');this.element.load()}
}
