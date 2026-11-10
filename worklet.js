class Capture extends AudioWorkletProcessor {
 constructor(options={}){super();this.rate=options.processorOptions?.sampleRate===32000?32000:16000;this.buffer=new Int16Array(this.rate);this.mode='off';this.pos=0;this.phase=0;this.sum=0;this.n=0;this.port.onmessage=e=>{if(e.data==='flush'){this.send(true);this.mode='off'}else if(e.data?.type==='capture'){this.pos=this.phase=this.sum=this.n=0;this.mode=e.data.mode}}}
 send(final=false){if(this.pos){const data=this.buffer.slice(0,this.pos);this.port.postMessage({data,final,mode:this.mode},[data.buffer]);this.pos=0}else if(final)this.port.postMessage({final:true,mode:this.mode})}
 process(inputs){if(this.mode==='off')return true;const channel=inputs[0]?.[0];if(channel)for(const v of channel){this.sum+=v;this.n++;this.phase+=this.rate;if(this.phase>=sampleRate){this.phase-=sampleRate;const value=Math.max(-1,Math.min(1,this.sum/this.n));this.buffer[this.pos++]=value<0?value*32768:value*32767;this.sum=0;this.n=0;if(this.pos===this.buffer.length)this.send()}}return true}
}
registerProcessor('zion-capture',Capture);
