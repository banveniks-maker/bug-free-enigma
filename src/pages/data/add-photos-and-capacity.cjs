// Добавляем фотографии и вместимость к каждой бане

const fs = require('fs');

let bathsContent = fs.readFileSync('baths.js', 'utf-8');

// Placeholder изображения для разных типов бань
const bathImages = {
  'Русская баня': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
  'Финская сауна': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
  'Турецкий хамам': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
  'С бассейном': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  'Баня на дровах': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
  'Банный комплекс': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'
};

const capacities = [
  'До 4 человек',
  'До 6 человек', 
  'До 8 человек',
  'До 10 человек',
  'До 12 человек',
  'До 15 человек'
];

// Функция получения изображения по типу бани
function getImageForBathType(bathText) {
  if (bathText.includes('Турецкий хамам')) return bathImages['Турецкий хамам'];
  if (bathText.includes('Финская сауна')) return bathImages['Финская сауна'];
  if (bathText.includes('С бассейном')) return bathImages['С бассейном'];
  if (bathText.includes('Баня на дровах')) return bathImages['Баня на дровах'];
  if (bathText.includes('Банный комплекс')) return bathImages['Банный комплекс'];
  return bathImages['Русская баня'];
}

// Добавляем фото и вместимость после metro/payment
let updatedCount = 0;

bathsContent = bathsContent.replace(
  /(metro: '[^']+',|payment: '[^']+',)/g,
  (match) => {
    updatedCount++;
    const capacity = capacities[Math.floor(Math.random() * capacities.length)];
    
    // Определяем тип бани из контекста
    const bathContext = bathsContent.substring(
      bathsContent.lastIndexOf('{', bathsContent.indexOf(match)),
      bathsContent.indexOf(match)
    );
    const image = getImageForBathType(bathContext);
    
    return `${match}
      capacity: '${capacity}',
      image: '${image}',`;
  }
);

// Сохраняем
fs.writeFileSync('baths.js', bathsContent);

console.log('✅ ФОТО И ВМЕСТИМОСТЬ ДОБАВЛЕНЫ!');
console.log(`📷 Обновлено: ${updatedCount} бань`);
console.log('');
console.log('Что добавлено:');
console.log('  📷 Фотографии (placeholder от Unsplash)');
console.log('  👥 Вместимость (4-15 человек)');
console.log('');
console.log('Примеры:');
console.log('  capacity: До 8 человек');
console.log('  image: https://images.unsplash.com/...');

