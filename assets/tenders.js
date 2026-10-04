const tenders = [
  {id:'ATM-2026-4182',buyer:'Australian Department of Defence',requirement:'Multi-provider geospatial collection and imagery delivery capability',country:'AU',source:'AusTender',deadline:'Closes 9 Oct · 5:00 PM AEDT',change:'Closing in 3 days',changeKind:'closing',fit:'Strong fit',reason:'Constellation Orchestration + Automation Workflows',evidence:'“Coordination and tasking of imagery collection across multiple commercial providers.”',status:'attention',tracked:false,playbook:'Defence'},
  {id:'ESA-EO-274',buyer:'European Space Agency',requirement:'Automated Earth observation data access and processing services',country:'EU',source:'ESA-star',deadline:'Closes 14 Oct · time not stated',change:'Requirement amended',changeKind:'changed',fit:'Strong fit',reason:'Automation Workflows + Data Infrastructure',evidence:'The amended requirement calls for automated ordering, normalisation and downstream delivery.',status:'attention',tracked:true,playbook:'Earth Observation'},
  {id:'RFI-25-091',buyer:'United States Space Force',requirement:'Commercial imagery tasking and collection orchestration platform',country:'US',source:'SAM.gov',deadline:'Closes 18 Oct · 2:00 PM EDT',change:'New',changeKind:'new',fit:'Strong fit',reason:'Constellation Orchestration',evidence:'The requirement includes tasking across a mixed fleet of commercial imaging providers.',status:'attention',tracked:false,playbook:'Defence'},
  {id:'NRCan-500007',buyer:'Natural Resources Canada',requirement:'Wildfire monitoring data supply and rapid delivery services',country:'CA',source:'CanadaBuys',deadline:'Closes 22 Oct · time not stated',change:'New documents',changeKind:'changed',fit:'Possible fit',reason:'Rapid imagery delivery requirement detected',evidence:'Source documents request a delivery service but do not yet specify orchestration requirements.',status:'attention',tracked:false,playbook:'Earth Observation'},
  {id:'NSW-ICT-8921',buyer:'NSW Department of Planning',requirement:'Spatial data catalogue modernisation and cloud migration',country:'AU',source:'buy.nsw',deadline:'Closes 28 Oct · 3:00 PM AEDT',fit:'Possible fit',reason:'Data infrastructure requirement detected',evidence:'The scope includes spatial catalogue migration and API-based access.',status:'all',tracked:true,playbook:'Earth Observation'},
  {id:'BBC-SAT-44',buyer:'British Broadcasting Corporation',requirement:'Satellite television broadcasting and transponder services',country:'GB',source:'Find a Tender',deadline:'Closes 2 Nov · time not stated',fit:'No clear fit yet',reason:'No offering-level requirement match',evidence:'“Satellite” appears in the notice, but the requirement is for television broadcasting rather than configured offerings.',status:'all',tracked:false,playbook:''},
  {id:'DMP-26-113',buyer:'Geological Survey of Western Australia',requirement:'Mining change-detection analytics using repeat optical imagery',country:'AU',source:'Tenders WA',deadline:'Closes 6 Nov · 11:00 AM AWST',change:'New',changeKind:'new',fit:'Possible fit',reason:'Earth observation analytics requirement detected',evidence:'The notice seeks repeat optical imagery inputs for change-detection analytics.',status:'all',tracked:true,playbook:'Mining'}
];

const list = document.querySelector('#tender-results');
const summary = document.querySelector('#result-label');
const empty = document.querySelector('.empty-state');
const search = document.querySelector('#tender-search');
const geography = document.querySelector('#geography');
const playbook = document.querySelector('#playbook');
const source = document.querySelector('#source');
let activeView = 'attention';

function searchable(tender) { return [tender.requirement,tender.buyer,tender.id,tender.reason,tender.source].join(' ').toLowerCase(); }
function fitClass(fit){ return fit.startsWith('Strong') ? '' : fit.startsWith('Possible') ? 'fit-possible' : 'fit-none'; }
function cardTemplate(tender){
  const change = tender.change ? `<span class="change ${tender.changeKind}">${tender.change}</span>` : '';
  const trackedClass = tender.tracked ? ' tracked' : '';
  return `<article class="tender-card${trackedClass}" data-id="${tender.id}">
    <div class="card-content">
      <div class="tender-header">${change}<span class="country">${tender.country}</span><span class="buyer">${tender.buyer}</span></div>
      <h2 class="requirement">${tender.requirement}</h2>
      <div class="why ${fitClass(tender.fit)}"><span class="fit-icon" aria-hidden="true">✓</span><button type="button" aria-expanded="false"><strong>${tender.fit}</strong> · ${tender.reason} <span aria-hidden="true">⌄</span></button></div>
      <div class="evidence"><strong>Supporting evidence</strong><br>${tender.evidence}</div>
      <div class="meta"><span>Ref ${tender.id}</span><span class="dot">•</span><span>${tender.source}</span><span class="dot">•</span><a href="#" aria-label="Open official notice for ${tender.requirement}">Official notice ↗</a></div>
    </div>
    <div class="card-actions">
      <p class="deadline"><strong>${tender.deadline.split(' · ')[0]}</strong>${tender.deadline.includes(' · ') ? tender.deadline.split(' · ').slice(1).join(' · ') : ''}</p>
      <button class="primary" type="button">${tender.tracked ? '✓ Tracked' : 'Review'}</button>
      <div class="secondary-actions"><button class="secondary track" type="button">${tender.tracked ? 'Untrack' : 'Track'}</button><button class="secondary dismiss" type="button">Dismiss</button></div>
    </div>
  </article>`;
}

function render(){
  const term = search.value.trim().toLowerCase();
  const items = tenders.filter(t => {
    const viewMatch = activeView === 'all' || (activeView === 'tracked' ? t.tracked : t.status === 'attention');
    return viewMatch && (!term || searchable(t).includes(term)) && (!geography.value || t.country === geography.value) && (!playbook.value || t.playbook === playbook.value) && (!source.value || t.source === source.value);
  });
  list.innerHTML = items.map(cardTemplate).join('');
  list.hidden = items.length === 0; empty.hidden = items.length !== 0;
  const label = activeView === 'attention' ? 'ordered by what needs your attention' : activeView === 'tracked' ? 'being watched for material changes' : 'in the workspace procurement corpus';
  summary.innerHTML = `<strong>${items.length} ${items.length === 1 ? 'opportunity' : 'opportunities'}</strong> ${label}`;
}

document.querySelectorAll('[role=tab]').forEach(tab => tab.addEventListener('click', () => {
  activeView = tab.dataset.view;
  document.querySelectorAll('[role=tab]').forEach(item => item.setAttribute('aria-selected', String(item === tab)));
  render();
}));
[search,geography,playbook,source].forEach(control => control.addEventListener(control === search ? 'input' : 'change', render));
document.addEventListener('click', event => {
  const why = event.target.closest('.why button');
  if(why){ const evidence = why.closest('.card-content').querySelector('.evidence'); evidence.classList.toggle('open'); why.setAttribute('aria-expanded', String(evidence.classList.contains('open'))); }
  const track = event.target.closest('.track');
  if(track){ const tender = tenders.find(item => item.id === track.closest('.tender-card').dataset.id); tender.tracked = !tender.tracked; render(); }
  const dismiss = event.target.closest('.dismiss');
  if(dismiss){ const tender = tenders.find(item => item.id === dismiss.closest('.tender-card').dataset.id); tender.status = 'all'; render(); }
  if(event.target.closest('[data-show-all]')) document.querySelector('[data-view=all]').click();
});

const drawer = document.querySelector('#coverage-drawer');
const trigger = document.querySelector('.coverage-trigger');
function closeDrawer(){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); trigger.setAttribute('aria-expanded','false'); trigger.focus(); }
trigger.addEventListener('click',()=>{drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');trigger.setAttribute('aria-expanded','true');drawer.querySelector('.drawer-close').focus();});
document.querySelectorAll('[data-close-drawer]').forEach(button=>button.addEventListener('click',closeDrawer));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&drawer.classList.contains('open'))closeDrawer();});
const dialog=document.querySelector('#filter-dialog');
document.querySelectorAll('[data-open-filters]').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
document.querySelector('.refresh').addEventListener('click',event=>{event.currentTarget.innerHTML='<span aria-hidden="true">✓</span> Updated';setTimeout(()=>event.currentTarget.innerHTML='<span aria-hidden="true">↻</span> Refresh',1400);});
render();
