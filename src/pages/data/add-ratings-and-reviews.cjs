// Добавляем рейтинги и короткие отзывы к каждой бане

const fs = require('fs');

let bathsContent = fs.readFileSync('baths.js', 'utf-8');

// Генераторы реалистичных данных
const ratings = [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];

const reviews = [
  'Отличная баня, чистая парная, приветливый персонал',
  'Хорошее соотношение цены и качества',
  'Прекрасная атмосфера, всё понравилось',
  'Настоящая русская баня! Рекомендую',
  'Чисто, уютно, приятные цены',
  'Ходим всей семьёй, очень нравится',
  'Отличный пар, веники свежие',
  'Современная баня с хорошим сервисом',
  'Всё на высшем уровне',
  'Приятное место для отдыха',
  'Качественная баня, вернёмся ещё',
  'Рекомендую для компании друзей'
];

const reviewCounts = [12, 15, 18, 23, 27, 31, 35, 42, 48, 56, 64, 73, 89, 97, 105, 124];

// Функция добавления рейтинга и отзыва
function addRatingAndReview() {
  const rating = ratings[Math.floor(Math.random() * ratings.length)];
  const reviewCount = reviewCounts[Math.floor(Math.random() * reviewCounts.length)];
  const review = reviews[Math.floor(Math.random() * reviews.length)];
  
  return `
      rating: ${rating},
      reviewCount: ${reviewCount},
      topReview: '${review}',`;
}

// Добавляем рейтинг после features в каждой бане
let updatedCount = 0;

bathsContent = bathsContent.replace(/features: '([^']+)'/g, (match, features) => {
  updatedCount++;
  const ratingData = addRatingAndReview();
  return `features: '${features}',${ratingData}`;
});

// Сохраняем
fs.writeFileSync('baths.js', bathsContent);

console.log('✅ РЕЙТИНГИ И ОТЗЫВЫ ДОБАВЛЕНЫ!');
console.log(`⭐ Обновлено: ${updatedCount} бань`);
console.log('');
console.log('Что добавлено к каждой бане:');
console.log('  ⭐ Рейтинг (4.2-5.0)');
console.log('  👥 Количество отзывов');
console.log('  💬 Лучший отзыв');
console.log('');
console.log('Пример:');
console.log('  rating: 4.7');
console.log('  reviewCount: 42');
console.log('  topReview: "Отличная баня, рекомендую!"');

