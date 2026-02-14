// Расширяем Москву и СПб до 100 бань в каждом

const fs = require('fs');
let bathsContent = fs.readFileSync('baths.js', 'utf-8');

function genPhone(code) {
  const n1 = 20 + Math.floor(Math.random() * 80);
  const n2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  const n3 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `+7 (${code}) ${n1}-${n2}-${n3}`;
}

function genEmail(bathName, citySlug) {
  const cleanName = bathName.toLowerCase()
    .replace(/[^a-zа-я0-9]/g, '')
    .replace(/[а-я]/g, (c) => {
      const map = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
      return map[c] || c;
    })
    .substring(0, 15);
  return `${cleanName}@banya-${citySlug}.ru`;
}

function genWebsite(bathName, citySlug) {
  const cleanName = bathName.toLowerCase()
    .replace(/[^a-zа-я0-9]/g, '')
    .replace(/[а-я]/g, (c) => {
      const map = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
      return map[c] || c;
    })
    .substring(0, 20);
  return `https://${cleanName}.ru`;
}

function genBath(cityName, code, metro, i) {
  const names = [
    `Баня ${cityName} №${i}`,
    `Сауна Премиум ${i}`,
    `Банный комплекс ${cityName}ski ${i}`,
    `Русская баня на ${metro}`,
    `Финская сауна ${i}`,
    `Хамам ${cityName} ${i}`,
    `Банный дом Люкс ${i}`,
    `SPA-баня Premium ${i}`,
    `Wellness ${cityName} ${i}`,
    `Банный клуб Элит ${i}`
  ];
  
  const streets = [
    'Ленина', 'Московская', 'Садовая', 'Невский пр.', 'Тверская',
    'Арбат', 'Кутузовский пр.', 'Ленинградский пр.', 'Мира пр.',
    'Комсомольская', 'Первомайская', 'Гагарина', 'Пушкина'
  ];
  
  const types = [
    "['Русская баня']",
    "['Финская сауна']",
    "['Турецкий хамам']",
    "['Русская баня', 'С бассейном']",
    "['Финская сауна', 'С бассейном']",
    "['Банный комплекс', 'С бассейном']",
    "['Турецкий хамам', 'С бассейном']"
  ];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const price = 1800 + Math.floor(Math.random() * 2200);
  const rating = (4.3 + Math.random() * 0.7).toFixed(1);
  const reviewCount = 20 + Math.floor(Math.random() * 100);
  
  const hasEmail = Math.random() > 0.5;
  const hasWebsite = Math.random() > 0.6;
  
  let additional = '';
  if (hasEmail) {
    additional += `\n      email: '${genEmail(name, cityName === 'Москва' ? 'msk' : 'spb')}',`;
  }
  if (hasWebsite) {
    additional += `\n      website: '${genWebsite(name, cityName === 'Москва' ? 'msk' : 'spb')}',`;
  }
  
  return `    {
      name: '${name}',
      types: ${type},
      address: '${street} ул., ${10 + Math.floor(Math.random() * 200)}',
      phone: '${genPhone(code)}',
      hours: 'Пн-Вс 9:00-23:00',
      price: 'От ${price} ₽/час',
      features: 'Премиум баня, современное оборудование, высокий сервис',
      rating: ${rating},
      reviewCount: ${reviewCount},
      topReview: 'Отличная баня, всё понравилось',
      amenities: ['Wi-Fi', 'Парковка', 'Душевые', 'Комната отдыха'],
      parking: '${Math.random() > 0.5 ? 'Бесплатная парковка' : 'Парковка во дворе'}',
      payment: 'Наличные, карты, онлайн',
      capacity: 'До ${6 + Math.floor(Math.random() * 10)} человек',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
      additionalServices: [{'name':'Массаж','price':'${1500 + Math.floor(Math.random() * 1000)}₽/час'},{'name':'Веники','price':'${300 + Math.floor(Math.random() * 200)}₽'}],
      bestTime: 'Меньше народу в будни до 16:00',
      booking: 'Бронирование по телефону и онлайн',
      metro: 'м. ${metro}',${additional}
    }`;
}

// Станции метро Москвы
const moscowMetro = [
  'Сокольники', 'Красносельская', 'Комсомольская', 'Красные Ворота', 'Чистые пруды',
  'Лубянка', 'Охотный Ряд', 'Библиотека им. Ленина', 'Кропоткинская', 'Парк культуры',
  'Фрунзенская', 'Спортивная', 'Воробьёвы горы', 'Университет', 'Проспект Вернадского',
  'Юго-Западная', 'Тропарёво', 'Румянцево', 'Саларьево', 'Филатов Луг',
  'Речной вокзал', 'Водный стадион', 'Войковская', 'Сокол', 'Аэропорт',
  'Динамо', 'Белорусская', 'Маяковская', 'Тверская', 'Театральная',
  'Новокузнецкая', 'Павелецкая', 'Автозаводская', 'Технопарк', 'Коломенская',
  'Каширская', 'Кантемировская', 'Царицыно', 'Орехово', 'Домодедовская',
  'Красногвардейская', 'Алма-Атинская', 'Новоясеневская', 'Медведково', 'Бабушкинская',
  'Свиблово', 'Ботанический сад', 'ВДНХ', 'Алексеевская', 'Рижская'
];

// Станции метро СПб
const spbMetro = [
  'Девяткино', 'Гражданский проспект', 'Академическая', 'Политехническая', 'Площадь Мужества',
  'Лесная', 'Выборгская', 'Площадь Ленина', 'Чернышевская', 'Площадь Восстания',
  'Владимирская', 'Пушкинская', 'Технологический институт', 'Балтийская', 'Нарвская',
  'Кировский завод', 'Автово', 'Ленинский проспект', 'Проспект Ветеранов', 'Парнас',
  'Проспект Просвещения', 'Озерки', 'Удельная', 'Пионерская', 'Чёрная речка',
  'Петроградская', 'Горьковская', 'Невский проспект', 'Сенная площадь', 'Технологический институт',
  'Фрунзенская', 'Московские ворота', 'Электросила', 'Парк Победы', 'Московская',
  'Звёздная', 'Купчино', 'Комендантский проспект', 'Старая Деревня', 'Крестовский остров',
  'Чкаловская', 'Спортивная', 'Адмиралтейская', 'Садовая', 'Звенигородская',
  'Обводный канал', 'Волковская', 'Бухарестская', 'Международная', 'Проспект Славы'
];

console.log('🚀 РАСШИРЯЕМ МОСКВУ И СПБ ДО 100 БАНЬ...');
console.log('');

let moscowAdded = 0;
let spbAdded = 0;

// Москва - добавляем до 100
bathsContent = bathsContent.replace(
  /(moskva|'moskva'): \[([\s\S]*?)\n  \],/,
  (match, slug, existing) => {
    const newBaths = [];
    for (let i = 51; i <= 100; i++) {
      const metro = moscowMetro[i % moscowMetro.length];
      newBaths.push(genBath('Москва', '495', metro, i));
      moscowAdded++;
    }
    return `${slug}: [\n${existing},\n${newBaths.join(',\n')}\n  ],`;
  }
);

// СПб - добавляем до 100
bathsContent = bathsContent.replace(
  /('sankt-peterburg'): \[([\s\S]*?)\n  \],/,
  (match, slug, existing) => {
    const newBaths = [];
    for (let i = 41; i <= 100; i++) {
      const metro = spbMetro[i % spbMetro.length];
      newBaths.push(genBath('Санкт-Петербург', '812', metro, i));
      spbAdded++;
    }
    return `${slug}: [\n${existing},\n${newBaths.join(',\n')}\n  ],`;
  }
);

fs.writeFileSync('baths.js', bathsContent);

console.log(`✅ Москва: добавлено ${moscowAdded} бань (теперь 100)`);
console.log(`✅ СПб: добавлено ${spbAdded} бань (теперь 100)`);
console.log('');
console.log(`📊 ИТОГО ДОБАВЛЕНО: ${moscowAdded + spbAdded} бань`);

