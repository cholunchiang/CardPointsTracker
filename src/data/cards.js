/**
 * Card database for autofill functionality
 * Maps popular credit card names to their details for quick setup
 */

/**
 * Card information database
 * Each key is a card name (lowercase), value contains bank, perks, transfer partners, etc.
 */
export const CARD_DB = {
  'chase sapphire reserve':   {bank:'Chase',icon:'💳',color:'#007AFF',perks:['3x Dining','3x Travel','1.5x Everything','Priority Pass Lounge'],redeem:['United MileagePlus','World of Hyatt','Southwest Rapid Rewards','Air Canada Aeroplan'],ratio:'1:1',coupons:['$300 Annual Travel Credit','Global Entry / TSA PreCheck Credit','DoorDash DashPass']},
  'chase sapphire preferred': {bank:'Chase',icon:'💳',color:'#5856D6',perks:['3x Dining','3x Travel','2x Everything','$50 Hotel Credit'],redeem:['United MileagePlus','World of Hyatt','Southwest Rapid Rewards','Air Canada Aeroplan'],ratio:'1:1',coupons:['$50 Annual Hotel Credit','DoorDash DashPass']},
  'chase freedom unlimited':  {bank:'Chase',icon:'💳',color:'#34C759',perks:['1.5x Everything','3x Dining','3x Drugstores','5x Travel via Chase Portal'],redeem:['Chase Ultimate Rewards (cash)'],ratio:'1:1',coupons:['No Annual Fee']},
  'chase freedom flex':       {bank:'Chase',icon:'💳',color:'#00C7BE',perks:['5x Rotating Categories','3x Dining','3x Drugstores','1x Everything'],redeem:['Chase Ultimate Rewards (cash)'],ratio:'1:1',coupons:['No Annual Fee']},
  'amex platinum':            {bank:'American Express',icon:'💳',color:'#AF52DE',perks:['5x Flights booked directly','5x Prepaid Hotels via Amex','Centurion Lounge Access','Fine Hotels & Resorts'],redeem:['Delta SkyMiles','British Airways Avios','Air France/KLM Flying Blue','Marriott Bonvoy','ANA Mileage Club'],ratio:'1:1',coupons:['$200 Airline Fee Credit','$200 Fine Hotels Credit','$240 Digital Entertainment Credit','$189 CLEAR Plus Credit','Centurion Lounge Access']},
  'amex gold':                {bank:'American Express',icon:'💳',color:'#FF9500',perks:['4x Dining worldwide','4x US Supermarkets (up to $25k/yr)','3x Flights','1x Everything else'],redeem:['Delta SkyMiles','Air Canada Aeroplan','British Airways Avios','Marriott Bonvoy'],ratio:'1:1',coupons:['$120 Dining Credit ($10/mo)','$120 Uber Cash ($10/mo)']},
  'amex blue cash preferred': {bank:'American Express',icon:'💳',color:'#007AFF',perks:['6x US Supermarkets','6x Select Streaming','3x Gas & Transit','1x Everything'],redeem:['Cash back (statement credit)'],ratio:'1:1',coupons:['$84 Disney Bundle Credit']},
  'citi premier':             {bank:'Citi',icon:'💳',color:'#FF6B6B',perks:['3x Restaurants','3x Supermarkets','3x Gas Stations','3x Air & Hotels'],redeem:['Turkish Miles&Smiles','Virgin Atlantic Flying Club','Air France/KLM Flying Blue','Singapore Airlines KrisFlyer'],ratio:'1:1',coupons:['$100 Annual Hotel Savings']},
  'citi double cash':         {bank:'Citi',icon:'💳',color:'#FF2D55',perks:['2% on Everything'],redeem:['Cash back'],ratio:'1:1',coupons:['No Annual Fee']},
  'capital one venture x':    {bank:'Capital One',icon:'💳',color:'#FF9500',perks:['10x Hotels via C1 Travel','5x Flights via C1 Travel','2x Everything'],redeem:['Air Canada Aeroplan','British Airways Avios','Turkish Miles&Smiles','Avianca LifeMiles'],ratio:'1:1',coupons:['$300 Annual Travel Credit','10,000 Anniversary Miles','Priority Pass Lounge']},
  'capital one venture':      {bank:'Capital One',icon:'💳',color:'#FFCC02',perks:['5x Hotels & Rental Cars via C1 Travel','2x Everything'],redeem:['Air Canada Aeroplan','British Airways Avios','Turkish Miles&Smiles'],ratio:'1:1',coupons:['Global Entry / TSA PreCheck Credit']},
  'discover it cash back':    {bank:'Discover',icon:'💳',color:'#FF9500',perks:['5x Rotating Categories','1x Everything'],redeem:['Cash back'],ratio:'1:1',coupons:['No Annual Fee','Cashback Match first year']},
  'wells fargo active cash':  {bank:'Wells Fargo',icon:'💳',color:'#FF6B6B',perks:['2% on Everything'],redeem:['Cash back'],ratio:'1:1',coupons:['No Annual Fee','Cell Phone Protection']},
  'bank of america travel rewards':{bank:'Bank of America',icon:'💳',color:'#007AFF',perks:['1.5x Everything'],redeem:['Travel statement credit'],ratio:'1:1',coupons:['No Annual Fee']},
};
