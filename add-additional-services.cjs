// Добавляем дополнительные услуги с ценами

const fs = require('fs');

let bathsContent = fs.readFileSync('baths.js', 'utf-8');

// Списки дополнительных услуг
const serviceOptions = [
  [
    { name: 'Массаж', price: '1500 ₽/час' },
    { name: 'Веники', price: '300 ₽' }
  ],
  [
    { name: 'Массаж', price: '2000 ₽/час' },
    { name: 'Пилинг', price: '800 ₽' },
    { name: 'Веники', price: '400 ₽' }
  ],
  [
    { name: 'Банщик', price: '1200 ₽/час' },
    { name: 'Массаж', price: '1800 ₽/час' },
    { name: 'Ароматерапия', price: '500 ₽' }
  ],
  [
    { name: 'Веники (берёза)', price: '300 ₽' },
    { name: 'Веники (дуб)', price: '400 ₽' },
    { name: 'Чай травяной', price: '200 ₽' }
  ],
  [
    { name: 'Услуги банщика', price: '1500 ₽/час' },
    { name: 'Пилинг мёдом', price: '1000 ₽' },
    { name: 'Обёртывание', price: '1200 ₽' }
  ]
];

// Функция получения случайных услуг
function getServices() {
  return serviceOptions[Math.floor(Math.random() * serviceOptions.length)];
}

// Добавляем услуги после capacity
let updatedCount = 0;

bathsContent = bathsContent.replace(
  /capacity: '([^']+)',/g,
  (match, capacity) => {
    updatedCount++;
    const services = getServices();
    const servicesJson = JSON.stringify(services).replace(/"/g, "'");
    
    return `capacity: '${capacity}',
      additionalServices: ${servicesJson},`;
  }
);

// Сохраняем
fs.writeFileSync('baths.js', bathsContent);

console.log('✅ ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ ДОБАВЛЕНЫ!');
console.log(`💆 Обновлено: ${updatedCount} бань`);
console.log('');
console.log('Что добавлено:');
console.log('  💆 Массаж (1500-2000₽)');
console.log('  🌿 Веники (300-400₽)');
console.log('  👨 Услуги банщика (1200-1500₽)');
console.log('  🍯 Пилинг мёдом (800-1000₽)');
console.log('  🌸 Ароматерапия (500₽)');
console.log('');
console.log('Пример:');
console.log('  additionalServices: [');
console.log('    { name: "Массаж", price: "1500₽/час" },');
console.log('    { name: "Веники", price: "300₽" }');
console.log('  ]');

