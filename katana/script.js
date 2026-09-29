const blade=document.querySelector('#blade');
const hero=document.querySelector('.hero');
let current=-14,target=-14;
function aim(x,y){
  const r=blade.getBoundingClientRect();
  const originX=r.left+3, originY=r.top+r.height/2;
  target=Math.atan2(y-originY,x-originX)*180/Math.PI;
  target=Math.max(-48,Math.min(36,target));
}
hero.addEventListener('pointermove',e=>aim(e.clientX,e.clientY));
function animateBlade(){current+=(target-current)*.075;blade.style.setProperty('--angle',`${current}deg`);requestAnimationFrame(animateBlade)}
animateBlade();
const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const canvas=document.querySelector('#petals'),ctx=canvas.getContext('2d');let petals=[];
function resize(){const d=Math.min(devicePixelRatio,2);canvas.width=innerWidth*d;canvas.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0);petals=Array.from({length:innerWidth<600?22:45},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,s:3+Math.random()*6,v:.35+Math.random()*.75,w:Math.random()*Math.PI*2,o:.35+Math.random()*.55}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of petals){p.y+=p.v;p.x+=Math.sin(p.w+=.012)*.35;if(p.y>innerHeight+12){p.y=-12;p.x=Math.random()*innerWidth}ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.w);ctx.globalAlpha=p.o;ctx.fillStyle='#f3dfe4';ctx.beginPath();ctx.ellipse(0,0,p.s,p.s*.45,0,0,Math.PI*2);ctx.fill();ctx.restore()}requestAnimationFrame(draw)}
addEventListener('resize',resize);resize();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)draw();
