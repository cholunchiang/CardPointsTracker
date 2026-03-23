// ============================================================================
// STORAGE.JS - Data Persistence Functions
// Handles localStorage operations, backup/restore, and data validation
// ============================================================================

/**
 * Save cards array to localStorage
 */
function saveCards() {
  localStorage.setItem('cpCards', JSON.stringify(cards));
}

/**
 * IIFE: Validate and clean corrupted localStorage data on load
 * Removes invalid entries that have Chinese characters or malformed structure
 */
(function(){
  try {
    const raw = localStorage.getItem('cpCards');
    if (!raw) return;
    const p = JSON.parse(raw);
    if (!Array.isArray(p) || p.length === 0) { 
      localStorage.removeItem('cpCards'); 
      return; 
    }
    const bad = p.some(c =>
      !c || typeof c !== 'object' ||
      typeof c.name !== 'string' ||
      typeof c.bank !== 'string' ||
      !Array.isArray(c.redeem) ||
      !Array.isArray(c.perks) ||
      !Array.isArray(c.coupons) ||
      /[\u4e00-\u9fff]/.test(c.name + c.bank)
    );
    if (bad) localStorage.removeItem('cpCards');
  } catch(e) { 
    localStorage.removeItem('cpCards'); 
  }
})();

/**
 * Load cards from localStorage with validation and defaults
 * Returns null if no valid data found
 */
function loadCards() {
  try {
    const raw = localStorage.getItem('cpCards');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.length) return null;
    
    // Wipe if any card looks like old Taiwan data or is malformed
    if (parsed.some(c => !c.name || !c.bank || !Array.isArray(c.redeem) || /[\u4e00-\u9fff]/.test(c.name + c.bank))) {
      localStorage.removeItem('cpCards');
      return null;
    }
    
    return parsed.map(c => ({
      id:      c.id      ?? Date.now(),
      name:    c.name    ?? 'Unknown',
      bank:    c.bank    ?? 'Unknown',
      icon:    c.icon    ?? '',
      color:   c.color   ?? '#007AFF',
      points:  typeof c.points === 'number' ? c.points : 0,
      due:     c.due     ?? '',
      owner:   c.owner   ?? 'Me',
      perks:   Array.isArray(c.perks)   ? c.perks   : [],
      redeem:  Array.isArray(c.redeem)  ? c.redeem  : [],
      coupons: Array.isArray(c.coupons) ? c.coupons : [],
      history: Array.isArray(c.history) ? c.history : [],
    }));
  } catch(e) { 
    localStorage.removeItem('cpCards'); 
    return null; 
  }
}

/**
 * Export cards as JSON backup file
 * Triggers download on iOS Safari or desktop browsers
 */
function exportBackup() {
  const data     = { version: 2, exported: new Date().toISOString(), cards };
  const json     = JSON.stringify(data, null, 2);
  const blob     = new Blob([json], { type: 'application/json' });
  const url      = URL.createObjectURL(blob);
  const date     = new Date().toISOString().slice(0,10);
  const filename = `CardPoints_backup_${date}.json`;
  
  // On iOS Safari this triggers the Share Sheet
  const a  = document.createElement('a');
  a.href   = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import cards from JSON backup file
 * Validates structure and prompts user for confirmation
 */
function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data   = JSON.parse(e.target.result);
      const parsed = data.cards || (Array.isArray(data) ? data : null);
      
      if (!parsed || !Array.isArray(parsed) || !parsed.length) {
        alert('Invalid backup file — no cards found.'); 
        return;
      }
      
      if (!confirm(`Import ${parsed.length} cards? This will replace your current data.`)) return;
      
      cards = parsed.map(c => ({
        id:      c.id      ?? Date.now(),
        name:    c.name    ?? 'Unknown',
        bank:    c.bank    ?? 'Unknown',
        icon:    c.icon    ?? '',
        color:   c.color   ?? '#007AFF',
        points:  typeof c.points === 'number' ? c.points : 0,
        due:     c.due     ?? '',
        owner:   c.owner   ?? 'Me',
        perks:   Array.isArray(c.perks)   ? c.perks   : [],
        redeem:  Array.isArray(c.redeem)  ? c.redeem  : [],
        coupons: Array.isArray(c.coupons) ? c.coupons : [],
        history: Array.isArray(c.history) ? c.history : [],
      }));
      
      saveCards();
      renderAll();
      alert('✅ Imported ' + cards.length + ' cards successfully!');
    } catch(err) {
      alert('Could not read file — make sure it\'s a valid CardPoints backup JSON.');
    }
  };
  
  reader.readAsText(file);
  event.target.value = ''; // reset so same file can be re-imported
}
