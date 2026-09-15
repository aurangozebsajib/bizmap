export default {
  async fetch(request, env) {
    const SUPA_URL = env.SUPA_URL || "";
    const SUPA_KEY = env.SUPA_KEY || "";
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BizMap</title>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif}
body{background:#0A0A0A;color:#fff;padding-bottom:90px}
.page{display:none;padding:16px;max-width:600px;margin:0 auto}
.page.active{display:block}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.logo{font-weight:900;font-size:22px} .logo span{color:#FFD60A}
.badge{background:#FFD60A;color:#000;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:800}
.card{background:#1A1A1A;border:1px solid #222;border-radius:16px;padding:14px;margin-bottom:12px}
.label{font-size:11px;font-weight:700;color:#888;margin-bottom:6px;display:block;letter-spacing:0.5px}
.input{width:100%;background:#000;border:1px solid #333;border-radius:10px;padding:12px;font-size:14px;color:#fff;margin-bottom:10px}
.input:focus{outline:none;border-color:#FFD60A}
.row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.btn{border:none;padding:12px 16px;border-radius:10px;font-weight:800;cursor:pointer;width:100%;font-size:14px}
.btn-yellow{background:#FFD60A;color:#000}
.btn-ghost{background:#222;color:#fff}
.btn:active{transform:scale(0.97)}
.payGrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}
.payBtn{padding:12px;border:1px solid #333;border-radius:10px;background:#111;font-size:12px;font-weight:700;cursor:pointer;color:#888}
.payBtn.active{background:#FFD60A;color:#000;border-color:#FFD60A}
.itemRow{background:#111;border:1px solid #222;border-radius:10px;padding:10px;margin-bottom:8px;display:grid;grid-template-columns:2fr 0.6fr 0.8fr 30px;gap:6px;align-items:end}
.modal{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px}
.modalBox{background:#1A1A1A;border:1px solid #333;border-radius:20px;padding:20px;width:100%;max-width:400px}
.onboardInput{width:100%;background:#000;border:1px solid #FFD60A;border-radius:10px;padding:14px;color:#fff;margin:10px 0}
.bottom{position:fixed;bottom:0;left:0;right:0;background:#0A0A0A;border-top:1px solid #1A1A1A;padding:10px;display:flex;justify-content:space-around;z-index:50}
.bottom button{background:none;border:none;color:#555;font-size:11px}
.bottom button.active{color:#FFD60A}
.sectors{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.sCard{background:#1A1A1A;border:1px solid #222;border-radius:16px;padding:14px;cursor:pointer}
.sCard:active{border-color:#FFD60A}
.appGrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.appIcon{background:#1A1A1A;border:1px solid #222;border-radius:16px;padding:12px;text-align:center;cursor:pointer}
.appIcon b{display:block;font-size:12px;margin-top:6px}
</style>
</head>
<body>

<div id="onboardModal" class="modal" style="display:none">
<div class="modalBox">
<h2 style="font-size:20px">Welcome to <span style="color:#FFD60A">BizMap</span></h2>
<p style="color:#888;font-size:13px;margin:8px 0">First time setup - One time only</p>
<label class="label">YOUR BUSINESS NAME</label>
<input id="obBizName" class="onboardInput" placeholder="e.g. Samira Fashion">
<label class="label">YOUR ADDRESS</label>
<input id="obAddr" class="onboardInput" placeholder="123 Anywhere St">
<label class="label">SIGNATURE IMAGE (Optional)</label>
<input id="obSign" type="file" accept="image/*" class="onboardInput">
<div style="font-size:11px;color:#666">Upload your signature photo - it will show on invoice bottom</div>
<button class="btn btn-yellow" style="margin-top:16px" onclick="saveOnboard()">Save & Start →</button>
</div>
</div>

<div id="p1" class="page active">
<div class="header"><div class="logo">BizMap<span>.</span></div><div class="badge" id="bizBadge">My Biz</div></div>
<h1 style="font-size:22px">Business for <span style="color:#FFD60A">Bangladesh</span></h1>
<p style="color:#666;font-size:13px;margin:6px 0 16px">Find → Invoice → Manage</p>

<div class="card" style="border-color:#FFD60A44">
<div style="font-weight:800">🚀 Quick Actions</div>
<div class="appGrid" style="margin-top:12px">
<div class="appIcon" onclick="go(2)"><div style="font-size:22px">🧾</div><b>Invoice</b><div style="font-size:10px;color:#666">Generator</div></div>
<div class="appIcon" onclick="go(4)"><div style="font-size:22px">👥</div><b>CRM</b><div style="font-size:10px;color:#666">Customers</div></div>
<div class="appIcon" onclick="Telegram.WebApp.showAlert('Khata Coming in Phase 2')"><div style="font-size:22px">💰</div><b>Khata</b><div style="font-size:10px;color:#666">Coming</div></div>
<div class="appIcon" onclick="go(5)"><div style="font-size:22px">💡</div><b>Ideas</b><div style="font-size:10px;color:#666">5000+</div></div>
<div class="appIcon" onclick="Telegram.WebApp.showAlert('Stock - Phase 3')"><div style="font-size:22px">📦</div><b>Stock</b><div style="font-size:10px;color:#666">Soon</div></div>
<div class="appIcon" onclick="go(3)"><div style="font-size:22px">📄</div><b>Invoices</b><div style="font-size:10px;color:#666">History</div></div>
</div>
</div>

<div style="margin:16px 0"><b>Sectors</b><span style="color:#666;font-size:12px"> - Business Ideas</span></div>
<div class="sectors" id="sectorGrid"></div>
</div>

<!-- INVOICE GENERATOR PAGE -->
<div id="p2" class="page">
<button onclick="go(1)" style="color:#FFD60A;background:none;border:none;margin-bottom:10px">← Back Home</button>
<div class="card"><div id="invBizName" style="font-weight:900;font-size:16px;color:#FFD60A">My Business</div><div id="invBizAddr" style="font-size:11px;color:#666">Address</div><button onclick="editBiz()" style="background:none;border:none;color:#FFD60A;font-size:11px;margin-top:6px">✏️ Edit Business Info & Signature</button></div>

<div class="card">
<label class="label">CUSTOMER / ক্রেতা</label>
<input id="custName" class="input" placeholder="Customer Name - Estelle Darcy">
<div class="row"><input id="custPhone" class="input" placeholder="Phone"><input id="custAddr" class="input" placeholder="Address"></div>
</div>

<div class="card">
<div style="display:flex;justify-content:space-between"><label class="label">ITEMS</label><button onclick="addItem()" style="background:#FFD60A;border:none;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:800">+ Add Item</button></div>
<div id="items" style="margin-top:8px"></div>
<div class="row" style="margin-top:10px"><div><label class="label">Discount ৳</label><input id="discount" class="input" type="number" value="0" oninput="calc()"></div><div><label class="label">Date</label><input id="invDate" class="input" type="date"></div></div>
</div>

<div class="card">
<label class="label">PAYMENT METHODS - Choose Multiple</label>
<div style="font-size:11px;color:#666;margin-bottom:8px">Customer can pay with multiple options - select all that apply</div>
<div class="payGrid">
<button class="payBtn" data-pay="bank" onclick="togglePay('bank')">🏦 Bank</button>
<button class="payBtn" data-pay="mobile" onclick="togglePay('mobile')">📱 bKash/Nagad</button>
<button class="payBtn" data-pay="cash" onclick="togglePay('cash')">💵 Cash</button>
<button class="payBtn" data-pay="due" onclick="togglePay('due')">⏳ Due / বাকি</button>
</div>
<div id="payFields"></div>
</div>

<div class="card">
<div class="row"><div><label class="label">Subtotal</label><div id="subTotal" style="font-weight:800">৳ 0</div></div><div><label class="label">Total Due</label><div id="grandTotal" style="font-weight:900;color:#FFD60A;font-size:18px">৳ 0</div></div></div>
<label class="label" style="margin-top:10px">Note</label><input id="note" class="input" placeholder="Thank you!">
<button class="btn btn-yellow" onclick="generatePDF()">📄 Generate Invoice PDF & Save</button>
<div id="shareBtns" style="display:none" class="row" style="margin-top:10px"><button class="btn btn-ghost" onclick="shareFile()">📤 Share</button><button class="btn btn-ghost" onclick="downloadLast()">⬇️ Download</button></div>
</div>
</div>

<div id="p3" class="page"><button onclick="go(1)" style="color:#FFD60A;background:none;border:none">← Back</button><h2 style="margin:12px 0">Invoices</h2><div id="invoiceList"></div></div>
<div id="p4" class="page"><button onclick="go(1)" style="color:#FFD60A;background:none;border:none">← Back</button><h2 style="margin:12px 0">Customers</h2><div id="customerList"></div></div>
<div id="p5" class="page"><button onclick="go(1)" style="color:#FFD60A;background:none;border:none">← Back</button><h2 id="p5Title">Ideas</h2><div id="ideaList"></div></div>
<div id="p6" class="page"><button onclick="go(5)" style="color:#FFD60A;background:none;border:none">← Back</button><h1 id="p6Title"></h1><div id="sections"></div></div>

<div class="bottom">
<button id="b1" class="active" onclick="go(1)">🏠 Home</button>
<button id="b2" onclick="go(2)">🧾 Invoice</button>
<button id="b3" onclick="go(3)">📄 History</button>
<button id="b4" onclick="go(4)">👥 CRM</button>
</div>

<script>
const TG = window.Telegram?.WebApp; TG?.ready(); TG?.expand();
const ownerId = TG?.initDataUnsafe?.user?.id?.toString() || localStorage.getItem('bizmap_owner') || 'demo_'+Math.random().toString(36).slice(2);
localStorage.setItem('bizmap_owner', ownerId);
const SUPA_URL = "${SUPA_URL}";
const SUPA_KEY = "${SUPA_KEY}";

let payMethods = new Set();
let items = [{desc:"", qty:1, price:0}];
let bizProfile = JSON.parse(localStorage.getItem('bizProfile')||'null');
let signatureData = localStorage.getItem('bizSignature')||'';
let lastPdfBlob = null;

document.getElementById('invDate').valueAsDate = new Date();

function checkOnboard(){
  if(!bizProfile){ document.getElementById('onboardModal').style.display='flex'; }
  else { applyBizProfile(); }
}
function saveOnboard(){
  const name=document.getElementById('obBizName').value; if(!name){ alert('Business Name দিন'); return; }
  const addr=document.getElementById('obAddr').value;
  bizProfile={name, addr, invCount:0}; localStorage.setItem('bizProfile', JSON.stringify(bizProfile));
  const file=document.getElementById('obSign').files[0];
  if(file){ const r=new FileReader(); r.onload=e=>{ signatureData=e.target.result; localStorage.setItem('bizSignature', signatureData); finishOnboard(); }; r.readAsDataURL(file); } else { finishOnboard(); }
}
function finishOnboard(){ document.getElementById('onboardModal').style.display='none'; applyBizProfile(); }
function applyBizProfile(){
  document.getElementById('bizBadge').innerText=bizProfile.name;
  document.getElementById('invBizName').innerText=bizProfile.name;
  document.getElementById('invBizAddr').innerText=bizProfile.addr||'';
}
function editBiz(){ bizProfile=null; localStorage.removeItem('bizProfile'); document.getElementById('onboardModal').style.display='flex'; }

function go(n){ document.querySelectorAll('.page').forEach(p=>p.classList.remove('active')); document.getElementById('p'+n).classList.add('active'); document.querySelectorAll('.bottom button').forEach(b=>b.classList.remove('active')); const b=document.getElementById('b'+n); if(b) b.classList.add('active'); if(n===3) loadInvoices(); if(n===4) loadCustomers(); window.scrollTo(0,0); }

function addItem(){ items.push({desc:"", qty:1, price:0}); renderItems(); }
function renderItems(){
  document.getElementById('items').innerHTML = items.map((it, idx)=>\`
    <div class="itemRow">
      <div><input class="input" style="margin:0" placeholder="Item Name" value="\${it.desc}" oninput="items[\${idx}].desc=this.value; calc()"></div>
      <div><input class="input" style="margin:0" type="number" value="\${it.qty}" oninput="items[\${idx}].qty=parseFloat(this.value)||0; calc()"></div>
      <div><input class="input" style="margin:0" type="number" value="\${it.price}" oninput="items[\${idx}].price=parseFloat(this.value)||0; calc()"></div>
      <button onclick="items.splice(\${idx},1); renderItems(); calc()" style="background:#331111;border:none;border-radius:6px;color:#fff;height:36px">✕</button>
    </div>\`).join('');
}
function calc(){
  let sub=0; items.forEach(i=> sub += (i.qty||0)*(i.price||0));
  let disc=parseFloat(document.getElementById('discount').value)||0;
  let tot=sub-disc;
  document.getElementById('subTotal').innerText='৳ '+sub.toFixed(0);
  document.getElementById('grandTotal').innerText='৳ '+tot.toFixed(0);
}
function togglePay(m){
  const btn=document.querySelector('[data-pay="'+m+'"]');
  if(payMethods.has(m)){ payMethods.delete(m); btn.classList.remove('active'); } else { payMethods.add(m); btn.classList.add('active'); }
  renderPayFields();
}
function renderPayFields(){
  let h='';
  if(payMethods.has('bank')) h+='<div style="background:#111;padding:10px;border-radius:10px;margin:6px 0"><b style="font-size:11px">🏦 Bank Details</b><div class="row" style="margin-top:6px"><input id="bankName" class="input" placeholder="Bank Name - Name Bank"><input id="bankAcc" class="input" placeholder="Account No - 123-456-7890"></div><input id="bankBranch" class="input" placeholder="Branch / Email"></div>';
  if(payMethods.has('mobile')) h+='<div style="background:#111;padding:10px;border-radius:10px;margin:6px 0"><b style="font-size:11px">📱 Mobile Pay</b><div class="row" style="margin-top:6px"><select id="mobProv" class="input"><option>bKash</option><option>Nagad</option><option>Rocket</option><option>Upay</option></select><input id="mobNum" class="input" placeholder="Number - 01XXXXXXXXX"></div><input id="mobTrx" class="input" placeholder="TRX ID - Optional"></div>';
  if(payMethods.has('cash')) h+='<div style="background:#111;padding:10px;border-radius:10px;margin:6px 0"><b style="font-size:11px">💵 Cash</b><input id="cashNote" class="input" value="Paid in Cash" style="margin-top:6px"></div>';
  if(payMethods.has('due')) h+='<div style="background:#111;padding:10px;border-radius:10px;margin:6px 0"><b style="font-size:11px">⏳ Due / বাকি</b><div class="row" style="margin-top:6px"><input id="dueAdv" class="input" type="number" placeholder="Advance Paid ৳"><input id="dueDate" class="input" type="date"></div></div>';
  document.getElementById('payFields').innerHTML=h;
}
function getPayDetails(){
  let d={}; if(payMethods.has('bank')) d.bank={name:document.getElementById('bankName')?.value, acc:document.getElementById('bankAcc')?.value, branch:document.getElementById('bankBranch')?.value};
  if(payMethods.has('mobile')) d.mobile={prov:document.getElementById('mobProv')?.value, num:document.getElementById('mobNum')?.value, trx:document.getElementById('mobTrx')?.value};
  if(payMethods.has('cash')) d.cash={note:document.getElementById('cashNote')?.value};
  if(payMethods.has('due')) d.due={adv:document.getElementById('dueAdv')?.value, date:document.getElementById('dueDate')?.value};
  return d;
}
async function generatePDF(){
  if(!bizProfile){ alert('Business Name দিন'); checkOnboard(); return; }
  if(!items[0].desc){ alert('Item add করুন'); return; }
  const { jsPDF } = window.jspdf; const doc = new jsPDF();
  const bizName = bizProfile.name; 
  bizProfile.invCount = (bizProfile.invCount||0)+1; localStorage.setItem('bizProfile', JSON.stringify(bizProfile));
  const invNo = bizName.replace(/\\s+/g,'').substring(0,8).toUpperCase()+'-'+String(bizProfile.invCount).padStart(3,'0');

  // Blue header like template
  doc.setFillColor(30,58,138); doc.rect(0,0,210,42,'F');
  doc.setFontSize(22); doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.text('INVOICE',15,22);
  doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.text('NO: '+invNo,150,22); doc.text('Date: '+(document.getElementById('invDate').value||''),150,27);
  // Bill To
  doc.setTextColor(0,0,0); doc.setFontSize(11); doc.setFont("helvetica","bold"); doc.text('Bill To:',15,52);
  doc.setFontSize(10); doc.setFont("helvetica","normal"); 
  doc.text(document.getElementById('custName').value||'Estelle Darcy',15,58);
  doc.text(document.getElementById('custPhone').value||'+123-456-7890',15,63);
  doc.text(document.getElementById('custAddr').value||'123 Anywhere St',15,68);
  doc.setFontSize(11); doc.setFont("helvetica","bold"); doc.text('From:',150,52);
  doc.setFontSize(10); doc.setFont("helvetica","normal"); doc.text(bizName,150,58); doc.text(bizProfile.addr||'',150,63);

  // Table header
  let y=82; doc.setFillColor(30,64,175); doc.rect(15,y,180,8,'F'); doc.setTextColor(255,255,255); doc.setFontSize(9); doc.setFont("helvetica","bold");
  doc.text('Description',17,y+5); doc.text('Qty',100,y+5); doc.text('Price',125,y+5); doc.text('Total',165,y+5);
  doc.setTextColor(0,0,0); y+=10; doc.setFont("helvetica","normal");
  items.forEach(it=>{
    doc.text(it.desc||'Your Description',17,y); doc.text(String(it.qty),102,y); doc.text('Tk '+it.price,127,y); doc.text('Tk '+(it.qty*it.price).toFixed(0),167,y);
    doc.setDrawColor(200); doc.rect(15,y-4,180,8); y+=8;
  });
  y+=4; const total=document.getElementById('grandTotal').innerText;
  doc.setFillColor(30,64,175); doc.rect(115,y,80,8,'F'); doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.text('Sub Total',117,y+5); doc.text(total,165,y+5);
  y+=16; doc.setTextColor(0,0,0); doc.setFontSize(9); doc.text('Note: '+(document.getElementById('note').value||'Thank you for your business'),15,y);
  y+=10; doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.text('Payment Information:',15,y); y+=5; doc.setFont("helvetica","normal"); doc.setFontSize(9);
  const pay=getPayDetails();
  if(pay.bank){ doc.text('Bank: '+pay.bank.name+' | No: '+pay.bank.acc+' | '+pay.bank.branch,15,y); y+=5; }
  if(pay.mobile){ doc.text(pay.mobile.prov+': '+pay.mobile.num+' | TRX: '+pay.mobile.trx,15,y); y+=5; }
  if(pay.cash){ doc.text(pay.cash.note,15,y); y+=5; }
  if(pay.due){ doc.text('Advance: Tk '+pay.due.adv+' | Due Date: '+pay.due.date,15,y); y+=5; }
  y+=8; doc.setFontSize(13); doc.setFont("helvetica","bold"); doc.text('Thank You!',140,y);
  // Signature
  if(signatureData){ try{ doc.addImage(signatureData,'PNG',140,y+5,40,15); doc.text(bizName,140,y+25); }catch(e){} }

  const blob=doc.output('blob'); lastPdfBlob=blob;
  const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=invNo+'.pdf'; a.click();
  document.getElementById('shareBtns').style.display='grid';
  saveToSupabase(invNo);
}
function shareFile(){ if(navigator.share && lastPdfBlob){ const file=new File([lastPdfBlob],'invoice.pdf',{type:'application/pdf'}); navigator.share({files:[file], title:'Invoice'}); } else alert('Download kore share korun!'); }
function downloadLast(){ if(lastPdfBlob){ const url=URL.createObjectURL(lastPdfBlob); const a=document.createElement('a'); a.href=url; a.download='invoice.pdf'; a.click(); } }

async function saveToSupabase(invNo){
  if(!SUPA_URL){ console.log('Supabase not configured'); return; }
  try{
    const body={ invoice_no:invNo, owner_id:ownerId, customer_name:document.getElementById('custName').value, customer_phone:document.getElementById('custPhone').value, items:items, subtotal:0, total:parseFloat(document.getElementById('grandTotal').innerText.replace('৳',''))||0, payment_method:Array.from(payMethods).join(','), payment_details:getPayDetails() };
    await fetch(SUPA_URL+'/rest/v1/invoices', {method:'POST', headers:{'apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY,'Content-Type':'application/json'}, body:JSON.stringify(body)});
    // also save customer
    await fetch(SUPA_URL+'/rest/v1/customers', {method:'POST', headers:{'apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY,'Content-Type':'application/json'}, body:JSON.stringify({owner_id:ownerId, name:body.customer_name, phone:body.customer_phone})});
  }catch(e){ console.log(e); }
}
async function loadInvoices(){
  if(!SUPA_URL){ document.getElementById('invoiceList').innerHTML='<div class="card">Supabase URL set korun Cloudflare e</div>'; return; }
  try{ const r=await fetch(SUPA_URL+'/rest/v1/invoices?owner_id=eq.'+ownerId+'&order=created_at.desc', {headers:{'apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY}}); const d=await r.json(); document.getElementById('invoiceList').innerHTML=d.map(i=>'<div class="card"><b>'+i.invoice_no+'</b> - '+i.customer_name+'<br>৳'+i.total+' | '+i.payment_method+'<br><span style="font-size:11px;color:#666">'+new Date(i.created_at).toLocaleString()+'</span></div>').join('')||'<div class="card">No invoices</div>'; }catch(e){ document.getElementById('invoiceList').innerHTML='<div class="card">Error: '+e+'</div>'; }
}
async function loadCustomers(){
  if(!SUPA_URL){ document.getElementById('customerList').innerHTML='<div class="card">Supabase connect korun</div>'; return; }
  try{ const r=await fetch(SUPA_URL+'/rest/v1/customers?owner_id=eq.'+ownerId, {headers:{'apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY}}); const d=await r.json(); document.getElementById('customerList').innerHTML=d.map(c=>'<div class="card"><b>'+c.name+'</b><br>'+c.phone+'</div>').join('')||'<div class="card">No customers</div>'; }catch(e){}
}

// Old Idea DB kept for Home
const DB=[
{id:1, sector:"Retail", title:"Small Grocery Partnership", short:"Partner with mudir dokan", capital:"৳20k-50k", what:"Supply to existing shops on commission"},
{id:2, sector:"Retail", title:"Bkash/Nagad Agency", short:"Lowest risk retail", capital:"৳5k-20k", what:"Commission service"},
{id:3, sector:"Agriculture", title:"Hydroponic Fodder", short:"Grow grass without soil", capital:"৳20k-100k", what:"Sell to dairy farms"}
];
function renderSectors(){
  const sectors=[...new Set(DB.map(x=>x.sector))];
  document.getElementById('sectorGrid').innerHTML=sectors.map(s=>'<div class="sCard" onclick="openSector(\\''+s+'\\')"><div style="font-size:22px">📦</div><div style="font-weight:700;margin-top:6px">'+s+'</div><div style="color:#666;font-size:11px">'+DB.filter(x=>x.sector===s).length+' ideas</div></div>').join('');
}
function openSector(s){
  document.getElementById('p5Title').innerText=s; document.getElementById('ideaList').innerHTML=DB.filter(x=>x.sector===s).map(i=>'<div class="card" onclick="openIdea('+i.id+')"><b>'+i.title+'</b><div style="font-size:11px;color:#666">'+i.short+'</div><div style="margin-top:6px"><span style="background:#222;padding:3px 8px;border-radius:10px;font-size:10px">'+i.capital+'</span></div></div>').join(''); go(5);
}
function openIdea(id){
  const c=DB.find(x=>x.id===id); document.getElementById('p6Title').innerText=c.title;
  document.getElementById('sections').innerHTML='<div class="card">'+c.what+'</div><div class="card"><b>Capital:</b> '+c.capital+'</div>'; go(6);
}

renderItems(); calc(); checkOnboard(); renderSectors();
<\/script>
</body>
</html>`;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }
}
