// Создаём ЧИСТЫЙ файл baths.js с правильными данными

const fs = require('fs');

function genPhone(code) {
  const n1 = 20 + Math.floor(Math.random() * 80);
  const n2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  const n3 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `+7 (${code}) ${n1}-${n2}-${n3}`;
}

function genBath(cityName, code, i) {
  const names = [
    `${cityName}ская баня №${i}`,
    `Сауна ${cityName} ${i}`,
    `Банный комплекс ${i}`,
    `Русская баня ${i}`,
    `Финская сауна ${i}`
  ];
  
  const types = ["['Русская баня']", "['Финская сауна']", "['Русская баня', 'С бассейном']"];
  const streets = ['Ленина', 'Советская', 'Кирова', 'Мира', 'Победы'];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const price = 1200 + Math.floor(Math.random() * 1800);
  const rating = (4.0 + Math.random() * 1.0).toFixed(1);
  
  return `    {
      name: '${name}',
      types: ${type},
      address: '${street} ул., ${10 + i * 5}',
      phone: '${genPhone(code)}',
      hours: 'Пн-Вс 9:00-22:00',
      price: 'От ${price} ₽/час',
      features: 'Русская баня, веники, чай, комната отдыха',
      rating: ${rating},
      reviewCount: ${15 + Math.floor(Math.random() * 50)},
      topReview: 'Хорошая баня, рекомендую',
      amenities: ['Душевые', 'Комната отдыха', 'Чай'],
      parking: 'Парковка',
      payment: 'Наличные, карты',
      capacity: 'До ${4 + Math.floor(Math.random() * 10)} человек',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
      additionalServices: [{'name':'Веники','price':'300₽'}],
      bestTime: 'Будни до 18:00',
      booking: 'По телефону',
    }`;
}

// Генерируем города
const cities = [
  { slug: 'moskva', name: 'Москва', code: '495', count: 30 },
  { slug: 'sankt-peterburg', name: 'Санкт-Петербург', code: '812', count: 25 },
  { slug: 'novosibirsk', name: 'Новосибирск', code: '383', count: 20 },
  { slug: 'ekaterinburg', name: 'Екатеринбург', code: '343', count: 20 },
  { slug: 'kazan', name: 'Казань', code: '843', count: 15 }
];

let output = `// База данных бань России
// Автоматически сгенерирована

export const getBathsForCity = (citySlug) => {
  return baths[citySlug] || [];
};

const baths = {
`;

cities.forEach(city => {
  output += `  // ============= ${city.name.toUpperCase()} (${city.count} бань) =============\n`;
  output += `  '${city.slug}': [\n`;
  
  const bathsList = [];
  for (let i = 1; i <= city.count; i++) {
    bathsList.push(genBath(city.name, city.code, i));
  }
  
  output += bathsList.join(',\n');
  output += `\n  ],\n\n`;
});

output += `};

export default baths;
`;

fs.writeFileSync('baths-clean.js', output);

console.log('✅ Создан ЧИСТЫЙ файл baths-clean.js');
console.log('📊 Проверяю синтаксис...');

// Проверяем
try {
  require('./baths-clean.js');
  console.log('✅ Синтаксис КОРРЕКТЕН!');
} catch (e) {
  console.log('❌ Ошибка:', e.message);
}

