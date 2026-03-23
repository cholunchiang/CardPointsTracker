// ============================================================================
// RENDER.JS - UI Rendering Functions
// Handles all view rendering for cards, miles, coupons, and summary
// ============================================================================

/**
 * Helper: Get tag color class based on index
 * Cycles through color palette for consistent styling
 */
function tc(i) { 
  return TC[i % TC.length]; 
}

/**
 * Helper: Generate HTML for card icon (bank logo or emoji)
 * Uses bank branding if recognized, otherwise falls back to default gray styling
 */
function cardIconHtml(c) {
  const key   = (c.bank || '').toLowerCase();
  const brand = Object.entries(BANK_BRANDS).find(([k]) => key.includes(k))?.[1];
  if (brand) {
    return `<div style="width:36px;height:36px;border-radius:8px;background:${brand.bg};display:flex;align-items:center;justify-content:center;font-size:${brand.abbr.length>4?8:9}px;font-weight:800;color:${brand.fg};letter-spacing:0.2px;font-family:-apple-system,sans-serif">${brand.abbr}</div>`;
  }
  // For unknown banks, display with default gray styling and emoji if available
  if (c.icon) {
    return `<div style="width:36px;height:36px;border-radius:8px;background:#8E8E9322;display:flex;align-items:center;justify-content:center;font-size:20px">${c.icon}</div>`;
  }
  // Fallback: generic bank emoji
  return `<div style="width:36px;height:36px;border-radius:8px;background:#8E8E9322;display:flex;align-items:center;justify-content:center;font-size:20px">🏦</div>`;
}

/**
 * Main render orchestrator
 * Determines which view to display based on current navigation
 */
function renderAll() {
  buildTabs();
  const area = document.getElementById('contentArea');
  const list = filtered();
  
  if (currentNav==='cards')   renderCards(area, list);
  else if (currentNav==='miles')   renderMiles(area, list);
  else if (currentNav==='coupons') renderCoupons(area, list);
  else renderSummary(area);
}

/**
 * Render cards view with search filtering and statement date progress
 */
function renderCards(area, list) {
  if (!list.length) { 
    area.innerHTML = `<div class="empty-state"><span class="big-emoji">💳</span><strong>No cards yet</strong>Tap + to add your first card</div>`; 
    return; 
  }
  
  area.innerHTML = list.map(c => {
    const due      = c.due ? new Date(c.due).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : '';
    const daysLeft = c.due ? Math.ceil((new Date(c.due)-new Date())/86400000) : 99;
    const prog     = Math.max(0, Math.min(100, (1-daysLeft/30)*100));
    const owner    = (c.owner||'Me').toLowerCase();
    
    return `<div class="card-tile" onclick="openDetail(${c.id})">
      <div class="card-tile-header">
        <div class="card-icon" style="background:${c.color}22">${cardIconHtml(c)}</div>
        <div class="card-title-block">
          <div class="card-name">${c.name}</div>
          <div class="card-bank"><span class="bank-chip">${c.bank}</span> <span class="owner-chip owner-${owner}">${c.owner||'Me'}</span></div>
        </div>
        <div class="points-badge"><div class="points-num">${c.points.toLocaleString()}</div><div class="points-unit">pts</div></div>
      </div>
      <div class="tags-row">${c.perks.slice(0,4).map((p,i)=>`<span class="tag ${tc(i)}">${p}</span>`).join('')}</div>
      ${c.due ? `<div class="progress-section">
        <div class="progress-label"><span>Statement ${due}</span><span>${daysLeft>0?daysLeft+' days':'Today!'}</span></div>
        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${prog}%"></div></div>
      </div>` : ''}
    </div>`;
  }).join('');
}

/**
 * Render miles view showing transfer partners and redemption values
 */
function renderMiles(area, list) {
  if (!list.length) { 
    area.innerHTML = `<div class="empty-state"><span class="big-emoji">✈️</span><strong>No cards found</strong></div>`; 
    return; 
  }
  
  const pm = {};
  list.forEach(c => c.redeem.forEach(r => { 
    if (!pm[r.name]) pm[r.name]=[]; 
    pm[r.name].push({card:c,ratio:r.ratio,est:r.est}); 
  }));
  
  let html = `<div class="section-label">Transfer Partners by Card</div>`;
  
  list.forEach(c => {
    html += `<div class="card-tile">
      <div class="card-tile-header">
        <div class="card-icon" style="background:${c.color}22">${cardIconHtml(c)}</div>
        <div class="card-title-block"><div class="card-name">${c.name}</div><div class="card-bank"><span class="bank-chip">${c.bank}</span></div></div>
        <div class="points-badge"><div class="points-num">${c.points.toLocaleString()}</div><div class="points-unit">pts</div></div>
      </div>
      ${c.redeem.map(r=>`<div class="redemption-item"><div><div class="redemption-name">${r.name}</div><div class="redemption-ratio">Ratio ${r.ratio}</div></div><div class="redemption-value">${r.est.toLocaleString()} mi</div></div>`).join('')}
    </div>`;
  });
  
  html += `<div class="section-label" style="margin-top:20px">Combined by Partner</div>`;
  Object.entries(pm).forEach(([name, es]) => {
    const tot  = es.reduce((s,e)=>s+e.est,0);
    const from = es.map(e=>`${e.card.icon} ${e.card.name}`).join(', ');
    html += `<div class="redemption-item" style="display:block;margin-bottom:10px">
      <div style="font-size:15px;font-weight:700;margin-bottom:4px">🛫 ${name}</div>
      <div style="font-size:12px;opacity:0.6;margin-bottom:6px">From: ${from}</div>
      <div style="font-size:22px;font-weight:800">${tot.toLocaleString()} <span style="font-size:13px;font-weight:500;opacity:0.7">miles</span></div>
    </div>`;
  });
  
  area.innerHTML = html;
}

/**
 * Render coupons/perks view with period-based benefit tracking
 * Shows benefits organized by card with period boxes for tracking usage
 */
function renderCoupons(area, list) {
  let html = '', has = false;
  
  list.forEach(c => {
    if (!c.coupons||!c.coupons.length) return;
    has = true;
    
    html += `<div class="card-tile" style="cursor:default">
      <div class="card-tile-header" style="margin-bottom:12px">
        <div class="card-icon" style="background:${c.color}22">${cardIconHtml(c)}</div>
        <div class="card-title-block"><div class="card-name">${c.name}</div><div class="card-bank"><span class="bank-chip">${c.bank}</span></div></div>
      </div>`;
    
    // Render each benefit card
    c.coupons.forEach((benefit, bidx) => {
      const recurrence = benefit.recurrence || 'annual';
      const periodLabels = getPeriodLabels(recurrence);
      const periods = benefit.periods || {};
      const yearlyTotal = benefit.yearlyTotal || benefit.amount || 0;
      const usedTotal = getBenefitUsedTotal(benefit);
      
      const periodBoxesHtml = periodLabels.map((label, pidx) => {
        const periodKey = getPeriodKey(recurrence, pidx);
        const periodData = periods[periodKey] || { used: false, amount: 0 };
        const isUsed = periodData.used;
        return `<div class="period-box ${isUsed ? 'used' : ''}" onclick="toggleBenefitPeriod(${c.id},${bidx},'${periodKey}')" title="${label}${periodData.amount > 0 ? ': $' + periodData.amount : ''}">${label}</div>`;
      }).join('');
      
      html += `<div class="benefit-card">
        <div class="benefit-header">
          <div style="flex:1">
            <div class="benefit-text">${benefit.text}</div>
            <div class="benefit-meta">$${usedTotal}/$${yearlyTotal} · ${recurrence}</div>
          </div>
        </div>
        <div class="benefit-periods">
          ${periodBoxesHtml}
        </div>
      </div>`;
    });
    
    html += `</div>`;
  });
  
  if (!has) html = `<div class="empty-state"><span class="big-emoji">🎁</span><strong>No perks yet</strong>Add benefits when creating a card</div>`;
  
  area.innerHTML = html;
}

/**
 * Render summary view with totals, alerts, and point distribution
 */
function renderSummary(area) {
  const totalPts   = cards.reduce((s,c)=>s+(c.points||0),0);
  const totalMiles = cards.reduce((s,c)=>s+c.redeem.reduce((a,r)=>a+r.est,0),0);
  const totalPerks = cards.reduce((s,c)=>s+(c.coupons||[]).filter(x=>!x.done).length,0);
  const expiring   = cards.filter(c=>c.due&&Math.ceil((new Date(c.due)-new Date())/86400000)<=7);
  
  area.innerHTML = `
    <div class="summary-card">
      <div class="summary-title">💰 Total Points — All Cards</div>
      <div class="summary-num">${totalPts.toLocaleString()}</div>
      <div class="summary-sub">${cards.length} cards tracked</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      <div class="redemption-item" style="display:block;text-align:center">
        <div style="font-size:28px;font-weight:800">${totalMiles.toLocaleString()}</div>
        <div style="font-size:12px;opacity:0.6;margin-top:2px">✈️ Est. Miles</div>
      </div>
      <div class="redemption-item" style="display:block;text-align:center">
        <div style="font-size:28px;font-weight:800">${totalPerks}</div>
        <div style="font-size:12px;opacity:0.6;margin-top:2px">🎁 Unused Perks</div>
      </div>
    </div>
    ${expiring.length?`<div class="section-label">⚠️ Statement Due Soon</div>${expiring.map(c=>`
    <div class="card-tile" onclick="openDetail(${c.id})" style="border-left:3px solid #FF9500">
      <div class="card-tile-header" style="margin-bottom:0">
        <div class="card-icon" style="background:${c.color}22">${cardIconHtml(c)}</div>
        <div class="card-title-block"><div class="card-name">${c.name}</div></div>
        <div class="points-badge"><div class="points-num" style="color:#FF9500">${Math.ceil((new Date(c.due)-new Date())/86400000)}</div><div class="points-unit">days</div></div>
      </div>
    </div>`).join('')}`:''}
    <div class="section-label" style="margin-top:20px">☁️ iCloud Backup</div>
    <p class="backup-info">Export saves your cards & history as a JSON file.<br>On iPhone, tap Share → Save to Files → iCloud Drive.</p>
    <button class="backup-btn backup-export" onclick="exportBackup()">⬇️ Export Backup</button>
    <button class="backup-btn backup-import" onclick="document.getElementById('restore-input').click()">⬆️ Import Backup</button>
    <input type="file" id="restore-input" accept=".json" onchange="importBackup(event)" />

    <div class="section-label">Points Distribution</div>    ${cards.map(c=>{
      const pct = totalPts>0?(c.points/totalPts*100).toFixed(1):0;
      return `<div class="redemption-item" style="display:block;margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:14px;font-weight:600;display:flex;align-items:center;gap:6px"><span style="width:22px;height:22px;border-radius:5px;background:${c.color}22;display:inline-flex;align-items:center;justify-content:center;overflow:hidden">${cardIconHtml(c)}</span> ${c.name}</span>
          <span style="font-size:15px;font-weight:700">${c.points.toLocaleString()}</span>
        </div>
        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${pct}%;background:${c.color}"></div></div>
        <div style="font-size:11px;opacity:0.55;margin-top:3px;text-align:right">${pct}%</div>
      </div>`;
    }).join('')}`;
}

/**
 * Build tab navigation with owner and bank filters
 */
function buildTabs() {
  const opts   = ['all','Me','Wife','Shared', ...new Set(cards.map(c => c.bank))];
  const labels = { all:'All Cards', Me:'👤 Mine', Wife:'👸 Wife', Shared:'👥 Shared' };
  document.getElementById('tabRow').innerHTML = opts.map(o =>
    `<button class="tab-pill ${o===currentTab?'active':''}" onclick="setTab('${o}')">${labels[o]||o}</button>`
  ).join('');
}
