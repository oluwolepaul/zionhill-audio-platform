// Local layout fixture only. It never captures audio or calls a broadcast endpoint.
import {iconLabel,flatIcon} from '/ui-icons.js';
const $=id=>document.getElementById(id);document.title='Live studio layout preview';document.body.classList.add('studio-mode','on-air');
$('publicView').hidden=true;$('studioView').hidden=false;$('loginPanel').hidden=true;$('broadcastPanel').hidden=false;$('recordingManager').hidden=false;$('channelSettings').hidden=false;
$('onAir').hidden=false;$('startButton').hidden=true;$('muteButton').hidden=false;$('endButton').hidden=false;$('compactBroadcastTitle').textContent='Sunday Worship and Thanksgiving Service';$('elapsed').textContent='03:42';$('compactOutputMeter').value=.42;
$('broadcastDetails').open=false;$('advancedMixer').open=true;$('meetingTitle').value='Sunday Worship and Thanksgiving Service';$('meetingSpeaker').value='Zionhill Global';$('meetingDescription').value='A service of worship and encouragement.';for(const id of ['meetingTitle','meetingSpeaker','meetingDescription'])$(id).disabled=true;
$('musicStrip').classList.add('has-track');$('musicTrack').textContent='Now selected · Morning Worship.mp3';$('musicProgress').textContent='02:14 / 05:20';$('musicSeek').max=320;$('musicSeek').value=134;$('musicSeek').disabled=false;$('micIndicator').textContent='Mic · Live';$('musicIndicator').textContent='Music · Live';$('uploadIndicator').textContent='Uploads · ✓';
for(const id of ['playMusic','stopMusic','restartMusic','micLevel','musicLevel','musicDuck','musicMonitor','musicOnly','musicVoice','voiceOnly','loopMusic'])$(id).disabled=false;
iconLabel($('muteButton'),'mic-off','Mute mic');iconLabel($('playMusic'),'pause','Pause');iconLabel($('toggleQueue'),'headphones','Queue (2)');iconLabel($('toggleSoundControls'),'waveform','More');$('queueCount').textContent='2';$('queueEmpty').hidden=true;
$('musicQueue').innerHTML=['Evening Praise.mp3','Instrumental Worship.mp3'].map((name,i)=>'<li class="queued-track"><span>'+name+'</span><button>'+flatIcon('play')+' Play</button><button aria-label="Move up">'+flatIcon('up')+'</button><button aria-label="Remove">'+flatIcon('close')+'</button></li>').join('');
let more=false,queue=false,muted=false,playing=true;
$('toggleSoundControls').onclick=()=>{more=!more;document.body.classList.toggle('live-expanded',more);$('toggleSoundControls').setAttribute('aria-expanded',String(more));iconLabel($('toggleSoundControls'),'waveform',more?'Less':'More')};
$('toggleQueue').onclick=()=>{queue=!queue;document.body.classList.toggle('show-music-queue',queue);$('toggleQueue').setAttribute('aria-expanded',String(queue))};
$('muteButton').onclick=()=>{muted=!muted;iconLabel($('muteButton'),muted?'mic':'mic-off',muted?'Unmute':'Mute mic');$('micIndicator').textContent=muted?'Mic · Muted':'Mic · Live'};
$('playMusic').onclick=()=>{playing=!playing;iconLabel($('playMusic'),playing?'pause':'play',playing?'Pause':'Play');$('musicIndicator').textContent=playing?'Music · Live':'Music · Off'};
$('endButton').onclick=()=>alert('Layout preview only. No broadcast is running.');
document.querySelector('.brand small').textContent='LOCAL LAYOUT PREVIEW';
