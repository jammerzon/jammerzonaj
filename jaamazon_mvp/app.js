/* Jaamazon MVP: all-client static app
   - To switch to Google Sheets JSON via opensheet: set DATA_URL to your sheet endpoint
*/
const DATA_URL = 'data/sample_listings.json'; // replace with opensheet URL when ready
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/placeholder/viewform'; // replace with your form

const els = {
  q: null, category: null, priceType: null, sort: null,
  listings: null, stats: null
};
let raw = [];
let fuse;

function $(id){ return document.getElementById(id); }

function currencyBadge(l){
  if(l.priceType==='trade') return '<span class="badge">Trade only</span>';
  const unit = l.priceType==='sapphires'?'💎':'🪙';
  return `<span class="badge">${unit} ${l.price}</span>`;
}

function card(l){
  const img = l.image || '';
  const wants = l.wants?.length ? l.wants.join(', ') : 'Any fair offer';
  const when = new Date(l.postedAt).toLocaleString();
  return `<article class="card">
    <div class="thumb">${img ? `<img src="${img}" alt="" style="max-width:100%;max-height:100%">` : 'No image'}</div>
    <div class="body">
      <div class="title">${l.title}</div>
      <div class="badges">
        <span class="badge">${l.category}</span>
        ${l.priceType ? currencyBadge(l) : ''}
        ${l.rarity ? `<span class="badge">${l.rarity}</span>` : ''}
      </div>
      <div class="muted">Wants: ${wants}</div>
      ${l.notes ? `<div class="muted">Notes: ${l.notes}</div>`:''}
      <div class="meta"><span>${l.user || 'user'}</span><span>${when}</span></div>
      ${l.contact ? `<div class="muted">Contact: ${l.contact}</div>`:''}
    </div>
  </article>`;
}

function render(list){
  els.listings.innerHTML = list.length ? list.map(card).join('') : `<div class="empty">No listings match your filters.</div>`;
  els.stats.textContent = `${list.length} result${list.length===1?'':'s'} · ${raw.length} total`;
}

function applyFilters(){
  const q = els.q.value.trim();
  const cat = els.category.value;
  const p = els.priceType.value;
  const sort = els.sort.value;
  let list = raw.slice();

  if(q){
    const results = fuse.search(q, { limit: 200 });
    list = results.map(r => r.item);
  }
  if(cat) list = list.filter(x => x.category===cat);
  if(p) list = list.filter(x => x.priceType===p);
  if(sort==='newest') list.sort((a,b)=> new Date(b.postedAt)-new Date(a.postedAt));
  if(sort==='priceLow') list.sort((a,b)=> (a.price??Infinity)-(b.price??Infinity));
  if(sort==='priceHigh') list.sort((a,b)=> (b.price??-Infinity)-(a.price??-Infinity));

  render(list);
}

async function load(){
  try{
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    const data = await res.json();
    raw = data;
    fuse = new Fuse(raw, { keys: ['title','wants','notes','category','rarity','user'], threshold: 0.35, ignoreLocation:true });
    applyFilters();
  }catch(e){
    console.error(e);
    els.listings.innerHTML = '<div class="empty">Failed to load listings. Check DATA_URL.</div>';
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  els.q = $('q'); els.category = $('category'); els.priceType = $('priceType'); els.sort = $('sort');
  els.listings = $('listings'); els.stats = $('stats');
  document.getElementById('year').textContent = new Date().getFullYear();

  $('postListing').addEventListener('click', (e)=>{
    e.preventDefault();
    window.open(GOOGLE_FORM_URL, '_blank');
  });
  $('refresh').addEventListener('click', (e)=>{
    e.preventDefault(); load();
  });

  [els.q, els.category, els.priceType, els.sort].forEach(el=> el.addEventListener('input', applyFilters));
  load();
});
