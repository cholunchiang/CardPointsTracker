/**
 * Default configuration and styling constants
 * Includes emoji set, color palette, tag classes, and default card data
 */

/**
 * Emoji set for card icons
 * Note: These will display as actual emoji characters when rendered
 * Replace with appropriate emojis: 💳 💰 ✈️ 🏨 ➕ etc.
 */
export const EMOJIS = [
  '💳', // Credit card
  '💰', // Money bag
  '✈️',  // Airplane
  '🏨', // Hotel
  '➕', // Plus sign
  '🎯', // Target
  '🌟', // Star
  '🏆', // Trophy
  '🎁', // Gift
  '⭐', // Star alternative
  '🔥', // Fire
  '💎', // Diamond
  '🚀', // Rocket
  '👑', // Crown
  '🎪', // Circus tent
  '🌈', // Rainbow
];

/**
 * Color palette for card styling
 * Used for card backgrounds, tags, and UI elements
 */
export const COLORS = [
  '#FF6B6B', // Red
  '#FF9500', // Orange
  '#FFCC02', // Yellow
  '#34C759', // Green
  '#00C7BE', // Teal
  '#007AFF', // Blue
  '#5856D6', // Purple
  '#AF52DE', // Magenta
  '#FF2D55', // Pink
  '#8E8E93', // Gray
];

/**
 * Tag class names for reward categories
 * Maps to CSS classes for visual styling
 */
export const TC = [
  '',        // Default (no class)
  'green',   // Green tag
  'orange',  // Orange tag
  'purple',  // Purple tag
  'red',     // Red tag
  'teal',    // Teal tag
  '',        // Default
  'green',   // Green tag
  'orange',  // Orange tag
  'purple',  // Purple tag
];

/**
 * Default cards to populate the app on first run
 * Contains example credit cards with reward structures
 */
export const DEFAULTS = [
  {
    id: 1,
    name: 'Chase Sapphire Reserve',
    bank: 'Chase',
    icon: '💳',
    color: '#007AFF',
    points: 85000,
    due: '2025-09-15',
    owner: 'Me',
    perks: ['3x Dining', '3x Travel', '1.5x Everything', 'Priority Pass Lounge'],
    redeem: [
      { name: 'United MileagePlus', ratio: '1:1', est: 85000 },
      { name: 'World of Hyatt', ratio: '1:1', est: 85000 },
      { name: 'Southwest Rapid Rewards', ratio: '1:1', est: 85000 },
      { name: 'Air Canada Aeroplan', ratio: '1:1', est: 85000 },
    ],
    coupons: [
      { text: '$300 Annual Travel Credit', expiry: '2026-01-01', done: false },
      { text: 'Global Entry / TSA PreCheck Credit', expiry: '2026-01-01', done: true },
      { text: 'DoorDash DashPass', expiry: '2025-12-31', done: false },
    ],
    history: [],
  },
  {
    id: 2,
    name: 'Amex Platinum',
    bank: 'American Express',
    icon: '💳',
    color: '#AF52DE',
    points: 120000,
    due: '2025-09-20',
    owner: 'Wife',
    perks: ['5x Flights booked directly', '5x Prepaid Hotels via Amex', 'Centurion Lounge Access', 'Fine Hotels & Resorts'],
    redeem: [
      { name: 'Delta SkyMiles', ratio: '1:1', est: 120000 },
      { name: 'British Airways Avios', ratio: '1:1', est: 120000 },
      { name: 'Air France/KLM Flying Blue', ratio: '1:1', est: 120000 },
      { name: 'Marriott Bonvoy', ratio: '1:2', est: 240000 },
    ],
    coupons: [
      { text: '$200 Airline Fee Credit', expiry: '2025-12-31', done: false },
      { text: '$200 Fine Hotels Credit', expiry: '2025-12-31', done: false },
      { text: '$240 Digital Entertainment Credit', expiry: '2025-12-31', done: true },
      { text: 'Centurion Lounge Access', expiry: '2026-01-01', done: false },
      { text: '$189 CLEAR Plus Credit', expiry: '2025-12-31', done: false },
    ],
    history: [],
  },
  {
    id: 3,
    name: 'Chase Freedom Unlimited',
    bank: 'Chase',
    icon: '💳',
    color: '#34C759',
    points: 22000,
    due: '2025-09-05',
    owner: 'Me',
    perks: ['1.5x Everything', '3x Dining', '3x Drugstores', '5x Travel via Chase Portal'],
    redeem: [{ name: 'Chase Ultimate Rewards (cash)', ratio: '1:1', est: 22000 }],
    coupons: [{ text: 'No Annual Fee', expiry: '', done: false }],
    history: [],
  },
  {
    id: 4,
    name: 'Amex Gold',
    bank: 'American Express',
    icon: '💳',
    color: '#FF9500',
    points: 45000,
    due: '2025-09-28',
    owner: 'Wife',
    perks: ['4x Dining worldwide', '4x US Supermarkets (up to $25k/yr)', '3x Flights', '1x Everything else'],
    redeem: [
      { name: 'Delta SkyMiles', ratio: '1:1', est: 45000 },
      { name: 'Air Canada Aeroplan', ratio: '1:1', est: 45000 },
      { name: 'British Airways Avios', ratio: '1:1', est: 45000 },
      { name: 'Marriott Bonvoy', ratio: '1:2', est: 90000 },
    ],
    coupons: [
      { text: '$120 Dining Credit ($10/mo)', expiry: '2025-12-31', done: false },
      { text: '$120 Uber Cash ($10/mo)', expiry: '2025-12-31', done: false },
    ],
    history: [],
  },
];
