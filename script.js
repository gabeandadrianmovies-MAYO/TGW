// THE GREAT WEB — BUILD 002
// Add or change project URLs here. Blank URLs show "LINK COMING SOON".
const websites=[
{name:"BOYDS",emoji:"🏡",description:"A small town. A shared story.",url:"https://gabeandadrianmovies-mayo.github.io/BOYDS/",status:"LIVE"},
{name:"City Pages",emoji:"🌎",description:"Every community has a story.",url:"https://gabeandadrianmovies-mayo.github.io/City-Pages/",status:"LIVE"},
{name:"The Dancing Potato",emoji:"🥔",description:"All hail the magic potato!",url:"https://gabeandadrianmovies-mayo.github.io/Potato/",status:"LIVE"},
{name:"THE CHEZE INCIDENT",emoji:"🧀",description:"The internet's cheesiest incident.",url:"https://gabeandadrianmovies-mayo.github.io/CHEZE/",status:"LIVE"},
{name:"The Inventory",emoji:"📦",description:"Organize, sort, and track everything.",url:"",status:"IN DEVELOPMENT"},
{name:"Tiny Survival",emoji:"🌲",description:"A tiny pixel-art survival adventure.",url:"",status:"IN DEVELOPMENT"},
{name:"NBFN",emoji:"📰",description:"News that definitely happened. Probably.",url:"",status:"IN DEVELOPMENT"}
];
const count=document.getElementById("count");if(count)count.textContent=websites.length;
const projects=document.getElementById("projects"),search=document.getElementById("search");
function render(){
 if(!projects||!search)return;
 const q=search.value.trim().toLowerCase();
 const matches=websites.filter(w=>(w.name+" "+w.description).toLowerCase().includes(q));
 projects.replaceChildren();
 for(const w of matches){
  const card=document.createElement("article");card.className="project";
  const emoji=document.createElement("div");emoji.className="emoji";emoji.textContent=w.emoji;
  const tag=document.createElement("div");tag.className="tag";tag.textContent=w.status;
  const title=document.createElement("h3");title.textContent=w.name;
  const desc=document.createElement("p");desc.textContent=w.description;
  const link=document.createElement(w.url?"a":"span");link.textContent=w.url?"VISIT WEBSITE →":"LINK COMING SOON";
  if(w.url){link.href=w.url;link.target="_blank";link.rel="noopener noreferrer";}
  else link.className="note";
  card.append(emoji,tag,title,desc,link);projects.append(card);
 }
 document.getElementById("empty").hidden=matches.length>0;
}
if(search){search.addEventListener("input",render);render();}
const potato=document.getElementById("potato");
if(potato){let points=0;potato.addEventListener("click",()=>{
 document.getElementById("score").textContent=++points;
 if(points===10)document.getElementById("achievement").textContent="🏆 ACHIEVEMENT UNLOCKED: THE POTATO HAS CHOSEN YOU!";
});}
// Replace the empty string with your email address before publishing.
// Never place private credentials or passwords in this file.
const SUGGEST_EMAIL="gabeandadrianmovies@gmail.com";
const form=document.getElementById("suggestForm");
if(form)form.addEventListener("submit",event=>{
 event.preventDefault();
 if(!SUGGEST_EMAIL){alert("First set SUGGEST_EMAIL in script.js to your recipient email address.");return;}
 const name=document.getElementById("visitor").value.trim();
 const idea=document.getElementById("idea").value.trim();
 if(!name||!idea)return;
 const subject=encodeURIComponent("THE GREAT WEB — Suggestion");
 const body=encodeURIComponent("From: "+name+"\n\nSuggestion:\n"+idea);
 location.href="mailto:"+SUGGEST_EMAIL+"?subject="+subject+"&body="+body;
});
// Interactive illustrated city preview (2D; full Three.js city is a later build).
const canvas=document.getElementById("cityCanvas");
if(canvas){
 const ctx=canvas.getContext("2d");let selected=0;
 const palette=["#4d79d9","#487ab6","#4b97a1","#8068b6","#5b89c4","#5984a1","#5876ac"];
 const draw=()=>{
  const w=canvas.width,h=canvas.height;
  const grad=ctx.createLinearGradient(0,0,0,h);grad.addColorStop(0,"#142a50");grad.addColorStop(1,"#0c1730");
  ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
  ctx.fillStyle="#7ea7ee";for(let i=0;i<45;i++){let x=(i*137+29)%w,y=(i*53+17)%175;ctx.fillRect(x,y,2,2);}
  ctx.fillStyle="#1e3659";ctx.fillRect(0,275,w,65);
  const bw=112,gap=23,start=35;
  websites.forEach((site,i)=>{
   const x=start+i*(bw+gap),bh=95+(i%3)*36,y=275-bh;
   ctx.fillStyle=i===selected?"#89b0ff":palette[i];ctx.fillRect(x,y,bw,bh);
   ctx.fillStyle="#d5edff";for(let yy=y+20;yy<270;yy+=23)for(let xx=x+14;xx<x+bw-8;xx+=26)ctx.fillRect(xx,yy,11,12);
   if(i===selected){ctx.strokeStyle="#78f3dd";ctx.lineWidth=4;ctx.strokeRect(x-5,y-5,bw+10,bh+10);}
   ctx.fillStyle="#fff";ctx.font="bold 12px Arial";ctx.textAlign="center";
   ctx.fillText(site.name.length>14?site.name.slice(0,12)+"…":site.name,x+bw/2,300);
   ctx.font="20px Arial";ctx.fillText(site.emoji,x+bw/2,y-13);
  });
 };
 const update=()=>{draw();const s=websites[selected];document.getElementById("citySelected").textContent="Selected: "+s.name+(s.url?" — ready to visit":" — website link coming soon");};
 canvas.addEventListener("click",event=>{
  const rect=canvas.getBoundingClientRect(),x=(event.clientX-rect.left)*canvas.width/rect.width;
  const index=Math.floor((x-35)/135);
  if(index>=0&&index<websites.length&&x>=35+index*135&&x<=35+index*135+112){selected=index;update();}
 });
 document.getElementById("cityLeft").addEventListener("click",()=>{selected=(selected+websites.length-1)%websites.length;update();});
 document.getElementById("cityRight").addEventListener("click",()=>{selected=(selected+1)%websites.length;update();});
 document.getElementById("cityVisit").addEventListener("click",()=>{const s=websites[selected];if(s.url)window.open(s.url,"_blank","noopener,noreferrer");else alert("A website link hasn't been added for "+s.name+" yet.");});
 update();
}
