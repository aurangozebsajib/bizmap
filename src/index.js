export default {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BizMap</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}
body{background:#0A0A0A;color:#fff}
.page{padding:16px;padding-bottom:90px;display:none}
.page.active{display:block}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.logo{font-weight:800;font-size:20px}.logo span{color:#FFD60A}
.badge{background:#FFD60A;color:#000;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700}
h1{font-size:22px;margin:10px 0} h1 span{color:#FFD60A}
.sub{color:#666;font-size:13px;margin-bottom:16px}
.sectors{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.card{background:#1A1A1A;border:1px solid #222;border-radius:16px;padding:14px;cursor:pointer}
.card:active{transform:scale(0.97);border-color:#FFD60A}
.ideaCard{background:#111;border:1px solid #222;border-radius:16px;padding:16px;margin-bottom:12px;cursor:pointer}
.ideaCard .title{font-weight:700;font-size:15px}
.ideaCard .meta{color:#888;font-size:12px;margin:6px 0;display:flex;gap:8px;flex-wrap:wrap}
.tag{background:#222;padding:3px 8px;border-radius:20px;font-size:10px}
.btn{background:#FFD60A;color:#000;border:none;padding:10px 16px;border-radius:10px;font-weight:700;width:100%;margin-top:10px}
.section{background:#111;border:1px solid #1E1E1E;border-radius:12px;margin:10px 0;overflow:hidden}
.sectionHead{padding:14px;display:flex;justify-content:space-between;cursor:pointer}
.sectionBody{padding:0 14px 14px;display:none;color:#BBB;font-size:13px;line-height:1.6}
.section.open .sectionBody{display:block}
.aiBox{background:#111;border:1px solid #FFD60A44;border-radius:16px;padding:14px;margin:16px 0}
.aiInput{display:flex;gap:8px;margin-top:10px}
.aiInput input{flex:1;background:#000;border:1px solid #333;border-radius:10px;padding:12px;color:#fff}
.bottom{position:fixed;bottom:0;left:0;right:0;background:#0A0A0A;border-top:1px solid #1A1A1A;padding:10px;display:flex;justify-content:space-around;z-index:10}
.bottom button{background:none;border:none;color:#555;font-size:11px}
.bottom button.active{color:#FFD60A}
.back{color:#FFD60A;background:none;border:none;font-size:14px;margin-bottom:12px}
</style>
</head>
<body>
<div id="p1" class="page active">
<div class="header"><div class="logo">BizMap<span>.</span></div><div class="badge">5000+ Ideas</div></div>
<h1>Business for <span>Bangladesh</span></h1>
<p class="sub">Find → Understand → Test → Execute</p>
<div class="sectors" id="sectorGrid"></div>
</div>
<div id="p2" class="page">
<button class="back" onclick="go(1)">← Back</button>
<h1 id="p2Title"></h1>
<p class="sub" id="p2Count"></p>
<div id="ideaList"></div>
</div>
<div id="p3" class="page">
<button class="back" onclick="go(2)">← Back</button>
<h1 id="p3Title"></h1>
<p class="sub" id="p3Short"></p>
<div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0" id="p3Meta"></div>
<button class="btn" style="background:#111;color:#FFD60A;border:1px solid #FFD60A" onclick="saveIdea()">⭐ Save Idea</button>
<div id="sections"></div>
<div class="aiBox">
<div style="font-weight:700">🤖 BizMap AI</div>
<div id="aiChat" style="margin:10px 0;max-height:200px;overflow:auto;font-size:13px;color:#AAA">Ask: How much rent? Where to find suppliers?</div>
<div class="aiInput"><input id="aiInput" placeholder="Ask..."><button onclick="askAI()" style="background:#FFD60A;border:none;padding:10px 14px;border-radius:10px;font-weight:700">Ask</button></div>
</div>
<button class="btn" onclick="alert('Day1: Find 10 customers')">🚀 START THIS WEEK</button>
</div>
<div class="bottom">
<button id="b1" class="active" onclick="go(1)">🏠 Home</button>
<button onclick="Telegram.WebApp.showAlert('Search next')">🔍 Search</button>
<button onclick="Telegram.WebApp.showAlert('Saved:'+JSON.parse(localStorage.getItem('saved')||'[]').length)">⭐ Saved</button>
<button onclick="go(3)">🤖 AI</button>
</div>
<script>
Telegram.WebApp.ready(); Telegram.WebApp.expand();
const DB = [
{id:1, sector:"Retail", title:"Small Grocery Partnership", short:"Partner with existing mudir dokan", capital:"৳20k-50k", model:"Brokerage", diff:"Beginner", res:"Network", tags:["No Shop"],
what:"You don't open shop. You supply products to existing shops on commission.",
how:"Shop sells, you get 15% margin. No rent.",
customer:"Grocery shops", where:"Your area bazaar", who:"Shop owners", sourcing:"Kawran Bazar wholesale", deal:"Ami apnar dokane product rakhbo", marketing:"Poster in shop", sales:"Visit 10 shops", ops:"Supply every 2 days", econ:"50k sales *15% = 7500 profit", risks:"Shop doesn't pay", test:"5 products in 1 shop 3 days", plan90:"D1-7:10 shops D8-30:3 shops live"
},
{id:2, sector:"Retail", title:"Mobile Recharge & Bkash", short:"Lowest risk retail", capital:"৳5k-20k", model:"Service", diff:"Beginner", res:"Shop",
what:"Bkash, Nagad service",how:"Commission 2-5 Tk",customer:"Local people",where:"Bazar",who:"Bkash distributor",sourcing:"Distributor device",deal:"Deposit 10k",marketing:"Signboard",sales:"They come",ops:"Daily cash",econ:"100 trans *3tk=9k/month",risks:"Fake note",test:"1 week with 5k",plan90:"D1-7: agency D8-30: customers"
},
{id:3, sector:"Agriculture", title:"Hydroponic Fodder", short:"Grow grass without soil", capital:"৳20k-100k", model:"Product", diff:"Intermediate", res:"Space",
what:"Grow 7-day fodder",how:"Sell per kg",customer:"Dairy farms",where:"Savar",who:"Dairy owners",sourcing:"Wheat seed",deal:"5kg free trial",marketing:"Visit farms",sales:"Show saving 30%",ops:"Daily harvest",econ:"10kg/day *30tk = 9k profit",risks:"Seed price",test:"2 trays 1 farm",plan90:"D1-7:10 trays D8-30:2 farms"
}
];
let currentSector="", currentIdea=null;
function renderSectors(){
  const sectors = [...new Set(DB.map(x=>x.sector))];
  document.getElementById('sectorGrid').innerHTML = sectors.map(s=>{
    const count = DB.filter(x=>x.sector===s).length;
    return '<div class="card" onclick="openSector(\\''+s+'\\')"><div style="font-size:24px">📦</div><div style="font-weight:700;margin-top:6px">'+s+'</div><div style="color:#666;font-size:11px;margin-top:4px">'+count+' ideas</div></div>';
  }).join('');
}
function openSector(s){ currentSector=s; document.getElementById('p2Title').innerText=s; document.getElementById('p2Count').innerText=DB.filter(x=>x.sector===s).length+' ideas'; document.getElementById('ideaList').innerHTML=DB.filter(x=>x.sector===s).map(i=>'<div class="ideaCard" onclick="openIdea('+i.id+')"><div class="title">'+i.title+'</div><div class="meta"><span class="tag">'+i.capital+'</span><span class="tag">'+i.model+'</span></div><div style="font-size:12px;color:#777;margin-top:6px">'+i.short+'</div><button class="btn">View</button></div>').join(''); go(2); }
function openIdea(id){
  currentIdea=DB.find(x=>x.id===id);
  document.getElementById('p3Title').innerText=currentIdea.title;
  document.getElementById('p3Short').innerText=currentIdea.short;
  document.getElementById('p3Meta').innerHTML='<span class="tag">'+currentIdea.capital+'</span><span class="tag">'+currentIdea.model+'</span>';
  const secs = [["1. What",currentIdea.what],["2. How Money",currentIdea.how],["3. Customer",currentIdea.customer],["4. Where Customers",currentIdea.where],["5. Who to Deal",currentIdea.who],["6. Sourcing",currentIdea.sourcing],["7. Deal",currentIdea.deal],["8. Marketing",currentIdea.marketing],["9. Sales",currentIdea.sales],["10. Ops",currentIdea.ops],["11. Economics",currentIdea.econ],["12. Risks",currentIdea.risks],["13. Test",currentIdea.test],["14. 90-Day Plan",currentIdea.plan90]];
  document.getElementById('sections').innerHTML = secs.map(s=>'<div class="section" onclick="this.classList.toggle(\\'open\\')"><div class="sectionHead"><b>'+s[0]+'</b><span>+</span></div><div class="sectionBody">'+s[1]+'</div></div>').join('');
  go(3);
}
function go(n){ document.querySelectorAll('.page').forEach(p=>p.classList.remove('active')); document.getElementById('p'+n).classList.add('active'); document.querySelectorAll('.bottom button').forEach(b=>b.classList.remove('active')); if(n===1)document.getElementById('b1').classList.add('active'); window.scrollTo(0,0); }
function saveIdea(){ let s=JSON.parse(localStorage.getItem('saved')||'[]'); if(!s.includes(currentIdea.id)){ s.push(currentIdea.id); localStorage.setItem('saved',JSON.stringify(s)); alert('Saved!'); } }
function askAI(){ const q=document.getElementById('aiInput').value; if(!q) return; const chat=document.getElementById('aiChat'); chat.innerHTML+='<div style="color:#fff">You: '+q+'</div>'; let ans="Based on: "+currentIdea.how+" | Test: "+currentIdea.test; chat.innerHTML+='<div style="color:#FFD60A">AI: '+ans+'</div>'; document.getElementById('aiInput').value=""; }
renderSectors();
<\/script>
</body>
</html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
}
