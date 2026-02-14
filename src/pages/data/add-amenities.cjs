// Добавляем удобства и дополнительные услуги

const fs = require('fs');

let bathsContent = fs.readFileSync('baths.js', 'utf-8');

// Списки удобств
const parkingOptions = ['Бесплатная парковка', 'Платная парковка', 'Парковка во дворе', 'Уличная парковка'];
const paymentOptions = ['Наличные, карты', 'Карты, переводы', 'Наличные', 'Безналичный расчёт', 'Оплата онлайн'];

const amenitiesList = [
  ['Wi-Fi', 'Душевые', 'Комната отдыха'],
  ['Wi-Fi', 'Парковка', 'Душевые', 'Чай/кофе'],
  ['Парковка', 'Комната отдыха', 'Чай/кофе'],
  ['Wi-Fi', 'Парковка', 'Душевые', 'Комната отдыха', 'Чай'],
  ['Душевые', 'Комната отдыха', 'Веники'],
  ['Wi-Fi', 'Караоке', 'Бильярд', 'Комната отдыха'],
  ['Парковка', 'Душевые', 'Массаж по записи'],
  ['Wi-Fi', 'Парковка', 'Караоке', 'Кафе'],
  ['Душевые', 'Комната отдыха', 'Мангал'],
  ['Wi-Fi', 'Парковка', 'SPA-зона', 'Массаж']
];

// Функция получения случайных удобств
function getAmenities() {
  const amenities = amenitiesList[Math.floor(Math.random() * amenitiesList.length)];
  const parking = parkingOptions[Math.floor(Math.random() * parkingOptions.length)];
  const payment = paymentOptions[Math.floor(Math.random() * paymentOptions.length)];
  
  return `
      amenities: [${amenities.map(a => `'${a}'`).join(', ')}],
      parking: '${parking}',
      payment: '${payment}',`;
}

// Добавляем удобства после topReview
let updatedCount = 0;

bathsContent = bathsContent.replace(/topReview: '([^']+)',/g, (match, review) => {
  updatedCount++;
  const amenitiesData = getAmenities();
  return `topReview: '${review}',${amenitiesData}`;
});

// Сохраняем
fs.writeFileSync('baths.js', bathsContent);

console.log('✅ УДОБСТВА ДОБАВЛЕНЫ!');
console.log(`🏢 Обновлено: ${updatedCount} бань`);
console.log('');
console.log('Что добавлено:');
console.log('  📋 Список удобств (Wi-Fi, парковка и т.д.)');
console.log('  🚗 Информация о парковке');
console.log('  💳 Способы оплаты');
console.log('');
console.log('Примеры удобств:');
console.log('  amenities: [Wi-Fi, Парковка, Душевые, Комната отдыха]');
console.log('  parking: Бесплатная парковка');
console.log('  payment: Наличные, карты');

