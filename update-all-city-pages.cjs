// Обновляем ВСЕ страницы городов чтобы показывать реальные данные из baths.js

const fs = require('fs');
const path = require('path');

const cities = [
  { slug: 'moskva', name: 'Москва' },
  { slug: 'sankt-peterburg', name: 'Санкт-Петербург' },
  { slug: 'novosibirsk', name: 'Новосибирск' },
  { slug: 'ekaterinburg', name: 'Екатеринбург' },
  { slug: 'kazan', name: 'Казань' },
  { slug: 'nizhniy-novgorod', name: 'Нижний Новгород' },
  { slug: 'chelyabinsk', name: 'Челябинск' },
  { slug: 'samara', name: 'Самара' },
  { slug: 'omsk', name: 'Омск' },
  { slug: 'rostov-na-donu', name: 'Ростов-на-Дону' },
  { slug: 'ufa', name: 'Уфа' },
  { slug: 'krasnoyarsk', name: 'Красноярск' },
  { slug: 'voronezh', name: 'Воронеж' },
  { slug: 'perm', name: 'Пермь' },
  { slug: 'volgograd', name: 'Волгоград' },
  { slug: 'krasnodar', name: 'Краснодар' },
  { slug: 'saratov', name: 'Саратов' },
  { slug: 'tyumen', name: 'Тюмень' },
  { slug: 'tolyatti', name: 'Тольятти' },
  { slug: 'izhevsk', name: 'Ижевск' },
  { slug: 'barnaul', name: 'Барнаул' },
  { slug: 'ulyanovsk', name: 'Ульяновск' },
  { slug: 'irkutsk', name: 'Иркутск' },
  { slug: 'habarovsk', name: 'Хабаровск' },
  { slug: 'yaroslavl', name: 'Ярославль' },
  { slug: 'vladivostok', name: 'Владивосток' },
  { slug: 'mahachkala', name: 'Махачкала' },
  { slug: 'tomsk', name: 'Томск' },
  { slug: 'orenburg', name: 'Оренбург' },
  { slug: 'kemerovo', name: 'Кемерово' },
  { slug: 'novokuznetsk', name: 'Новокузнецк' },
  { slug: 'ryazan', name: 'Рязань' },
  { slug: 'naberezhnye-chelny', name: 'Набережные Челны' },
  { slug: 'penza', name: 'Пенза' },
  { slug: 'astrahan', name: 'Астрахань' },
  { slug: 'lipetsk', name: 'Липецк' },
  { slug: 'tula', name: 'Тула' },
  { slug: 'kirov', name: 'Киров' },
  { slug: 'cheboksary', name: 'Чебоксары' },
  { slug: 'kaliningrad', name: 'Калининград' },
  { slug: 'kursk', name: 'Курск' },
  { slug: 'ulan-ude', name: 'Улан-Удэ' },
  { slug: 'stavropol', name: 'Ставрополь' },
  { slug: 'magnitogorsk', name: 'Магнитогорск' },
  { slug: 'sochi', name: 'Сочи' },
  { slug: 'belgorod', name: 'Белгород' },
  { slug: 'arhangelsk', name: 'Архангельск' },
  { slug: 'vladimir', name: 'Владимир' },
  { slug: 'kaluga', name: 'Калуга' },
  { slug: 'surgut', name: 'Сургут' },
  { slug: 'tver', name: 'Тверь' },
  { slug: 'smolensk', name: 'Смоленск' },
  { slug: 'nizhnevartovsk', name: 'Нижневартовск' },
  { slug: 'petrozavodsk', name: 'Петрозаводск' },
  { slug: 'yakutsk', name: 'Якутск' },
  { slug: 'murmansk', name: 'Мурманск' },
  { slug: 'balashiha', name: 'Балашиха' },
  { slug: 'gelendzhik', name: 'Геленджик' },
  { slug: 'anapa', name: 'Анапа' },
  { slug: 'bryansk', name: 'Брянск' },
  { slug: 'ivanovo', name: 'Иваново' },
  { slug: 'vladikavkaz', name: 'Владикавказ' },
  { slug: 'anadyr', name: 'Анадырь' },
  { slug: 'birobidzhan', name: 'Биробиджан' },
  { slug: 'chita', name: 'Чита' },
  { slug: 'dmitrov', name: 'Дмитров' },
  { slug: 'domodedovo', name: 'Домодедово' },
  { slug: 'elista', name: 'Элиста' },
  { slug: 'gatchina', name: 'Гатчина' },
  { slug: 'grozny', name: 'Грозный' },
  { slug: 'khanty-mansiysk', name: 'Ханты-Мансийск' },
  { slug: 'kostroma', name: 'Кострома' },
  { slug: 'lomonosov', name: 'Ломоносов' },
  { slug: 'magadan', name: 'Магадан' },
  { slug: 'megion', name: 'Мегион' },
  { slug: 'naryan-mar', name: 'Нарьян-Мар' },
  { slug: 'novgorod-velikiy', name: 'Великий Новгород' },
  { slug: 'novorossiysk', name: 'Новороссийск' },
  { slug: 'petergof', name: 'Петергоф' },
  { slug: 'petropavlovsk', name: 'Петропавловск-Камчатский' },
  { slug: 'podolsk', name: 'Подольск' },
  { slug: 'pskov', name: 'Псков' },
  { slug: 'ramenskoe', name: 'Раменское' },
  { slug: 'rostov-velikiy', name: 'Ростов Великий' },
  { slug: 'rybinsk', name: 'Рыбинск' },
  { slug: 'serpukhov', name: 'Серпухов' },
  { slug: 'sevastopol', name: 'Севастополь' },
  { slug: 'simferopol', name: 'Симферополь' },
  { slug: 'syktyvkar', name: 'Сыктывкар' },
  { slug: 'tambov', name: 'Тамбов' },
  { slug: 'temryuk', name: 'Темрюк' },
  { slug: 'velikie-luki', name: 'Великие Луки' },
  { slug: 'yalta', name: 'Ялта' },
  { slug: 'zelenograd', name: 'Зеленоград' }
];

// Шаблон страницы города
const pageTemplate = (cityName, citySlug) => `---
import Layout from '../layouts/Layout.astro';
import { getBathsForCity } from '../data/baths.js';

const city = "${cityName}";
const citySlug = "${citySlug}";
const baths = getBathsForCity(citySlug);
---

<Layout title={\`Бани в \${city}е — Банвеник.ру\`}>
  <div class="city-page">
    <header class="city-header">
      <h1>🔥 Бани и сауны в {city}е</h1>
      <p class="count">Найдено {baths.length} бань</p>
    </header>

    <div class="baths-grid">
      {baths.map((bath) => (
        <div class="bath-card">
          <h3>{bath.name}</h3>
          
          <div class="bath-types">
            {bath.types.map(type => (
              <span class="bath-type">{type}</span>
            ))}
          </div>

          <div class="bath-info">
            <p><strong>📍 Адрес:</strong> {bath.address}</p>
            <p><strong>📞 Телефон:</strong> <a href={\`tel:\${bath.phone.replace(/[^+\\d]/g, '')}\`}>{bath.phone}</a></p>
            <p><strong>🕐 Режим работы:</strong> {bath.hours}</p>
            <p><strong>💰 Цена:</strong> {bath.price}</p>
          </div>

          <div class="bath-features">
            <p>{bath.features}</p>
          </div>
        </div>
      ))}
    </div>

    <a href="/" class="back-link">← Вернуться на главную</a>
  </div>
</Layout>

<style>
  .city-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    background: #f5f7fa;
    min-height: 100vh;
  }

  .city-header {
    text-align: center;
    margin-bottom: 50px;
    padding: 40px 20px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  }

  .city-header h1 {
    font-size: 3em;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
  }

  .count {
    font-size: 1.2em;
    color: #666;
  }

  .baths-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
  }

  .bath-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: all 0.3s;
  }

  .bath-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  }

  .bath-card h3 {
    font-size: 1.5em;
    color: #667eea;
    margin-bottom: 15px;
  }

  .bath-types {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }

  .bath-type {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: 500;
  }

  .bath-info {
    margin-bottom: 20px;
    line-height: 1.8;
  }

  .bath-info p {
    margin: 8px 0;
    color: #333;
  }

  .bath-info strong {
    color: #667eea;
  }

  .bath-info a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }

  .bath-info a:hover {
    text-decoration: underline;
  }

  .bath-features {
    padding-top: 15px;
    border-top: 1px solid #eee;
    color: #666;
    font-size: 0.95em;
    line-height: 1.6;
  }

  .back-link {
    display: inline-block;
    padding: 15px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    transition: transform 0.3s;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }

  .back-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 768px) {
    .baths-grid {
      grid-template-columns: 1fr;
    }
    
    .city-header h1 {
      font-size: 2em;
    }
  }
</style>
`;

// Обновляем все страницы
let updatedCount = 0;

cities.forEach(city => {
  const filePath = path.join(__dirname, 'src', 'pages', `${city.slug}.astro`);
  const content = pageTemplate(city.name, city.slug);
  
  fs.writeFileSync(filePath, content);
  updatedCount++;
  
  if (updatedCount % 10 === 0) {
    console.log(`✓ Обновлено ${updatedCount}/${cities.length} страниц...`);
  }
});

console.log('');
console.log('✅ ВСЕ СТРАНИЦЫ ОБНОВЛЕНЫ!');
console.log(`📄 Обновлено: ${updatedCount} страниц городов`);
console.log('');
console.log('Теперь каждая страница:');
console.log('  ✓ Читает данные из baths.js');
console.log('  ✓ Показывает реальные телефоны');
console.log('  ✓ Показывает реальные адреса');
console.log('  ✓ Показывает все бани города');
console.log('');
console.log('🚀 ЗАПУСТИТЕ: npm run dev');
console.log('📱 ОТКРОЙТЕ: http://localhost:4321/moskva');

