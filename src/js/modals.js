// ============================================================================
// MODALS.JS - Modal Handler Functions
// Manages all modal interactions: detail, add card, and log points
// ============================================================================

/**
 * Open detail modal for a specific card
 * Shows all card information, benefits, transfer partners, and history
 */
function openDetail(id) {
  const c = cards.find(x=>x.id===id); 
  if (!c) return;
  
  const due   = c.due ? new Date(c.due).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) : 'Not set';
  const owner = (c.owner||'Me').toLowerCase();
  
  document.getElementById('detailModalContent').innerHTML = `
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">${cardIconHtml(c)} ${c.name}</span>
      <div style="display:flex;gap:8px">
        <button class="close-btn" onclick="deleteCard(${c.id})" style="background:rgba(255,59,48,0.15);color:#FF3B30">🗑️</button>
        <button class="close-btn" onclick="closeDetailModal()">✕</button>
      </div>
    </div>
    <div class="modal-body">
      <div class="detail-row"><div class="detail-icon-bg">🏦</div><div class="detail-content"><div class="detail-label">Bank</div><div class="detail-value">${c.bank}</div></div></div>
      <div class="detail-row"><div class="detail-icon-bg">👤</div><div class="detail-content"><div class="detail-label">Owner</div><div class="detail-value"><span class="owner-chip owner-${owner}">${c.owner||'Me'}</span></div></div></div>
      <div class="detail-row"><div class="detail-icon-bg">💰</div><div class="detail-content"><div class="detail-label">Current Points</div><div class="detail-value" style="font-size:20px;font-weight:700">${c.points.toLocaleString()} pts</div></div></div>
      <div class="detail-row"><div class="detail-icon-bg">📅</div><div class="detail-content"><div class="detail-label">Statement Date</div><div class="detail-value">${due}</div></div></div>
      <div class="detail-row" style="border:none"><div class="detail-icon-bg">🏷️</div><div class="detail-content"><div class="detail-label">Reward Categories</div>
        <div class="tags-row" style="margin-top:6px">${c.perks.map((p,i)=>`<span class="tag ${tc(i)}">${p}</span>`).join(' ')}</div>
      </div></div>
      ${c.redeem.length?`<div style="font-size:14px;font-weight:700;margin:10px 0 8px">✈️ Transfer Partners</div>
        ${c.redeem.map(r=>`<div class="redemption-item"><div><div class="redemption-name">${r.name}</div><div class="redemption-ratio">Ratio ${r.ratio}</div></div><div class="redemption-value">${r.est.toLocaleString()} mi</div></div>`).join('')}`:''}
      ${(c.coupons||[]).length?`<div style="font-size:14px;font-weight:700;margin:14px 0 8px">🎁 Annual Benefits</div>
        ${c.coupons.map((x,xi)=>`<div class="coupon-item ${x.done?'used':''}">
          <button class="coupon-check ${x.done?'done':''}" onclick="toggleCouponDetail(${c.id},${xi})">${x.done?'✓':'!'}</button>
          <div style="flex:1"><div class="coupon-text">${x.text}</div>${x.expiry?`<div class="coupon-expiry">Expires ${new Date(x.expiry).toLocaleDateString('en-US')}</div>`:''}</div>
        </div>`).join('')}`:''}

      <button class="log-btn" onclick="openLogModal(${c.id})">📊 Log Points</button>

      ${(c.history||[]).length ? `
        <div style="font-size:14px;font-weight:700;margin:18px 0 8px">📈 Point History</div>
        ${c.history.slice(0,20).map(h=>`
          <div class="hist-item hist-${h.type}">
            <div class="hist-dot">${h.type==='earned'?'📈':'📉'}</div>
            <div class="hist-body">
              <div class="hist-amount">${h.type==='earned'?'+':''}${h.amount.toLocaleString()} pts</div>
              <div class="hist-meta">${new Date(h.date).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}</div>
              ${h.note?`<div class="hist-note">"${h.note}"</div>`:''}
            </div>
          </div>`).join('')}
      ` : `<div style="font-size:13px;opacity:0.45;text-align:center;padding:16px 0">No history yet — tap Log Points to start tracking</div>`}
    </div>`;
  
  document.getElementById('detailModal').classList.remove('hidden');
}

/**
 * Close detail modal
 */
function closeDetailModal() { 
  document.getElementById('detailModal').classList.add('hidden'); 
}

/**
 * Open add card modal with bank selection and form
 */
function openAddModal() {
  // Render bank badge grid
  document.getElementById('bankGrid').innerHTML = BANK_LIST.map(b =>
    `<button type="button" class="bank-badge-btn" data-bank="${b.name}" onclick="selectBank('${b.name}')"
      style="padding:8px 4px;border-radius:12px;border:2px solid transparent;background:rgba(128,128,128,0.08);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px;transition:all 0.15s">
      <div style="width:40px;height:40px;border-radius:10px;background:${b.bg};display:flex;align-items:center;justify-content:center;font-size:${b.abbr.length>4?8:10}px;font-weight:800;color:${b.fg};letter-spacing:0.2px">${b.abbr}</div>
      <span style="font-size:9px;font-weight:500;opacity:0.7;text-align:center;line-height:1.2">${b.name.replace('American Express','Amex').replace('Bank of America','BofA').replace('Navy Federal','Navy Fed')}</span>
    </button>`
  ).join('');
  
  // Reset all fields
  ['f-name','f-points','f-due','f-perks','f-redeem','f-ratio','f-coupons'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-bank').value = '';
  selColor = '#007AFF';
  selEmoji = '';
  
  document.getElementById('addModal').classList.remove('hidden');
}

/**
 * Close add card modal
 */
function closeAddModal() { 
  document.getElementById('addModal').classList.add('hidden'); 
}

/**
 * Open log points modal for a specific card
 */
function openLogModal(id) {
  logCardId = id;
  logType   = 'earned';
  setLogType('earned');
  document.getElementById('log-amount').value = '';
  document.getElementById('log-note').value   = '';
  document.getElementById('log-date').value   = new Date().toISOString().slice(0,10);
  document.getElementById('logModal').classList.remove('hidden');
}

/**
 * Close log points modal
 */
function closeLogModal() { 
  document.getElementById('logModal').classList.add('hidden'); 
}

/**
 * Toggle coupon done status in coupons view
 */
function toggleCoupon(cid,idx) {
  const c=cards.find(x=>x.id===cid);
  if(c&&c.coupons[idx]){
    c.coupons[idx].done=!c.coupons[idx].done;
    saveCards();
    renderAll();
  }
}

/**
 * Toggle coupon done status in detail modal (with refresh)
 */
function toggleCouponDetail(cid,idx) {
  const c=cards.find(x=>x.id===cid);
  if(c&&c.coupons[idx]){
    c.coupons[idx].done=!c.coupons[idx].done;
    saveCards();
    openDetail(cid);
    renderAll();
  }
}

/**
 * Delete a card after confirmation
 */
function deleteCard(id) {
  if(confirm('Delete this card?')){
    cards=cards.filter(c=>c.id!==id);
    saveCards();
    closeDetailModal();
    renderAll();
  }
}

/**
 * Select bank from the bank grid and highlight it
 * Auto-fills color from bank branding
 * For "Other", clears the field and focuses for custom input
 */
function selectBank(name) {
  // Highlight selected badge
  document.querySelectorAll('.bank-badge-btn').forEach(b => {
    const isSelected = b.dataset.bank === name;
    b.style.borderColor = isSelected ? '#007AFF' : 'transparent';
    b.style.background  = isSelected ? 'rgba(0,122,255,0.1)' : 'rgba(128,128,128,0.08)';
  });
  
  // Handle "Other" - clear field and focus for manual input
  if (name === 'Other') {
    document.getElementById('f-bank').value = '';
    document.getElementById('f-bank').focus();
    // Don't set color for "Other"
    return;
  }
  
  document.getElementById('f-bank').value = name;
  
  // Set color from brand
  const key   = name.toLowerCase();
  const brand = Object.entries(BANK_BRANDS).find(([k]) => key.includes(k))?.[1];
  if (brand) selColor = brand.bg;
  
  // Autofill card data if card name already typed
  autofillCard(document.getElementById('f-name').value);
}

/**
 * Autofill card details from CARD_DB database
 */
function autofillCard(val) {
  const key = val.toLowerCase().trim();
  const match = Object.keys(CARD_DB).find(k => key.includes(k)||k.includes(key));
  if (!match) return;
  
  const d = CARD_DB[match];
  document.getElementById('f-bank').value    = d.bank    || '';
  document.getElementById('f-perks').value   = d.perks   ? d.perks.join(', ')   : '';
  document.getElementById('f-redeem').value  = d.redeem  ? d.redeem.join(', ')  : '';
  document.getElementById('f-ratio').value   = d.ratio   || '1:1';
  document.getElementById('f-coupons').value = d.coupons ? d.coupons.join(', ') : '';
  if (d.icon)  selE(d.icon);
  if (d.color) selC(d.color);
}

/**
 * Save new card to cards array
 */
function saveCard() {
  const name  = document.getElementById('f-name').value.trim();
  const bank  = document.getElementById('f-bank').value.trim();
  if (!name||!bank) { 
    alert('Please enter card name and bank'); 
    return; 
  }
  
  const pts   = parseInt(document.getElementById('f-points').value)||0;
  const due   = document.getElementById('f-due').value;
  const owner = document.getElementById('f-owner')?.value||'Me';
  const perks = document.getElementById('f-perks').value.split(',').map(s=>s.trim()).filter(Boolean);
  const rNames= document.getElementById('f-redeem').value.split(',').map(s=>s.trim()).filter(Boolean);
  const ratio = document.getElementById('f-ratio').value.trim()||'1:1';
  const [a,b] = ratio.split(':').map(Number);
  const est   = b&&a?Math.floor(pts/a*b):pts;
  const cRaw  = document.getElementById('f-coupons').value.split(',').map(s=>s.trim()).filter(Boolean);
  
  cards.push({
    id:Date.now(), 
    name, 
    bank, 
    icon:selEmoji, 
    color:selColor,
    points:pts, 
    due, 
    owner,
    perks: perks.length?perks:['General spending'],
    redeem: rNames.map(r=>({name:r,ratio,est})),
    coupons: cRaw.map(t=>({text:t,expiry:'',done:false})),
    history:[],
  });
  
  saveCards(); 
  closeAddModal(); 
  renderAll();
}

/**
 * Save point log entry
 * Updates card points balance and redemption estimates
 */
function saveLog() {
  const amt  = parseInt(document.getElementById('log-amount').value);
  const date = document.getElementById('log-date').value;
  const note = document.getElementById('log-note').value.trim();
  
  if (!amt || amt <= 0) { 
    alert('Please enter a valid point amount'); 
    return; 
  }
  if (!date) { 
    alert('Please select a date'); 
    return; 
  }
  
  const c = cards.find(x => x.id === logCardId);
  if (!c) return;
  
  if (!c.history) c.history = [];
  c.history.unshift({ type: logType, amount: amt, date, note });
  c.points = logType === 'earned' ? c.points + amt : Math.max(0, c.points - amt);
  
  // Update redeem estimates based on new balance
  const ratio = c.redeem[0]?.ratio || '1:1';
  const [a, b] = ratio.split(':').map(Number);
  c.redeem = c.redeem.map(r => ({ ...r, est: Math.floor(c.points / (a||1) * (b||1)) }));
  
  saveCards();
  closeLogModal();
  openDetail(logCardId);
  renderAll();
}

/**
 * Set log type (earned or spent)
 * Updates button styling
 */
function setLogType(t) {
  logType = t;
  const eBtn = document.getElementById('log-type-earned');
  const sBtn = document.getElementById('log-type-spent');
  
  eBtn.style.borderColor  = t==='earned' ? '#34C759' : 'rgba(128,128,128,0.3)';
  eBtn.style.background   = t==='earned' ? 'rgba(52,199,89,0.12)' : 'transparent';
  eBtn.style.color        = t==='earned' ? '#34C759' : 'inherit';
  
  sBtn.style.borderColor  = t==='spent'  ? '#FF3B30' : 'rgba(128,128,128,0.3)';
  sBtn.style.background   = t==='spent'  ? 'rgba(255,59,48,0.08)' : 'transparent';
  sBtn.style.color        = t==='spent'  ? '#FF3B30' : 'inherit';
}

/**
 * Select emoji for card
 */
function selE(e) { 
  selEmoji=e; 
}

/**
 * Select color for card
 */
function selC(c) { 
  selColor=c; 
}
