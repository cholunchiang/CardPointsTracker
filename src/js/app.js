// ============================================================================
// APP.JS - Main App Initialization & State Management
// Handles app state, navigation, filtering, and event listeners
// ============================================================================

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

/**
 * Card emoji palette
 */
const EMOJIS = ['💳','🏦','✈️','🎁','💰','🌟','🔷','💎','🎯','⭐','🏅','🎖️','💵','💴','💶','💷'];

/**
 * Color palette for reward tags
 */
const COLORS  = ['#FF6B6B','#FF9500','#FFCC02','#34C759','#00C7BE','#007AFF','#5856D6','#AF52DE','#FF2D55','#8E8E93'];

/**
 * Tag color classes mapped by index
 */
const TC      = ['','green','orange','purple','red','teal','','green','orange','purple'];

/**
 * Bank branding map with colors and abbreviations
 */
const BANK_BRANDS = {
  'chase':            { bg:'#117ACA', fg:'#fff', abbr:'CHASE' },
  'american express': { bg:'#016FD0', fg:'#fff', abbr:'AMEX'  },
  'amex':             { bg:'#016FD0', fg:'#fff', abbr:'AMEX'  },
  'citi':             { bg:'#C01933', fg:'#fff', abbr:'citi'  },
  'citibank':         { bg:'#C01933', fg:'#fff', abbr:'citi'  },
  'capital one':      { bg:'#D03027', fg:'#fff', abbr:'C1'    },
  'discover':         { bg:'#FF6600', fg:'#fff', abbr:'DISC'  },
  'wells fargo':      { bg:'#D71E28', fg:'#fff', abbr:'WF'    },
  'bank of america':  { bg:'#E31837', fg:'#fff', abbr:'BofA'  },
  'us bank':          { bg:'#003087', fg:'#fff', abbr:'USB'   },
  'barclays':         { bg:'#00AEEF', fg:'#fff', abbr:'BARC'  },
  'navy federal':     { bg:'#002F6C', fg:'#fff', abbr:'NFCU'  },
  'pnc':              { bg:'#F58025', fg:'#fff', abbr:'PNC'   },
  'td bank':          { bg:'#34A853', fg:'#fff', abbr:'TD'    },
  'synchrony':        { bg:'#6E2B8B', fg:'#fff', abbr:'SYF'   },
};

/**
 * Bank list for quick selection in add modal
 */
const BANK_LIST = [
  { name:'Chase',            ...BANK_BRANDS['chase']           },
  { name:'American Express', ...BANK_BRANDS['american express'] },
  { name:'Citi',             ...BANK_BRANDS['citi']            },
  { name:'Capital One',      ...BANK_BRANDS['capital one']     },
  { name:'Discover',         ...BANK_BRANDS['discover']        },
  { name:'Wells Fargo',      ...BANK_BRANDS['wells fargo']     },
  { name:'Bank of America',  ...BANK_BRANDS['bank of america'] },
  { name:'US Bank',          ...BANK_BRANDS['us bank']         },
  { name:'Barclays',         ...BANK_BRANDS['barclays']        },
  { name:'Navy Federal',     ...BANK_BRANDS['navy federal']    },
  { name:'PNC',              ...BANK_BRANDS['pnc']             },
  { name:'TD Bank',          ...BANK_BRANDS['td bank']         },
];

/**
 * Card database for autofill functionality
 * Maps card names to their standard features
 */
const CARD_DB = {
  'chase sapphire reserve':   {bank:'Chase',icon:'💎',color:'#007AFF',perks:['3x Dining','3x Travel','1.5x Everything','Priority Pass Lounge'],redeem:['United MileagePlus','World of Hyatt','Southwest Rapid Rewards','Air Canada Aeroplan'],ratio:'1:1',coupons:['$300 Annual Travel Credit','Global Entry / TSA PreCheck Credit','DoorDash DashPass']},
  'chase sapphire preferred': {bank:'Chase',icon:'🔷',color:'#5856D6',perks:['3x Dining','3x Travel','2x Everything','$50 Hotel Credit'],redeem:['United MileagePlus','World of Hyatt','Southwest Rapid Rewards','Air Canada Aeroplan'],ratio:'1:1',coupons:['$50 Annual Hotel Credit','DoorDash DashPass']},
  'chase freedom unlimited':  {bank:'Chase',icon:'💳',color:'#34C759',perks:['1.5x Everything','3x Dining','3x Drugstores','5x Travel via Chase Portal'],redeem:['Chase Ultimate Rewards (cash)'],ratio:'1:1',coupons:['No Annual Fee']},
  'chase freedom flex':       {bank:'Chase',icon:'💳',color:'#00C7BE',perks:['5x Rotating Categories','3x Dining','3x Drugstores','1x Everything'],redeem:['Chase Ultimate Rewards (cash)'],ratio:'1:1',coupons:['No Annual Fee']},
  'amex platinum':            {bank:'American Express',icon:'💎',color:'#AF52DE',perks:['5x Flights booked directly','5x Prepaid Hotels via Amex','Centurion Lounge Access','Fine Hotels & Resorts'],redeem:['Delta SkyMiles','British Airways Avios','Air France/KLM Flying Blue','Marriott Bonvoy','ANA Mileage Club'],ratio:'1:1',coupons:['$200 Airline Fee Credit','$200 Fine Hotels Credit','$240 Digital Entertainment Credit','$189 CLEAR Plus Credit','Centurion Lounge Access']},
  'amex gold':                {bank:'American Express',icon:'⭐',color:'#FF9500',perks:['4x Dining worldwide','4x US Supermarkets (up to $25k/yr)','3x Flights','1x Everything else'],redeem:['Delta SkyMiles','Air Canada Aeroplan','British Airways Avios','Marriott Bonvoy'],ratio:'1:1',coupons:['$120 Dining Credit ($10/mo)','$120 Uber Cash ($10/mo)']},
  'amex blue cash preferred': {bank:'American Express',icon:'🔵',color:'#007AFF',perks:['6x US Supermarkets','6x Select Streaming','3x Gas & Transit','1x Everything'],redeem:['Cash back (statement credit)'],ratio:'1:1',coupons:['$84 Disney Bundle Credit']},
  'citi premier':             {bank:'Citi',icon:'🏦',color:'#FF6B6B',perks:['3x Restaurants','3x Supermarkets','3x Gas Stations','3x Air & Hotels'],redeem:['Turkish Miles&Smiles','Virgin Atlantic Flying Club','Air France/KLM Flying Blue','Singapore Airlines KrisFlyer'],ratio:'1:1',coupons:['$100 Annual Hotel Savings']},
  'citi double cash':         {bank:'Citi',icon:'💰',color:'#FF2D55',perks:['2% on Everything'],redeem:['Cash back'],ratio:'1:1',coupons:['No Annual Fee']},
  'capital one venture x':    {bank:'Capital One',icon:'🌟',color:'#FF9500',perks:['10x Hotels via C1 Travel','5x Flights via C1 Travel','2x Everything'],redeem:['Air Canada Aeroplan','British Airways Avios','Turkish Miles&Smiles','Avianca LifeMiles'],ratio:'1:1',coupons:['$300 Annual Travel Credit','10,000 Anniversary Miles','Priority Pass Lounge']},
  'capital one venture':      {bank:'Capital One',icon:'✈️',color:'#FFCC02',perks:['5x Hotels & Rental Cars via C1 Travel','2x Everything'],redeem:['Air Canada Aeroplan','British Airways Avios','Turkish Miles&Smiles'],ratio:'1:1',coupons:['Global Entry / TSA PreCheck Credit']},
  'discover it cash back':    {bank:'Discover',icon:'💵',color:'#FF9500',perks:['5x Rotating Categories','1x Everything'],redeem:['Cash back'],ratio:'1:1',coupons:['No Annual Fee','Cashback Match first year']},
  'wells fargo active cash':  {bank:'Wells Fargo',icon:'💳',color:'#FF6B6B',perks:['2% on Everything'],redeem:['Cash back'],ratio:'1:1',coupons:['No Annual Fee','Cell Phone Protection']},
  'bank of america travel rewards':{bank:'Bank of America',icon:'✈️',color:'#007AFF',perks:['1.5x Everything'],redeem:['Travel statement credit'],ratio:'1:1',coupons:['No Annual Fee']},
};

/**
 * Default demo cards for new users
 */
const DEFAULTS = [
  { id:1, name:'Chase Sapphire Reserve', bank:'Chase', icon:'💎', color:'#007AFF', points:85000, due:'2025-09-15', owner:'Me',
    perks:['3x Dining','3x Travel','1.5x Everything','Priority Pass Lounge'],
    redeem:[{name:'United MileagePlus',ratio:'1:1',est:85000},{name:'World of Hyatt',ratio:'1:1',est:85000},{name:'Southwest Rapid Rewards',ratio:'1:1',est:85000},{name:'Air Canada Aeroplan',ratio:'1:1',est:85000}],
    coupons:[{text:'$300 Annual Travel Credit',expiry:'2026-01-01',done:false},{text:'Global Entry / TSA PreCheck Credit',expiry:'2026-01-01',done:true},{text:'DoorDash DashPass',expiry:'2025-12-31',done:false}],
    history:[] },
  { id:2, name:'Amex Platinum', bank:'American Express', icon:'💎', color:'#AF52DE', points:120000, due:'2025-09-20', owner:'Wife',
    perks:['5x Flights booked directly','5x Prepaid Hotels via Amex','Centurion Lounge Access','Fine Hotels & Resorts'],
    redeem:[{name:'Delta SkyMiles',ratio:'1:1',est:120000},{name:'British Airways Avios',ratio:'1:1',est:120000},{name:'Air France/KLM Flying Blue',ratio:'1:1',est:120000},{name:'Marriott Bonvoy',ratio:'1:2',est:240000}],
    coupons:[{text:'$200 Airline Fee Credit',expiry:'2025-12-31',done:false},{text:'$200 Fine Hotels Credit',expiry:'2025-12-31',done:false},{text:'$240 Digital Entertainment Credit',expiry:'2025-12-31',done:true},{text:'Centurion Lounge Access',expiry:'2026-01-01',done:false},{text:'$189 CLEAR Plus Credit',expiry:'2025-12-31',done:false}],
    history:[] },
  { id:3, name:'Chase Freedom Unlimited', bank:'Chase', icon:'💳', color:'#34C759', points:22000, due:'2025-09-05', owner:'Me',
    perks:['1.5x Everything','3x Dining','3x Drugstores','5x Travel via Chase Portal'],
    redeem:[{name:'Chase Ultimate Rewards (cash)',ratio:'1:1',est:22000}],
    coupons:[{text:'No Annual Fee',expiry:'',done:false}],
    history:[] },
  { id:4, name:'Amex Gold', bank:'American Express', icon:'⭐', color:'#FF9500', points:45000, due:'2025-09-28', owner:'Wife',
    perks:['4x Dining worldwide','4x US Supermarkets (up to $25k/yr)','3x Flights','1x Everything else'],
    redeem:[{name:'Delta SkyMiles',ratio:'1:1',est:45000},{name:'Air Canada Aeroplan',ratio:'1:1',est:45000},{name:'British Airways Avios',ratio:'1:1',est:45000},{name:'Marriott Bonvoy',ratio:'1:2',est:90000}],
    coupons:[{text:'$120 Dining Credit ($10/mo)',expiry:'2025-12-31',done:false},{text:'$120 Uber Cash ($10/mo)',expiry:'2025-12-31',done:false}],
    history:[] },
];

// ============================================================================
// APP STATE
// ============================================================================

/**
 * Main cards array - loaded from localStorage or defaults
 */
let cards = loadCards() || DEFAULTS;
if (!loadCards()) saveCards();

/**
 * Current tab filter ('all', owner name, or bank name)
 */
let currentTab  = 'all';

/**
 * Current navigation view ('cards', 'miles', 'coupons', 'summary')
 */
let currentNav  = 'cards';

/**
 * Selected emoji for new card
 */
let selEmoji    = '';

/**
 * Selected color for new card
 */
let selColor    = '#007AFF';

/**
 * Current search query
 */
let searchQuery = '';

/**
 * Current card ID for logging points
 */
let logCardId  = null;

/**
 * Current log type ('earned' or 'spent')
 */
let logType    = 'earned';

// ============================================================================
// NAVIGATION & FILTERING
// ============================================================================

/**
 * Switch main navigation view
 * Updates active nav button and re-renders content
 */
function switchNav(n) {
  currentNav = n;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('nav-' + n).classList.add('active');
  renderAll();
}

/**
 * Set current tab filter and re-render
 */
function setTab(t) { 
  currentTab = t; 
  renderAll(); 
}

/**
 * Handle search input and re-render
 */
function handleSearch(v) { 
  searchQuery = v.toLowerCase(); 
  renderAll(); 
}

/**
 * Get filtered card list based on current tab and search query
 * Filters by owner, bank, and searchable fields
 */
function filtered() {
  let list = cards;
  
  // Filter by tab
  if (['Me','Wife','Shared'].includes(currentTab)) 
    list = cards.filter(c => (c.owner||'Me') === currentTab);
  else if (currentTab !== 'all') 
    list = cards.filter(c => c.bank === currentTab);
  
  // Filter by search query
  if (searchQuery) 
    list = list.filter(c =>
      c.name.toLowerCase().includes(searchQuery) ||
      c.bank.toLowerCase().includes(searchQuery) ||
      c.perks.some(p => p.toLowerCase().includes(searchQuery)) ||
      c.redeem.some(r => r.name.toLowerCase().includes(searchQuery)) ||
      (c.coupons||[]).some(x => x.text.toLowerCase().includes(searchQuery))
    );
  
  return list;
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Close modals when clicking on background (outside modal content)
 */
document.getElementById('detailModal').addEventListener('click',function(e){
  if(e.target===this) closeDetailModal();
});

document.getElementById('addModal').addEventListener('click',function(e){
  if(e.target===this) closeAddModal();
});

document.getElementById('logModal').addEventListener('click',function(e){
  if(e.target===this) closeLogModal();
});

// ============================================================================
// APP INITIALIZATION
// ============================================================================

/**
 * Initial render on page load
 */
renderAll();
