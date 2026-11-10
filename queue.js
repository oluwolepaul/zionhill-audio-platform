// Tracks are device-local. Enqueue never reloads an existing playback element.
export class MusicQueue {
 constructor(urls=URL){this.urls=urls;this.current=null;this.upcoming=[];this.nextId=0;this.element=null;this.loop=false}
 attach(element){this.element=element;element.loop=this.loop;if(this.current){element.src=this.current.url;element.load()}}
 enqueue(files){const added=[];for(const file of files){const track={id:++this.nextId,name:file.name,file,url:this.urls.createObjectURL(file)};added.push(track);if(!this.current){this.current=track;if(this.element){this.element.src=track.url;this.element.load()}}else this.upcoming.push(track)}return added}
 select(id){const i=this.upcoming.findIndex(t=>t.id===id);if(i<0)return null;const track=this.upcoming.splice(i,1)[0],old=this.current;this.element?.pause();this.current=track;if(this.element){this.element.src=track.url;this.element.load()}if(old)this.urls.revokeObjectURL(old.url);return track}
 remove(id){const i=this.upcoming.findIndex(t=>t.id===id);if(i<0)return false;const [track]=this.upcoming.splice(i,1);this.urls.revokeObjectURL(track.url);return true}
 move(id,direction){const index=this.upcoming.findIndex(t=>t.id===id),to=index+direction;if(index<0||to<0||to>=this.upcoming.length)return false;[this.upcoming[index],this.upcoming[to]]=[this.upcoming[to],this.upcoming[index]];return true}
 setLoop(enabled){this.loop=!!enabled;if(this.element)this.element.loop=this.loop}
 seek(seconds){if(!this.element||!Number.isFinite(seconds)||!Number.isFinite(this.element.duration)||this.element.duration<=0)return;this.element.currentTime=Math.max(0,Math.min(seconds,this.element.duration))}
 restart(){if(this.element)this.element.currentTime=0}
 detach(){this.element=null}
 dispose(){this.element?.pause();this.element?.removeAttribute('src');this.element?.load();for(const track of [this.current,...this.upcoming])if(track)this.urls.revokeObjectURL(track.url);this.current=null;this.upcoming=[];this.element=null}
}
