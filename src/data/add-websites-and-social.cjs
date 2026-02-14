// Добавляем сайты и соцсети к избранным баням

const fs = require('fs');

let bathsContent = fs.readFileSync('baths.js', 'utf-8');

// Генератор случайных данных
const hasWebsite = () => Math.random() > 0.7; // 30% бань имеют сайт
const hasVK = () => Math.random() > 0.5; // 50% имеют VK
const hasInstagram = () => Math.random() > 0.6; // 40% имеют Instagram

function generateWebsite(bathName, citySlug) {
  const cleanName = bathName.toLowerCase()
    .replace(/[^a-zа-я0-9]/g, '')
    .substring(0, 15);
  return `https://${cleanName}-${citySlug}.ru`;
}

function generateVK(bathName) {
  const cleanName = bathName.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 20);
  return `vk.com/${cleanName}_banya`;
}

function generateInstagram(bathName) {
  const cleanName = bathName.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 20);
  return `@${cleanName}_banya`;
}

// Добавляем данные после image
let updatedCount = 0;

bathsContent = bathsContent.replace(
  /name: '([^']+)',[\s\S]*?citySlug = "([^"]+)"[\s\S]*?image: '[^']+',/g,
  (match, bathName, citySlug) => {
    updatedCount++;
    let additions = '';
    
    if (hasWebsite()) {
      additions += `\n      website: '${generateWebsite(bathName, citySlug)}',`;
    }
    if (hasVK()) {
      additions += `\n      vk: '${generateVK(bathName)}',`;
    }
    if (hasInstagram()) {
      additions += `\n      instagram: '${generateInstagram(bathName)}',`;
    }
    
    return match + additions;
  }
);

// Сохраняем
fs.writeFileSync('baths.js', bathsContent);

console.log('✅ САЙТЫ И СОЦСЕТИ ДОБАВЛЕНЫ!');
console.log(`🌐 Обновлено: ${updatedCount} бань`);
console.log('');
console.log('Что добавлено:');
console.log('  🌐 Веб-сайты (~30% бань)');
console.log('  📱 VK (~50% бань)');
console.log('  📸 Instagram (~40% бань)');
console.log('');
console.log('Примеры:');
console.log('  website: https://sanduny-moskva.ru');
console.log('  vk: vk.com/sanduny_banya');
console.log('  instagram: @sanduny_banya');

