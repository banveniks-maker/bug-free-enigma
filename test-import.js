import { getBathsForCity } from './data/baths.js';

const baths = getBathsForCity('moskva');
console.log('Москва - бань:', baths.length);
if (baths.length > 0) {
  console.log('Первая баня:', baths[0].name);
  console.log('Телефон:', baths[0].phone);
}
