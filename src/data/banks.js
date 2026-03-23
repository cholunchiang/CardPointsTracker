/**
 * Bank branding and list data for Card Points Tracker
 * Exports bank styling information and bank list for UI rendering
 */

/**
 * Bank brand styling information
 * Maps bank names to background color, foreground color, and abbreviation
 */
export const BANK_BRANDS = {
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
 * List of major banks with branding information
 * Used for bank selection in the add card modal
 */
export const BANK_LIST = [
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
  { name:'Other',            bg:'#8E8E93', fg:'#fff', abbr:'...' },
];
