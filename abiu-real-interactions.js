/* Real-behavior interactions based on user's 阿 biu footage: approaching, head-bunting and petting. */
(()=>{'use strict';
const style=document.createElement('style');style.textContent=`
.room{touch-action:pan-y}.room .scene{transform-origin:50% 60%}
.room.abiu-nuzzling .scene{animation:abiu-real-nuzzle .8s ease-in-out!important}
.room.abiu-greeting .scene{animation:abiu-real-greet 1.15s ease-out!important}
@keyframes abiu-real-nuzzle{0%,100%{transform:scale(1)}35%{transform:scale(1.045) translate(-7px,-5px) rotate(-1deg)}70%{transform:scale(1.035) translate(7px,-2px) rotate(1deg)}}
@keyframes abiu-real-greet{0%{transform:scale(.92) translateY(18px);opacity:.65}65%{transform:scale(1.045) translateY(-7px);opacity:1}100%{transform:scale(1)}}
.abiu-touch-spark{position:absolute;z-index:4;pointer-events:none;font:26px Georgia,serif;color:#fff7d9;text-shadow:0 2px 8px #3c584c;animation:abiu-spark .85s ease-out forwards}
@keyframes abiu-spark{from{transform:translate(-50%,-50%) scale(.6);opacity:1}to{transform:translate(-50%,-115%) scale(1.5);opacity:0}}
.gameArea.abiu-hunt-active{background:linear-gradient(#e3eadc,#f5edda);overflow:hidden}
.abiu-hunt-cat{position:absolute;bottom:4px;left:20%;width:95px;height:95px;border-radius:50%;object-fit:cover;object-position:center;box-shadow:0 4px 14px #4e66564d;border:4px solid #f8f5e8;transition:left .28s ease,bottom .25s ease,transform .28s ease;pointer-events:none}
.abiu-hunt-cat.pounce{transform:translateY(-26px) rotate(-8deg) scale(1.13)}
.abiu-hunt-caption{position:absolute;bottom:4px;right:8px;color:#4b6959;font-size:11px;background:#f9f5eacb;border-radius:10px;padding:4px 7px}
@media(prefers-reduced-motion:reduce){.room.abiu-nuzzling .scene,.room.abiu-greeting .scene,.abiu-touch-spark{animation:none!important}.abiu-hunt-cat{transition:none}}
`;document.head.append(style);
const room=document.getElementById('room'),scene=document.getElementById('scene'),area=document.getElementById('gameArea');if(!room||!scene||!area)return;
let last=0,start=null,strokes=0;
function reaction(type,x,y){room.classList.remove('abiu-nuzzling','abiu-greeting');void room.offsetWidth;room.classList.add(type==='home'?'abiu-greeting':'abiu-nuzzling');setTimeout(()=>room.classList.remove('abiu-nuzzling','abiu-greeting'),1250);if(x!=null){const e=document.createElement('span');e.className='abiu-touch-spark';e.textContent=strokes%3===0?'♡':'✧';e.style.left=x+'px';e.style.top=y+'px';room.append(e);setTimeout(()=>e.remove(),900)}}
window.addEventListener('abiu:action',e=>{const a=e.detail?.action;if(a==='home'||a==='pet'||a==='brush')reaction(a)});
room.addEventListener('pointerdown',e=>{if(e.target!==scene)return;start={x:e.clientX,y:e.clientY};});
room.addEventListener('pointerup',e=>{if(!start)return;const d=Math.hypot(e.clientX-start.x,e.clientY-start.y);start=null;if(d<35||Date.now()-last<250)return;last=Date.now();strokes++;const rect=room.getBoundingClientRect();reaction('pet',e.clientX-rect.left,e.clientY-rect.top);const msg=document.getElementById('message');if(msg)msg.textContent=document.documentElement.lang==='en'?'A biu leans into your hand ♡':'阿 biu 主動把臉頰靠向你的手 ♡';if(navigator.vibrate)navigator.vibrate(8)});
room.addEventListener('pointercancel',()=>{start=null});
const observer=new MutationObserver(()=>{const feather=area.querySelector('#feather');if(!feather||area.querySelector('.abiu-hunt-cat'))return;area.classList.add('abiu-hunt-active');const cat=document.createElement('img');cat.className='abiu-hunt-cat';cat.alt='阿 biu 正在追羽毛';cat.src=scene.src;area.append(cat);const caption=document.createElement('div');caption.className='abiu-hunt-caption';caption.textContent='阿 biu 正在追逐';area.append(caption);const move=()=>{if(!feather.isConnected)return;const targetX=parseFloat(feather.style.left)||20;cat.style.left=Math.max(4,Math.min(area.clientWidth-100,targetX-18))+'px';cat.classList.remove('pounce');void cat.offsetWidth;cat.classList.add('pounce');setTimeout(()=>cat.classList.remove('pounce'),320)};feather.addEventListener('click',()=>requestAnimationFrame(move));move();});
observer.observe(area,{childList:true,subtree:false});
})();