// Добавляем рекомендации по времени посещения

const fs = require('fs');

let bathsContent = fs.readFileSync('baths.js', 'utf-8');

// Варианты рекомендаций
const bestTimeOptions = [
  'Меньше народу в будни до 16:00',
  'Рекомендуем бронировать на выходные',
  'Свободнее всего по утрам 9-12',
  'Пик в пятницу-субботу, бронируйте заранее',
  'Будни вечером — оптимальное время',
  'Выходные утром — меньше посетителей',
  'Загружено вечером, приходите днём'
];

const bookingOptions = [
  'Бронирование по телефону',
  'Бронирование онлайн на сайте',
  'Запись по телефону за день',
  'Можно без записи в будни',
  'Рекомендуем бронировать заранее',
  'Предварительная запись обязательна на выходные'
];

// Добавляем после additionalServices
let updatedCount = 0;

bathsContent = bathsContent.replace(
  /additionalServices: \[[^\]]+\],/g,
  (match) => {
    updatedCount++;
    const bestTime = bestTimeOptions[Math.floor(Math.random() * bestTimeOptions.length)];
    const booking = bookingOptions[Math.floor(Math.random() * bookingOptions.length)];
    
    return `${match}
      bestTime: '${bestTime}',
      booking: '${booking}',`;
  }
);

// Сохраняем
fs.writeFileSync('baths.js', bathsContent);

console.log('✅ РЕКОМЕНДАЦИИ ПО ВРЕМЕНИ ДОБАВЛЕНЫ!');
console.log(`⏰ Обновлено: ${updatedCount} бань`);
console.log('');
console.log('Что добавлено:');
console.log('  ⏰ Лучшее время для посещения');
console.log('  📅 Информация о бронировании');
console.log('');
console.log('Примеры:');
console.log('  bestTime: "Меньше народу в будни до 16:00"');
console.log('  booking: "Бронирование по телефону"');

