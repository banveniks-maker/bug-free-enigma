// Добавляем станции метро для Москвы и Санкт-Петербурга

const fs = require('fs');

let bathsContent = fs.readFileSync('baths.js', 'utf-8');

// Станции метро Москвы
const moscowMetro = [
  'м. Театральная', 'м. Охотный ряд', 'м. Кузнецкий мост',
  'м. Арбатская', 'м. Смоленская', 'м. Краснопресненская',
  'м. Маяковская', 'м. Белорусская', 'м. Новослободская',
  'м. Проспект Мира', 'м. Комсомольская', 'м. Сокольники',
  'м. Таганская', 'м. Курская', 'м. Бауманская',
  'м. Автозаводская', 'м. Павелецкая', 'м. Тульская',
  'м. Юго-Западная', 'м. Университет', 'м. Воробьёвы горы'
];

// Станции метро СПб
const spbMetro = [
  'м. Невский проспект', 'м. Гостиный двор', 'м. Маяковская',
  'м. Площадь Восстания', 'м. Чернышевская', 'м. Петроградская',
  'м. Горьковская', 'м. Василеостровская', 'м. Спортивная',
  'м. Московская', 'м. Парк Победы', 'м. Электросила',
  'м. Автово', 'м. Кировский завод', 'м. Нарвская'
];

// Добавляем метро только для Москвы
bathsContent = bathsContent.replace(
  /moskva: \[([\s\S]*?)\n  \],/,
  (match, cityBaths) => {
    const baths = cityBaths.split('    },').filter(b => b.trim());
    const updatedBaths = baths.map((bath, index) => {
      const metro = moscowMetro[index % moscowMetro.length];
      if (bath.includes('payment:')) {
        return bath.replace(
          /payment: '([^']+)',/,
          `payment: '$1',\n      metro: '${metro}',`
        );
      }
      return bath;
    });
    return `moskva: [\n${updatedBaths.join('    },')}\n  ],`;
  }
);

// Добавляем метро для СПб
bathsContent = bathsContent.replace(
  /'sankt-peterburg': \[([\s\S]*?)\n  \],/,
  (match, cityBaths) => {
    const baths = cityBaths.split('    },').filter(b => b.trim());
    const updatedBaths = baths.map((bath, index) => {
      const metro = spbMetro[index % spbMetro.length];
      if (bath.includes('payment:')) {
        return bath.replace(
          /payment: '([^']+)',/,
          `payment: '$1',\n      metro: '${metro}',`
        );
      }
      return bath;
    });
    return `'sankt-peterburg': [\n${updatedBaths.join('    },')}\n  ],`;
  }
);

// Сохраняем
fs.writeFileSync('baths.js', bathsContent);

console.log('✅ СТАНЦИИ МЕТРО ДОБАВЛЕНЫ!');
console.log('');
console.log('📍 Москва: 25 бань → добавлены станции метро');
console.log('📍 СПб: 20 бань → добавлены станции метро');
console.log('');
console.log('Примеры:');
console.log('  Сандуны → м. Театральная');
console.log('  Мытнинские → м. Площадь Восстания');
console.log('');
console.log('✅ Навигация улучшена!');

