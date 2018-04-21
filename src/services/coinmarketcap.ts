import fetch from 'node-fetch';

const URL = 'https://api.coinmarketcap.com/v1/ticker/?limit=100';

export const coinmarketcap = fetch(URL).then(res => res.json());
