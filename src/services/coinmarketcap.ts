import fetch from 'node-fetch';

const URL = 'https://api.coinmarketcap.com/v1/ticker/?limit=';

export const coinmarketcap = (limit = 100) => fetch(URL + limit).then(res => res.json());
