
(function makeTicks(){
  const ticks = document.getElementById('ticks');
  for(let i=0;i<60;i++){
    const t = document.createElement('div');
    t.className = 'tick ' + ((i%5===0)?'hour':'min');
    t.style.transform = `translateX(-50%) rotate(${i*6}deg) translateY(-100%)`;
    ticks.appendChild(t);
  }
})();

const hourHand = document.getElementById('hourHand');
const minHand = document.getElementById('minHand');
const secHand = document.getElementById('secHand');
const timeText = document.getElementById('timeText');
const dateText = document.getElementById('dateText');

const pad = n => n.toString().padStart(2,'0');

function updateHands(now){
  const ms = now.getMilliseconds();
  const sec = now.getSeconds() + ms/1000;
  const min = now.getMinutes() + sec/60;
  const hrs = (now.getHours() % 12) + min/60;

  secHand.style.transform = `translate(-50%,-100%) rotate(${sec*6}deg)`;
  minHand.style.transform = `translate(-50%,-100%) rotate(${min*6}deg)`;
  hourHand.style.transform = `translate(-50%,-100%) rotate(${hrs*30}deg)`;
}

function updateText(now){
  const h = pad(now.getHours());
  const m = pad(now.getMinutes());
  const s = pad(now.getSeconds());
  timeText.textContent = `${h}:${m}:${s}`;

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  dateText.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

function loop(){
  const now = new Date();
  updateHands(now);
  if(!loop._lastSecond || loop._lastSecond !== now.getSeconds()){
    updateText(now);
    loop._lastSecond = now.getSeconds();
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
