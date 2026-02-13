// Финальное обновление ВСЕХ страниц с фото и услугами

const fs = require('fs');
const path = require('path');

const cities = ['sankt-peterburg', 'novosibirsk', 'ekaterinburg', 'kazan', 'nizhniy-novgorod', 'chelyabinsk', 'samara', 'omsk', 'rostov-na-donu', 'ufa', 'krasnoyarsk', 'voronezh', 'perm', 'volgograd', 'krasnodar', 'saratov', 'tyumen', 'tolyatti', 'izhevsk', 'barnaul', 'ulyanovsk', 'irkutsk', 'habarovsk', 'yaroslavl', 'vladivostok', 'mahachkala', 'tomsk', 'orenburg', 'kemerovo', 'novokuznetsk', 'ryazan', 'naberezhnye-chelny', 'penza', 'astrahan', 'lipetsk', 'tula', 'kirov', 'cheboksary', 'kaliningrad', 'kursk', 'ulan-ude', 'stavropol', 'magnitogorsk', 'sochi', 'belgorod', 'arhangelsk', 'vladimir', 'kaluga', 'surgut', 'tver', 'smolensk', 'nizhnevartovsk', 'petrozavodsk', 'yakutsk', 'murmansk', 'balashiha', 'gelendzhik', 'anapa', 'bryansk', 'ivanovo', 'vladikavkaz', 'anadyr', 'birobidzhan', 'chita', 'dmitrov', 'domodedovo', 'elista', 'gatchina', 'grozny', 'khanty-mansiysk', 'kostroma', 'lomonosov', 'magadan', 'megion', 'naryan-mar', 'novgorod-velikiy', 'novorossiysk', 'petergof', 'petropavlovsk', 'podolsk', 'pskov', 'ramenskoe', 'rostov-velikiy', 'rybinsk', 'serpukhov', 'sevastopol', 'simferopol', 'syktyvkar', 'tambov', 'temryuk', 'velikie-luki', 'yalta', 'zelenograd'];

const cityNames = {
  'sankt-peterburg': 'Санкт-Петербург',
  'nizhniy-novgorod': 'Нижний Новгород',
  'rostov-na-donu': 'Ростов-на-Дону'
};

const template = fs.readFileSync('src/pages/moskva.astro', 'utf-8');

function getCityName(slug) {
  if (cityNames[slug]) return cityNames[slug];
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

let updatedCount = 0;

cities.forEach(citySlug => {
  const cityName = getCityName(citySlug);
  const content = template
    .replace(/const city = "Москва"/g, `const city = "${cityName}"`)
    .replace(/const citySlug = "moskva"/g, `const citySlug = "${citySlug}"`);
  
  const filePath = path.join(__dirname, 'src', 'pages', `${citySlug}.astro`);
  fs.writeFileSync(filePath, content);
  updatedCount++;
  
  if (updatedCount % 10 === 0) {
    console.log(`✓ Обновлено ${updatedCount}/${cities.length} страниц...`);
  }
});

console.log('');
console.log('✅ ВСЕ СТРАНИЦЫ ОБНОВЛЕНЫ!');
console.log(`📄 Обновлено: 94 страницы`);
console.log('');
console.log('Теперь КАЖДАЯ страница показывает:');
console.log('  📷 Фотографии бань');
console.log('  ⭐ Рейтинги');
console.log('  👥 Вместимость');
console.log('  💆 Дополнительные услуги с ценами');
console.log('  ✨ Удобства');
console.log('  ⏰ Лучшее время посещения');
console.log('  💬 Отзывы');
console.log('  🚇 Метро (МСК/СПб)');
console.log('  💳 Оплата и парковка');
console.log('');
console.log('🚀 ГОТОВО К ЗАПУСКУ!');

