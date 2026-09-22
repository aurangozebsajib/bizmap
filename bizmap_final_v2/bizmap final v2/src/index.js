const SHEET_ID = "15Ps2i4MILozGKuVrNNLA8-prHwb49J_ZCRIFDlewUSI";
const API_KEY = "AIzaSyB4szDcwoa_s6arvmGcrf5FvG0zpZetzM0";
const BKASH = "01616200174";

async function sheetRead(sheetName){
  try{
    const r = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`);
    const d = await r.json();
    if(d.error) throw d.error;
    return d.values || [];
  }catch(e){ return []; }
}

export default {
 async fetch(req){
  const url = new URL(req.url);
  const cors = {"Access-Control-Allow-Origin":"*","Content-Type":"application/json"};

  // API: categories (DIRECT from Category Name sheet, no Apps Script)
  if(url.pathname==="/api/categories"){
    const rows = await sheetRead("Category Name");
    const cats = rows.slice(1).filter(r=>r[1] && r[3]).map(r=>({
      name: r[1], desc: r[2]||"", sheetName: r[3], total: r[4]||"0", status: r[5]||"Active"
    })).filter(c=> (c.status||"").toLowerCase()!=="inactive");
    return new Response(JSON.stringify(cats),{headers:cors});
  }

  if(url.pathname==="/api/today"){
    const rows = await sheetRead("Daily Business Idea");
    const r = rows[1] || [];
    return new Response(JSON.stringify({name:r[1]||"No Idea Today", desc:r[2]||"", what:r[3]||"", cost:r[6]||"", profit:r[7]||""}),{headers:cors});
  }

  if(url.pathname==="/api/category"){
    const name = url.searchParams.get("name");
    const rows = await sheetRead(name);
    const headers = rows[0]||[];
    const items = rows.slice(1).filter(r=>r[0]).map(row=>{
      let o={}; headers.forEach((h,i)=>o[h]=row[i]);
      return {
        name: o.Name || o["Documents Name"] || row[1]||"No Name",
        description: o.Description || row[2]||"",
        type: o.Type || row[3]||"",
        link: o["Link / URL"] || row[4]||"",
        where: o["Where to Use"] || row[5]||"",
        how: o["How to Use"] || row[6]||"",
        cost: o["Cost (Free/Paid)"] || row[7]||"Free"
      }
    });
    return new Response(JSON.stringify(items),{headers:cors});
  }

  if(url.pathname==="/api/check-premium"){
    const tg_id = url.searchParams.get("tg_id");
    const rows = await sheetRead("Users");
    for(let i=1;i<rows.length;i++){
      if(String(rows[i][1])===String(tg_id)){
        const status = (rows[i][5]||"").toLowerCase();
        const expiry = rows[i][7]? new Date(rows[i][7]) : new Date(0);
        const is_premium = (status==="active" || status==="approved") && expiry>new Date();
        return new Response(JSON.stringify({is_premium, status, expiry:rows[i][7]}),{headers:cors});
      }
    }
    return new Response(JSON.stringify({is_premium:false}),{headers:cors});
  }

  if(url.pathname==="/api/submit-trx" && req.method==="POST"){
    // No Apps Script - save to Transactions sheet manually note
    // For now we return ok and admin manually adds row
    const body = await req.json().catch(()=>({}));
    // Try to log in console (Cloudflare logs)
    console.log("TRX_SUBMIT", JSON.stringify(body));
    // Return success with manual instruction
    return new Response(JSON.stringify({ok:true, manual:true, message:"TrxID received. Admin will manually verify in sheet."}),{headers:cors});
  }

  // HTML - YOUR LIKED DASHBOARD DESIGN with Today's Idea BIG
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<title>BizMap</title><script src="https://telegram.org/js/telegram-web-app.js"><\/script>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,system-ui,sans-serif}
body{background:#0A0A0A;color:#fff;min-height:100vh;padding-bottom:90px}
.page{display:none;max-width:480px;margin:0 auto;padding:14px}.page.active{display:block}
.header{display:flex;justify-content:space-between;align-items:center;padding:6px 0 14px}
.logo{font-weight:900;font-size:22px;display:flex;gap:6px}.logo b{color:#FFD60A}
.badge{font-size:11px;font-weight:800;padding:4px 10px;border-radius:20px}
.badge-free{background:#1A1A1A;color:#888;border:1px solid #222}.badge-pro{background:#FFD60A;color:#000}
.hero{background:linear-gradient(135deg,#171717,#0f0f0f);border:1px solid #FFD60A55;border-radius:20px;padding:16px;position:relative;overflow:hidden;margin-bottom:14px}
.hero::after{content:'';position:absolute;right:-30px;top:-30px;width:120px;height:120px;background:radial-gradient(circle,rgba(255,214,10,0.2),transparent 70%);border-radius:50%}
.trend{display:inline-flex;background:#FFD60A;color:#000;font-size:11px;font-weight:800;padding:5px 10px;border-radius:20px;margin-bottom:10px}
.heroTitle{font-size:20px;font-weight:900;color:#FFD60A;line-height:1.2;margin-bottom:8px}
.heroDesc{font-size:12px;color:#aaa;line-height:1.5;margin-bottom:12px}
.btnY{background:#FFD60A;color:#000;border:none;padding:11px 16px;border-radius:12px;font-weight:800;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px}
.stat{background:#111;border:1px solid #222;border-radius:14px;padding:10px;text-align:center}
.statLabel{font-size:9px;color:#666;text-transform:uppercase;letter-spacing:0.5px}
.statNum{font-size:18px;font-weight:900;margin-top:4px}
.secHead{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.card{background:#111;border:1px solid #222;border-radius:16px;padding:14px;text-align:center;cursor:pointer}
.card:active{border-color:#FFD60A;transform:scale(0.97)}
.iconBox{width:44px;height:44px;background:#1A1A1A;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;font-size:22px;border:1px solid #222}
.card b{font-size:12px}.count{background:#222;color:#888;font-size:11px;padding:2px 8px;border-radius:10px;display:inline-block;margin-top:6px;font-weight:700}
.card.active{border-color:#FFD60A}.card.active .count{background:#FFD60A;color:#000}
.item{background:#111;border:1px solid #222;border-radius:14px;padding:12px;margin-bottom:10px;position:relative;overflow:hidden}
.blur{filter:blur(8px);pointer-events:none;user-select:none}
.lock{position:absolute;inset:0;background:rgba(0,0,0,0.7);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;border-radius:14px}
.bottom{position:fixed;bottom:0;left:0;right:0;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);border-top:1px solid #1A1A1A;display:flex;justify-content:space-around;padding:8px 0 12px;max-width:480px;margin:0 auto;z-index:99}
.bottom button{background:none;border:none;color:#555;font-size:10px;font-weight:600;display:flex;flex-direction:column;align-items:center;gap:3px}
.bottom button.active{color:#FFD60A}.payBox{background:#111;border:1px solid #222;border-radius:16px;padding:14px;margin-bottom:10px}
.input{width:100%;background:#000;border:1px solid #333;border-radius:12px;padding:12px;color:#fff;margin-top:8px}
</style></head><body>

<div id="p1" class="page active">
<div class="header"><div class="logo">◆ <b>BizMap</b></div><div id="badge" class="badge badge-free">FREE</div></div>
<div class="hero" id="hero"><div class="trend">🔥 Trending Today</div><div class="heroTitle" id="tName">Loading...</div><div class="heroDesc" id="tDesc">From Daily Business Idea sheet...</div><button class="btnY" onclick="openToday()">Explore now →</button></div>
<div class="stats"><div class="stat"><div class="statLabel">Total Categories</div><div class="statNum" id="sCat">--</div></div><div class="stat"><div class="statLabel">Total Tools</div><div class="statNum" id="sTools">--</div></div><div class="stat"><div class="statLabel">Premium Users</div><div class="statNum">1,248</div></div></div>
<div class="secHead"><b>Categories</b><span style="color:#FFD60A;font-size:11px">auto from sheet</span></div>
<div class="grid" id="grid">Loading categories...</div>
<div style="padding:12px 0"><button class="btnY" style="width:100%;justify-content:center" onclick="openPay()">🔓 Unlock All - 199 TK / Year</button></div>
</div>

<div id="p2" class="page"><button onclick="go(1)" style="color:#FFD60A;background:none;border:none;font-weight:700">← Back</button><h2 id="p2T" style="margin:10px 0;font-size:18px"></h2><div id="list"></div></div>
<div id="pToday" class="page"><button onclick="go(1)" style="color:#FFD60A;background:none;border:none">← Back</button><div id="todayFull" style="margin-top:12px"></div></div>
<div id="pPay" class="page"><button onclick="go(1)" style="color:#FFD60A;background:none;border:none">← Back</button>
<div class="payBox" style="text-align:center;margin-top:12px"><h3>Unlock BizMap Pro</h3><p style="font-size:11px;color:#888;margin-top:4px">Free te Description dekhba, Name+Link blur thakbe</p><div style="font-size:28px;font-weight:900;color:#FFD60A;margin:10px 0">199 TK <span style="font-size:12px;color:#fff">/Year</span></div></div>
<div class="payBox"><b>bKash / Nagad Number</b><div style="font-size:22px;font-weight:900;color:#FFD60A;margin:8px 0">${BKASH}</div><div style="font-size:11px;color:#888">Send Money 199 TK → TrxID copy koro</div><div style="display:flex;gap:8px;margin-top:10px"><button class="btnY" id="bK" style="flex:1" onclick="sel('bKash')">bKash</button><button class="input" id="bN" style="flex:1;text-align:center;margin:0" onclick="sel('Nagad')">Nagad</button></div></div>
<div class="payBox"><label style="font-size:11px;color:#888">TrxID</label><input id="trx" class="input" placeholder="e.g. 9KJH7..."><button class="btnY" style="width:100%;margin-top:10px;justify-content:center" onclick="submitTrx()">Submit TrxID</button><div id="pStatus" style="font-size:12px;margin-top:8px"></div></div>
</div>

<div class="bottom"><button id="bb1" class="active" onclick="go(1)"><span>🏠</span>Home</button><button onclick="openToday()"><span>💡</span>Today</button><button onclick="openPay()"><span>🔓</span>Pro</button><button onclick="checkPrem()"><span>👤</span>Profile</button></div>

<script>
const TG=Telegram?.WebApp;TG?.ready();TG?.expand();
const tg_id = TG?.initDataUnsafe?.user?.id?.toString() || localStorage.getItem('tg_id') || 'demo123';
const username = TG?.initDataUnsafe?.user?.username || 'demo';
localStorage.setItem('tg_id',tg_id);
let isPremium=false, todayData=null, cats=[], pay='bKash';
const iconFor = (n)=>{ if(n.toLowerCase().includes('audio')) return '🎧'; if(n.toLowerCase().includes('video')) return '🎬'; if(n.toLowerCase().includes('market')) return '📢'; if(n.toLowerCase().includes('sale')) return '💰'; if(n.toLowerCase().includes('doc')) return '📄'; if(n.toLowerCase().includes('lead')) return '🎯'; if(n.toLowerCase().includes('auto')) return '🤖'; return '📦'; };

async function init(){
 const c = await fetch('/api/categories').then(r=>r.json());
 cats=c; document.getElementById('sCat').innerText=c.length; 
 document.getElementById('sTools').innerText=c.reduce((s,x)=>s+ (parseInt(x.total)||0),0);
 document.getElementById('grid').innerHTML=c.map(x=>'<div class=card onclick="openCat(\\''+x.sheetName+'\\',\\''+x.name+'\\')"><div class=iconBox>'+iconFor(x.name)+'</div><b>'+x.name+'</b><div class=count>'+(x.total||0)+'</div></div>').join('');
 const t = await fetch('/api/today').then(r=>r.json());
 todayData=t; document.getElementById('tName').innerText=t.name; document.getElementById('tDesc').innerText=(t.desc||'').substring(0,120);
 checkPrem();
}
async function checkPrem(){
 const d=await fetch('/api/check-premium?tg_id='+tg_id).then(r=>r.json());
 if(d.is_premium){isPremium=true; document.getElementById('badge').innerText='PRO'; document.getElementById('badge').className='badge badge-pro';}
}
function go(n){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active')); document.getElementById(n===1?'p1':n==='pay'?'pPay':n==='today'?'pToday':'p'+n).classList.add('active'); window.scrollTo(0,0);}
function openPay(){go('pay');}
function openToday(){
 document.getElementById('todayFull').innerHTML='<div class=hero><div class=trend>🔥 Today</div><div class=heroTitle>'+todayData.name+'</div><div class=heroDesc>'+(todayData.desc||'')+'</div></div><div class=payBox><b>What Is It</b><div style=font-size:12px;color:#aaa;margin-top:6px>'+(todayData.what||todayData.desc)+'</div></div>';
 go('today');
}
function sel(p){pay=p; document.getElementById('bK').className=p==='bKash'?'btnY':'input'; document.getElementById('bN').className=p==='Nagad'?'btnY':'input';}
async function openCat(sheet, title){
 document.getElementById('p2T').innerText=title; go(2); document.getElementById('list').innerHTML='Loading from '+sheet+'...';
 const items=await fetch('/api/category?name='+encodeURIComponent(sheet)).then(r=>r.json());
 document.getElementById('list').innerHTML=items.map(it=>{
   const name = isPremium? '<b style=color:#FFD60A>'+it.name+'</b>' : '<div class=blur><b>'+it.name+'</b></div><div class=lock onclick=openPay()><div>🔒</div><div style=font-size:11px;color:#FFD60A>Tap to Unlock 199 TK</div></div>';
   const link = isPremium? '<div style=margin-top:8px;font-size:12px'><div>Type: '+it.type+'</div><a href='+it.link+' target=_blank style=color:#FFD60A;font-weight:800>🔗 Open Link</a></div>' : '<div style=position:relative;margin-top:8px><div class=blur style=font-size:12px>Link: Hidden<br>How: Hidden</div><div class=lock onclick=openPay()><div style=font-size:11px>🔒 Unlock to see Link</div></div></div>';
   return '<div class=item><div style=position:relative;background:#000;padding:10px;border-radius:10px;min-height:40px;margin-bottom:8px>'+name+'</div><div style=font-size:12px;color:#bbb>'+it.description+'</div>'+link+'</div>';
 }).join('')||'No tools yet';
}
async function submitTrx(){
 const trx=document.getElementById('trx').value.trim(); if(!trx){alert('TrxID dao');return;}
 document.getElementById('pStatus').innerText='Submitting...';
 const r=await fetch('/api/submit-trx',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tg_id, username, provider:pay, trx_id:trx})}).then(r=>r.json());
 document.getElementById('pStatus').innerHTML='✅ Submitted! TrxID: '+trx+'<br>Admin 2 hour er moddhe Transactions sheet e check kore active kore dibe.<br>Users sheet e status=active + expiry 1 year set korlei user Pro hobe.';
}
init();
<\/script></body></html>`;
  return new Response(html,{headers:{"Content-Type":"text/html"}});
 }
}
