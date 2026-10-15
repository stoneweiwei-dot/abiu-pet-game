/* 阿 biu — illustrated motion v1: distinct action choreography, no external assets. */
(()=>{'use strict';
const css=`
.abiu-motion{position:absolute;inset:0;z-index:3;pointer-events:none;display:grid;place-items:center;overflow:hidden;opacity:0;transition:opacity .22s;background:linear-gradient(180deg,#f8f3e900,#fff8ebd9 48%,#fff8eb00)}
.abiu-motion.visible{opacity:1}.abiu-motion svg{width:min(72%,320px);height:auto;overflow:visible;filter:drop-shadow(0 14px 12px #3d493c30);transform-origin:50% 85%}
.abiu-motion .abiu-cat{transform-origin:50% 83%;animation:abiu-arrive .5s both}
.abiu-motion[data-act=pet] .abiu-cat{animation:abiu-nuzzle .72s ease-in-out 3}
.abiu-motion[data-act=feed] .abiu-head{animation:abiu-eat .42s ease-in-out 5;transform-origin:50% 58%}
.abiu-motion[data-act=play] .abiu-cat{animation:abiu-jump .75s ease-in-out 3}
.abiu-motion[data-act=brush] .abiu-cat{animation:abiu-brush .75s ease-in-out 3}
.abiu-motion[data-act=rest] .abiu-cat{animation:abiu-sleep 2s ease-in-out infinite}
.abiu-motion[data-act=home] .abiu-cat{animation:abiu-home 1s ease-in-out 2}
.abiu-motion .abiu-tail{transform-origin:79% 76%;animation:abiu-tail 1s ease-in-out infinite alternate}
.abiu-motion[data-act=rest] .abiu-tail{animation:none}
.abiu-motion .abiu-eyes{transform-origin:50% 53%}
.abiu-motion[data-act=pet] .abiu-eyes,.abiu-motion[data-act=brush] .abiu-eyes,.abiu-motion[data-act=rest] .abiu-eyes{transform:scaleY(.15)}
.abiu-motion .abiu-prop{font:44px system-ui;text-anchor:middle;animation:abiu-prop 1s ease-in-out infinite alternate}
.abiu-motion .abiu-bubble{font:600 19px -apple-system,'PingFang TC',sans-serif;fill:#426b55;text-anchor:middle}
@keyframes abiu-arrive{from{transform:translateY(55px) scale(.8);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
@keyframes abiu-nuzzle{0%,100%{transform:rotate(0)}50%{transform:rotate(-12deg) translateX(-10px)}}
@keyframes abiu-eat{0%,100%{transform:rotate(0)}50%{transform:rotate(12deg) translateY(12px)}}
@keyframes abiu-jump{0%,100%{transform:translateY(0) rotate(0)}45%{transform:translateY(-62px) rotate(-10deg)}}
@keyframes abiu-brush{0%,100%{transform:translateX(0)}50%{transform:translateX(18px) rotate(5deg)}}
@keyframes abiu-sleep{0%,100%{transform:scale(1)}50%{transform:scale(1.045,.97)}}
@keyframes abiu-home{0%{transform:translateX(-125px) scale(.75);opacity:.3}65%{transform:translateX(12px) scale(1.07);opacity:1}100%{transform:translateX(0) scale(1)}}
@keyframes abiu-tail{from{transform:rotate(-12deg)}to{transform:rotate(18deg)}}
@keyframes abiu-prop{from{transform:translateY(0)}to{transform:translateY(-20px)}}
@media(prefers-reduced-motion:reduce){.abiu-motion *{animation:none!important}.abiu-motion svg{transform:none}}
`;const style=document.createElement('style');style.textContent=css;document.head.append(style);
const room=document.getElementById('room');if(!room)return;
const layer=document.createElement('div');layer.className='abiu-motion';layer.setAttribute('aria-hidden','true');room.append(layer);
const labels={pet:['摸摸頭 ♡','♡'],feed:['開飯囉','🐟'],play:['來抓我呀！','🪶'],brush:['好舒服呀','✦'],rest:['晚安，阿 biu','☾'],home:['你回來了！','♡']};
let hide=0;
function play(action){if(!labels[action])return;clearTimeout(hide);const [label,prop]=labels[action];layer.dataset.act=action;
layer.innerHTML=`<svg viewBox="0 0 320 350" role="img" aria-label="阿 biu ${label}">
<ellipse cx="160" cy="317" rx="96" ry="12" fill="#708476" opacity=".2"/>
<g class="abiu-cat">
<path class="abiu-tail" d="M230 252 Q304 275 277 193" fill="none" stroke="#78858a" stroke-width="30" stroke-linecap="round"/>
<ellipse cx="160" cy="251" rx="90" ry="66" fill="#78868d" stroke="#52646d" stroke-width="4"/>
<ellipse cx="160" cy="265" rx="62" ry="42" fill="#89979d" opacity=".48"/>
<ellipse cx="104" cy="296" rx="29" ry="19" fill="#89969c"/><ellipse cx="216" cy="296" rx="29" ry="19" fill="#89969c"/>
<g class="abiu-head">
<path d="M85 136 L76 76 Q76 61 93 70 L126 100 M235 136 L244 76 Q244 61 227 70 L194 100" fill="#78868d" stroke="#52646d" stroke-width="5" stroke-linejoin="round"/>
<path d="M88 111 L86 83 L112 106 M232 111 L234 83 L208 106" fill="#c7a8a5"/>
<ellipse cx="160" cy="168" rx="98" ry="91" fill="#849198" stroke="#52646d" stroke-width="4"/>
<ellipse cx="111" cy="188" rx="42" ry="35" fill="#929fa4"/><ellipse cx="209" cy="188" rx="42" ry="35" fill="#929fa4"/>
<g class="abiu-eyes"><ellipse cx="120" cy="158" rx="16" ry="20" fill="#e6bb64"/><ellipse cx="200" cy="158" rx="16" ry="20" fill="#e6bb64"/><ellipse cx="121" cy="159" rx="6" ry="15" fill="#34443b"/><ellipse cx="201" cy="159" rx="6" ry="15" fill="#34443b"/><circle cx="116" cy="151" r="4" fill="white"/><circle cx="196" cy="151" r="4" fill="white"/></g>
<path d="M151 201 Q160 194 169 201 L160 211 Z" fill="#a87578"/><path d="M160 211 Q154 224 143 218 M160 211 Q166 224 177 218" fill="none" stroke="#4d5d60" stroke-width="3" stroke-linecap="round"/>
<path d="M95 209 L54 202 M96 219 L55 224 M225 209 L266 202 M224 219 L265 224" stroke="#52646d" stroke-width="2.5" stroke-linecap="round"/>
<path d="M91 231 Q160 251 229 231" fill="none" stroke="#4c7866" stroke-width="8"/><circle cx="160" cy="245" r="11" fill="#d9b66c" stroke="#a58549" stroke-width="2"/>
</g></g>
<text class="abiu-prop" x="265" y="80">${prop}</text><rect x="54" y="9" width="212" height="42" rx="21" fill="#fffcf0" opacity=".96"/><text class="abiu-bubble" x="160" y="37">${label}</text></svg>`;
layer.classList.remove('visible');void layer.offsetWidth;layer.classList.add('visible');hide=setTimeout(()=>{layer.classList.remove('visible');setTimeout(()=>{if(!layer.classList.contains('visible'))layer.innerHTML=''},300)},action==='rest'?3900:2600);
}
window.addEventListener('abiu:action',e=>play(e.detail?.action));
})();