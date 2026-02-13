#!/usr/bin/env node

/**
 * Генератор региональных страниц для banvenik.ru
 * Создаёт отдельную страницу для каждого города России
 */

const fs = require('fs');
const path = require('path');

// Список всех городов России с данными
const cities = [
  // Города-миллионники
  { name: 'Москва', slug: 'moskva', region: 'Московская область', population: '12.7 млн', districts: ['ЦАО', 'САО', 'СВАО', 'ВАО', 'ЮВАО', 'ЮАО', 'ЮЗАО', 'ЗАО', 'СЗАО', 'Зеленоград'] },
  { name: 'Санкт-Петербург', slug: 'sankt-peterburg', region: 'Ленинградская область', population: '5.4 млн', districts: ['Адмиралтейский', 'Василеостровский', 'Выборгский', 'Калининский', 'Кировский', 'Колпинский', 'Красногвардейский', 'Красносельский', 'Кронштадтский', 'Курортный', 'Московский', 'Невский', 'Петроградский', 'Петродворцовый', 'Приморский', 'Пушкинский', 'Фрунзенский', 'Центральный'] },
  { name: 'Новосибирск', slug: 'novosibirsk', region: 'Новосибирская область', population: '1.6 млн', districts: ['Центральный', 'Железнодорожный', 'Заельцовский', 'Кировский', 'Ленинский', 'Октябрьский', 'Первомайский', 'Советский', 'Дзержинский', 'Калининский'] },
  { name: 'Екатеринбург', slug: 'ekaterinburg', region: 'Свердловская область', population: '1.5 млн', districts: ['Верх-Исетский', 'Железнодорожный', 'Кировский', 'Ленинский', 'Октябрьский', 'Орджоникидзевский', 'Чкаловский'] },
  { name: 'Казань', slug: 'kazan', region: 'Республика Татарстан', population: '1.3 млн', districts: ['Вахитовский', 'Приволжский', 'Авиастроительный', 'Ново-Савиновский', 'Московский', 'Советский', 'Кировский'] },
  { name: 'Нижний Новгород', slug: 'nizhniy-novgorod', region: 'Нижегородская область', population: '1.2 млн', districts: ['Автозаводский', 'Канавинский', 'Ленинский', 'Московский', 'Нижегородский', 'Приокский', 'Советский', 'Сормовский'] },
  { name: 'Челябинск', slug: 'chelyabinsk', region: 'Челябинская область', population: '1.2 млн', districts: ['Калининский', 'Курчатовский', 'Ленинский', 'Металлургический', 'Советский', 'Тракторозаводский', 'Центральный'] },
  { name: 'Самара', slug: 'samara', region: 'Самарская область', population: '1.2 млн', districts: ['Железнодорожный', 'Кировский', 'Красноглинский', 'Куйбышевский', 'Ленинский', 'Октябрьский', 'Промышленный', 'Советский', 'Самарский'] },
  { name: 'Омск', slug: 'omsk', region: 'Омская область', population: '1.1 млн', districts: ['Центральный', 'Кировский', 'Ленинский', 'Октябрьский', 'Советский'] },
  { name: 'Ростов-на-Дону', slug: 'rostov-na-donu', region: 'Ростовская область', population: '1.1 млн', districts: ['Ворошиловский', 'Железнодорожный', 'Кировский', 'Ленинский', 'Октябрьский', 'Первомайский', 'Пролетарский', 'Советский'] },
  { name: 'Уфа', slug: 'ufa', region: 'Республика Башкортостан', population: '1.1 млн', districts: ['Демский', 'Калининский', 'Кировский', 'Ленинский', 'Октябрьский', 'Орджоникидзевский', 'Советский'] },
  { name: 'Красноярск', slug: 'krasnoyarsk', region: 'Красноярский край', population: '1.1 млн', districts: ['Железнодорожный', 'Кировский', 'Ленинский', 'Октябрьский', 'Свердловский', 'Советский', 'Центральный'] },
  { name: 'Воронеж', slug: 'voronezh', region: 'Воронежская область', population: '1.1 млн', districts: ['Коминтерновский', 'Ленинский', 'Левобережный', 'Советский', 'Центральный', 'Железнодорожный'] },
  { name: 'Пермь', slug: 'perm', region: 'Пермский край', population: '1.1 млн', districts: ['Дзержинский', 'Индустриальный', 'Кировский', 'Ленинский', 'Мотовилихинский', 'Орджоникидзевский', 'Свердловский'] },
  { name: 'Волгоград', slug: 'volgograd', region: 'Волгоградская область', population: '1.0 млн', districts: ['Ворошиловский', 'Дзержинский', 'Кировский', 'Красноармейский', 'Краснооктябрьский', 'Советский', 'Тракторозаводский', 'Центральный'] },
  
  // Крупные города 500k-1M
  { name: 'Краснодар', slug: 'krasnodar', region: 'Краснодарский край', population: '950 тыс', districts: ['Западный', 'Карасунский', 'Прикубанский', 'Центральный'] },
  { name: 'Саратов', slug: 'saratov', region: 'Саратовская область', population: '840 тыс', districts: ['Волжский', 'Заводской', 'Кировский', 'Ленинский', 'Октябрьский', 'Фрунзенский'] },
  { name: 'Тюмень', slug: 'tyumen', region: 'Тюменская область', population: '820 тыс', districts: ['Калининский', 'Ленинский', 'Центральный', 'Восточный'] },
  { name: 'Тольятти', slug: 'tolyatti', region: 'Самарская область', population: '700 тыс', districts: ['Автозаводский', 'Комсомольский', 'Центральный'] },
  { name: 'Ижевск', slug: 'izhevsk', region: 'Удмуртская Республика', population: '650 тыс', districts: ['Индустриальный', 'Ленинский', 'Октябрьский', 'Первомайский', 'Устиновский'] },
  { name: 'Барнаул', slug: 'barnaul', region: 'Алтайский край', population: '630 тыс', districts: ['Железнодорожный', 'Индустриальный', 'Ленинский', 'Октябрьский', 'Центральный'] },
  { name: 'Ульяновск', slug: 'ulyanovsk', region: 'Ульяновская область', population: '630 тыс', districts: ['Железнодорожный', 'Заволжский', 'Засвияжский', 'Ленинский'] },
  { name: 'Иркутск', slug: 'irkutsk', region: 'Иркутская область', population: '620 тыс', districts: ['Куйбышевский', 'Ленинский', 'Октябрьский', 'Свердловский'] },
  { name: 'Хабаровск', slug: 'habarovsk', region: 'Хабаровский край', population: '620 тыс', districts: ['Железнодорожный', 'Индустриальный', 'Кировский', 'Краснофлотский', 'Центральный'] },
  { name: 'Ярославль', slug: 'yaroslavl', region: 'Ярославская область', population: '610 тыс', districts: ['Дзержинский', 'Заволжский', 'Кировский', 'Красноперекопский', 'Ленинский', 'Фрунзенский'] },
  { name: 'Владивосток', slug: 'vladivostok', region: 'Приморский край', population: '605 тыс', districts: ['Ленинский', 'Первомайский', 'Первореченский', 'Советский', 'Фрунзенский'] },
  { name: 'Махачкала', slug: 'mahachkala', region: 'Республика Дагестан', population: '605 тыс', districts: ['Кировский', 'Ленинский', 'Советский'] },
  { name: 'Томск', slug: 'tomsk', region: 'Томская область', population: '575 тыс', districts: ['Кировский', 'Ленинский', 'Октябрьский', 'Советский'] },
  { name: 'Оренбург', slug: 'orenburg', region: 'Оренбургская область', population: '570 тыс', districts: ['Дзержинский', 'Ленинский', 'Промышленный', 'Центральный'] },
  { name: 'Кемерово', slug: 'kemerovo', region: 'Кемеровская область', population: '555 тыс', districts: ['Заводский', 'Кировский', 'Ленинский', 'Рудничный', 'Центральный'] },
  { name: 'Новокузнецк', slug: 'novokuznetsk', region: 'Кемеровская область', population: '550 тыс', districts: ['Заводской', 'Кузнецкий', 'Куйбышевский', 'Новоильинский', 'Орджоникидзевский', 'Центральный'] },
  { name: 'Рязань', slug: 'ryazan', region: 'Рязанская область', population: '540 тыс', districts: ['Железнодорожный', 'Московский', 'Октябрьский', 'Советский'] },
  { name: 'Набережные Челны', slug: 'naberezhnye-chelny', region: 'Республика Татарстан', population: '535 тыс', districts: ['Автозаводский', 'Комсомольский', 'Центральный'] },
  { name: 'Астрахань', slug: 'astrahan', region: 'Астраханская область', population: '525 тыс', districts: ['Кировский', 'Ленинский', 'Советский', 'Трусовский'] },
  { name: 'Пенза', slug: 'penza', region: 'Пензенская область', population: '520 тыс', districts: ['Железнодорожный', 'Ленинский', 'Октябрьский', 'Первомайский'] },
  { name: 'Киров', slug: 'kirov', region: 'Кировская область', population: '510 тыс', districts: ['Ленинский', 'Октябрьский', 'Первомайский', 'Нововятский'] },
  { name: 'Липецк', slug: 'lipetsk', region: 'Липецкая область', population: '505 тыс', districts: ['Левобережный', 'Октябрьский', 'Правобережный', 'Советский'] },
  
  // Города 200k-500k
  { name: 'Балашиха', slug: 'balashiha', region: 'Московская область', population: '520 тыс', districts: [] },
  { name: 'Чебоксары', slug: 'cheboksary', region: 'Чувашская Республика', population: '500 тыс', districts: ['Калининский', 'Ленинский', 'Московский'] },
  { name: 'Калининград', slug: 'kaliningrad', region: 'Калининградская область', population: '490 тыс', districts: ['Ленинградский', 'Московский', 'Октябрьский', 'Центральный'] },
  { name: 'Тула', slug: 'tula', region: 'Тульская область', population: '475 тыс', districts: ['Привокзальный', 'Пролетарский', 'Советский', 'Центральный', 'Зареченский'] },
  { name: 'Курск', slug: 'kursk', region: 'Курская область', population: '450 тыс', districts: ['Железнодорожный', 'Ленинский', 'Сеймский'] },
  { name: 'Сочи', slug: 'sochi', region: 'Краснодарский край', population: '445 тыс', districts: ['Адлерский', 'Лазаревский', 'Хостинский', 'Центральный'] },
  { name: 'Ставрополь', slug: 'stavropol', region: 'Ставропольский край', population: '435 тыс', districts: ['Ленинский', 'Октябрьский', 'Промышленный'] },
  { name: 'Улан-Удэ', slug: 'ulan-ude', region: 'Республика Бурятия', population: '430 тыс', districts: ['Железнодорожный', 'Октябрьский', 'Советский'] },
  { name: 'Тверь', slug: 'tver', region: 'Тверская область', population: '425 тыс', districts: ['Заволжский', 'Московский', 'Пролетарский', 'Центральный'] },
  { name: 'Магнитогорск', slug: 'magnitogorsk', region: 'Челябинская область', population: '415 тыс', districts: ['Ленинский', 'Орджоникидзевский', 'Правобережный'] },
  { name: 'Иваново', slug: 'ivanovo', region: 'Ивановская область', population: '405 тыс', districts: ['Ленинский', 'Октябрьский', 'Фрунзенский'] },
  { name: 'Брянск', slug: 'bryansk', region: 'Брянская область', population: '405 тыс', districts: ['Бежицкий', 'Володарский', 'Советский', 'Фокинский'] },
  { name: 'Белгород', slug: 'belgorod', region: 'Белгородская область', population: '395 тыс', districts: ['Восточный', 'Западный'] },
  { name: 'Сургут', slug: 'surgut', region: 'Ханты-Мансийский АО', population: '380 тыс', districts: [] },
  { name: 'Владимир', slug: 'vladimir', region: 'Владимирская область', population: '350 тыс', districts: ['Ленинский', 'Октябрьский', 'Фрунзенский'] },
  { name: 'Архангельск', slug: 'arhangelsk', region: 'Архангельская область', population: '345 тыс', districts: ['Ломоносовский', 'Майская горка', 'Октябрьский', 'Соломбальский'] },
  { name: 'Смоленск', slug: 'smolensk', region: 'Смоленская область', population: '330 тыс', districts: ['Заднепровский', 'Ленинский', 'Промышленный'] },
  { name: 'Якутск', slug: 'yakutsk', region: 'Республика Саха (Якутия)', population: '320 тыс', districts: ['Автодорожный', 'Гагаринский', 'Губинский', 'Октябрьский', 'Промышленный', 'Сайсарский', 'Строительный'] },
  { name: 'Владикавказ', slug: 'vladikavkaz', region: 'Республика Северная Осетия', population: '305 тыс', districts: ['Затеречный', 'Иристонский', 'Промышленный', 'Северо-Западный'] },
  { name: 'Калуга', slug: 'kaluga', region: 'Калужская область', population: '350 тыс', districts: ['Ленинский', 'Московский'] },
  { name: 'Нижневартовск', slug: 'nizhnevartovsk', region: 'Ханты-Мансийский АО', population: '280 тыс', districts: [] },
  { name: 'Мурманск', slug: 'murmansk', region: 'Мурманская область', population: '290 тыс', districts: ['Ленинский', 'Октябрьский', 'Первомайский'] },
  { name: 'Петрозаводск', slug: 'petrozavodsk', region: 'Республика Карелия', population: '280 тыс', districts: ['Голиковка', 'Кукковка', 'Октябрьский', 'Перевалка'] },
  
  // Курорты и туристические города
  { name: 'Анапа', slug: 'anapa', region: 'Краснодарский край', population: '90 тыс', districts: [] },
  { name: 'Геленджик', slug: 'gelendzhik', region: 'Краснодарский край', population: '77 тыс', districts: [] },
];

// Типы бань с детальным описанием
const bathTypes = [
  {
    name: 'Русская баня',
    icon: '🔥',
    description: 'Традиционная русская баня на дровах с влажным паром (60-80°C) и настоящими вениками из березы и дуба.',
    features: ['Влажный пар 60-80%', 'Температура 60-80°C', 'Веники (береза, дуб)', 'Парение на полках', 'Контрастные процедуры'],
    benefits: ['Глубокое очищение кожи', 'Вывод токсинов', 'Укрепление иммунитета', 'Расслабление мышц', 'Улучшение кровообращения']
  },
  {
    name: 'Финская сауна',
    icon: '♨️',
    description: 'Сухой жар до 90-100°C с низкой влажностью (10-15%) для интенсивного прогрева и потоотделения.',
    features: ['Сухой жар 10-15%', 'Температура 80-100°C', 'Деревянные полки', 'Печь-каменка', 'Ароматерапия'],
    benefits: ['Интенсивное потоотделение', 'Сжигание калорий', 'Детоксикация', 'Укрепление сосудов', 'Снятие стресса']
  },
  {
    name: 'Хамам (Турецкая баня)',
    icon: '🌊',
    description: 'Турецкая баня с влажным мягким паром (100% влажность, 40-50°C) и мраморными лежаками.',
    features: ['Влажность 100%', 'Температура 40-50°C', 'Мраморные лежаки', 'Пенный массаж', 'Скрабирование'],
    benefits: ['Мягкое прогревание', 'Глубокое увлажнение кожи', 'Релаксация', 'Улучшение сна', 'Снятие напряжения']
  },
  {
    name: 'Инфракрасная сауна',
    icon: '🌡️',
    description: 'Современная сауна с ИК-излучением для глубокого прогрева тканей при комфортной температуре (45-60°C).',
    features: ['Температура 45-60°C', 'ИК-излучение', 'Компактный размер', 'Быстрый нагрев', 'Экономичность'],
    benefits: ['Прогрев на глубину до 4см', 'Снижение веса', 'Улучшение метаболизма', 'Омоложение кожи', 'Снятие боли в суставах']
  },
  {
    name: 'Японская баня (Офуро/Фурако)',
    icon: '🛁',
    description: 'Традиционная японская купель с горячей водой (40-45°C) из кедра или дуба.',
    features: ['Температура воды 40-45°C', 'Деревянная купель', 'Ароматические масла', 'Медитация', 'Чайная церемония'],
    benefits: ['Расслабление', 'Улучшение сна', 'Снятие усталости', 'Омоложение', 'Гармония тела и духа']
  },
  {
    name: 'Кедровая бочка',
    icon: '🪵',
    description: 'Мини-сауна из кедра с паром целебных трав, голова остаётся снаружи для комфортного дыхания.',
    features: ['Кедр 100%', 'Фитопар', 'Температура 45-50°C', 'Голова снаружи', 'Индивидуальная процедура'],
    benefits: ['Фитотерапия', 'Похудение', 'Очищение кожи', 'Лечение целлюлита', 'Расслабление без нагрузки на сердце']
  }
];

// Тарифы
const tariffs = [
  {
    name: 'Эконом',
    price: '1000₽/час',
    features: ['Парная на 4 человека', 'Душевая', 'Комната отдыха', 'Веники в подарок', 'Чай/травы']
  },
  {
    name: 'Базовый',
    price: '1500₽/час',
    features: ['Русская баня на дровах', 'До 6 человек', 'Душевая комната', 'Комната отдыха', 'Веники в подарок', 'Аудиосистема']
  },
  {
    name: 'Стандарт',
    price: '2000₽/час',
    features: ['Финская сауна', 'До 8 человек', 'Душевая + обливное ведро', 'Комната отдыха с TV', 'Веники + ароматы', 'Wi-Fi']
  },
  {
    name: 'Премиум',
    price: '3000₽/час',
    popular: true,
    features: ['Комплекс: русская + финская', 'До 10 человек', 'Бассейн с подсветкой', 'Караоке', 'Комната отдыха с камином', 'Чайная церемония', 'Халаты и тапочки']
  },
  {
    name: 'VIP',
    price: '5000₽/час',
    features: ['2 парные + хамам', 'До 15 человек', 'Джакузи + купель', 'Бильярд', 'Банкетный зал', 'Услуги банщика', 'Банный бар', 'Халаты премиум']
  },
  {
    name: 'Люкс',
    price: '8000₽/час',
    features: ['Весь комплекс в аренду', 'До 25 человек', '3 парные разных типов', 'Бассейн 12м', 'Spa-зона', 'Банкетный зал 50м²', 'Персональный банщик', 'Кейтеринг', 'Valet parking']
  }
];

// Шаблон региональной страницы
function generateCityPage(city) {
  const { name, slug, region, population, districts } = city;
  
  const hasDistricts = districts && districts.length > 0;
  const districtsList = hasDistricts ? 
    districts.slice(0, 6).map(d => `"${d}"`).join(', ') : '';
  
  return `---
import Layout from '../layouts/Layout.astro';

const city = "${name}";
const citySlug = "${slug}";
const region = "${region}";
const population = "${population}";

// Типы бань
const bathTypes = ${JSON.stringify(bathTypes, null, 2)};

// Тарифы
const tariffs = ${JSON.stringify(tariffs, null, 2)};

// Районы города
const districts = ${hasDistricts ? `[${districtsList}]` : '[]'};

// FAQ для города
const faq = [
  {
    question: \`Где находятся ваши бани в \${city}е?\`,
    answer: \`У нас ${hasDistricts ? `более 15 филиалов в разных районах ${name}а` : `несколько филиалов в ${name}е`}. Выберите ближайший к вам на карте или позвоните нам для консультации.\`
  },
  {
    question: "Сколько стоит аренда бани?",
    answer: \`Цены начинаются от 1000₽/час за эконом-вариант. Полный прайс-лист смотрите в разделе "Тарифы".\`
  },
  {
    question: "Можно ли забронировать баню на праздник?",
    answer: "Да, мы специализируемся на проведении праздников, дней рождения, корпоративов. Есть банкетные залы и дополнительные услуги."
  },
  {
    question: "Что взять с собой в баню?",
    answer: "Достаточно взять купальные принадлежности и сменную обувь. Веники, халаты, полотенца и всё необходимое предоставляется (зависит от тарифа)."
  }
];
---

<Layout 
  title={\`Бани и сауны в \${city}е - аренда от 1000₽/час | БанВеник.ру\`}
  description={\`Лучшие бани и сауны в \${city}е: русские бани на дровах, финские сауны, хамамы. Аренда от 1000₽/час. ${hasDistricts ? 'Филиалы во всех районах' : 'Удобное расположение'}. Бронируйте онлайн!\`}
  keywords={\`баня \${city}, сауна \${city}, русская баня \${city}, финская сауна \${city}, аренда бани \${city}, баня с бассейном \${city}\`}
>
  <!-- Hero Section -->
  <section class="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white py-16 md:py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl">
        <h1 class="text-3xl md:text-5xl font-bold mb-4">
          Бани и сауны в {city}е
        </h1>
        <p class="text-xl md:text-2xl mb-2 text-amber-100">
          {region} • Население: {population}
        </p>
        <p class="text-lg md:text-xl mb-6 text-amber-100">
          ${hasDistricts ? 'Филиалы во всех районах города' : 'Удобное расположение в центре города'}. Работаем круглосуточно.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#prices" class="bg-white text-amber-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transition text-center">
            Цены и тарифы
          </a>
          <a href="tel:+79000000000" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-amber-900 transition text-center">
            Позвонить сейчас
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Breadcrumbs -->
  <section class="bg-gray-50 py-4">
    <div class="container mx-auto px-4">
      <div class="text-sm text-gray-600">
        <a href="/" class="hover:text-amber-700">Главная</a>
        <span class="mx-2">→</span>
        <span class="text-gray-900">{city}</span>
      </div>
    </div>
  </section>

  <!-- Types of Baths -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
        Типы бань в {city}е
      </h2>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Выберите тип парной по своему вкусу — от классической русской бани до современной инфракрасной сауны
      </p>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bathTypes.map(bath => (
          <div class="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <div class="text-5xl mb-4">{bath.icon}</div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">{bath.name}</h3>
            <p class="text-gray-600 mb-4">{bath.description}</p>
            
            <div class="mb-4">
              <h4 class="font-semibold text-gray-800 mb-2">Особенности:</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                {bath.features.slice(0, 3).map(feature => (
                  <li class="flex items-start">
                    <svg class="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Districts Section -->
  ${hasDistricts ? `
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
        Наши филиалы в {city}е
      </h2>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Бани БанВеник.ру работают во всех районах города. Выберите ближайший к вам!
      </p>
      
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {districts.map(district => (
          <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-800 font-medium">{district} район</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Prices Section -->
  <section id="prices" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
        Цены на аренду бани в {city}е
      </h2>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Выберите подходящий тариф для незабываемого отдыха
      </p>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tariffs.map(tariff => (
          <div class={\`bg-white rounded-xl shadow-lg overflow-hidden \${tariff.popular ? 'ring-4 ring-amber-500 transform scale-105' : ''}\`}>
            {tariff.popular && (
              <div class="bg-amber-500 text-white text-center py-2 font-semibold">
                Популярный
              </div>
            )}
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-2 text-gray-900">{tariff.name}</h3>
              <div class="text-3xl font-bold text-amber-700 mb-6">{tariff.price}</div>
              <ul class="space-y-2 mb-6">
                {tariff.features.map(feature => (
                  <li class="flex items-start text-sm">
                    <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="tel:+79000000000" class={\`block text-center py-3 rounded-lg font-semibold transition \${tariff.popular ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}\`}>
                Забронировать
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- SEO Content -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="prose max-w-none text-gray-700">
        <h2 class="text-3xl font-bold mb-6 text-gray-900">
          Бани и сауны в {city}е — традиции и современность
        </h2>
        
        <p class="mb-4 text-lg">
          <strong>БанВеник.ру</strong> в {city}е — это ${hasDistricts ? 'сеть современных банных комплексов, расположенных во всех районах города' : 'современный банный комплекс с удобным расположением'}. 
          Мы предлагаем лучшие бани и сауны в {city}е для тех, кто ценит качество, комфорт и настоящие традиции русской бани.
        </p>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-gray-900">Почему выбирают наши бани в {city}е?</h3>
        
        <ul class="list-none space-y-3 mb-6">
          <li class="flex items-start">
            <span class="text-amber-600 mr-2 text-xl">✓</span>
            <span><strong>Удобное расположение</strong> — ${hasDistricts ? 'филиалы во всех районах города, легко добраться из любой точки' : 'удобное расположение в центре города'}</span>
          </li>
          <li class="flex items-start">
            <span class="text-amber-600 mr-2 text-xl">✓</span>
            <span><strong>6 типов парных</strong> — от классической русской бани до современной инфракрасной сауны</span>
          </li>
          <li class="flex items-start">
            <span class="text-amber-600 mr-2 text-xl">✓</span>
            <span><strong>Работаем 24/7</strong> — бронируйте баню в любое удобное время, даже ночью</span>
          </li>
          <li class="flex items-start">
            <span class="text-amber-600 mr-2 text-xl">✓</span>
            <span><strong>Доступные цены</strong> — от 1000₽/час, гибкая система скидок</span>
          </li>
          <li class="flex items-start">
            <span class="text-amber-600 mr-2 text-xl">✓</span>
            <span><strong>Стерильная чистота</strong> — профессиональная уборка после каждого посещения</span>
          </li>
        </ul>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-gray-900">Услуги и удобства</h3>
        
        <p class="mb-4">
          В наших банях в {city}е вы найдете всё необходимое для полноценного отдыха: просторные парные, 
          комфортные комнаты отдыха, душевые с горячей водой, бассейны с подсветкой (в тарифах Премиум и выше). 
          Дополнительно доступны услуги профессионального банщика, массаж, ароматерапия.
        </p>

        <h3 class="text-2xl font-bold mb-4 mt-8 text-gray-900">Как забронировать баню?</h3>
        
        <p class="mb-4">
          Забронировать баню в {city}е очень просто — позвоните нам по телефону 
          <a href="tel:+79000000000" class="text-amber-700 hover:text-amber-800 font-semibold">+7 (900) 000-00-00</a> 
          или оставьте заявку на сайте. Наши администраторы помогут выбрать подходящий филиал и тариф, 
          ответят на все вопросы.
        </p>

        <p class="mb-4">
          Приходите в БанВеник.ру в {city}е — здесь вас ждет настоящий русский пар, 
          уютная атмосфера и незабываемый отдых!
        </p>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 max-w-4xl">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Частые вопросы
      </h2>
      
      <div class="space-y-6">
        {faq.map((item, index) => (
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-3 text-gray-900">
              {index + 1}. {item.question}
            </h3>
            <p class="text-gray-700">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-16 bg-gradient-to-br from-amber-900 to-amber-800 text-white">
    <div class="container mx-auto px-4 text-center max-w-3xl">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        Забронируйте баню в {city}е прямо сейчас!
      </h2>
      <p class="text-xl mb-8 text-amber-100">
        Звоните или пишите — мы работаем круглосуточно
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="tel:+79000000000" class="bg-white text-amber-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transition inline-flex items-center justify-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          +7 (900) 000-00-00
        </a>
        
        <a href="mailto:info@banvenik.ru" class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-amber-900 transition inline-flex items-center justify-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          info@banvenik.ru
        </a>
      </div>
    </div>
  </section>
</Layout>

<style>
  .prose {
    line-height: 1.7;
  }
</style>
`;
}

// Создание всех страниц
function generateAllPages() {
  const pagesDir = path.join(__dirname, 'src', 'pages');
  
  // Создаём директорию pages если её нет
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }
  
  console.log(`\n🚀 Генерация региональных страниц для ${cities.length} городов...\n`);
  
  cities.forEach((city, index) => {
    const pageContent = generateCityPage(city);
    const filename = path.join(pagesDir, `${city.slug}.astro`);
    
    fs.writeFileSync(filename, pageContent, 'utf8');
    console.log(`✅ [${index + 1}/${cities.length}] Создана страница: ${city.slug}.astro (${city.name})`);
  });
  
  console.log(`\n🎉 Успешно создано ${cities.length} региональных страниц!`);
  console.log(`\n📊 Статистика:`);
  console.log(`   - Городов-миллионников: ${cities.filter(c => c.population.includes('млн')).length}`);
  console.log(`   - Городов 500k-1M: ${cities.filter(c => c.population.includes('тыс') && parseInt(c.population) >= 500).length}`);
  console.log(`   - Городов <500k: ${cities.filter(c => c.population.includes('тыс') && parseInt(c.population) < 500).length}`);
  console.log(`   - Типов бань: ${bathTypes.length}`);
  console.log(`   - Тарифов: ${tariffs.length}`);
  console.log(`\n💾 Все файлы сохранены в: src/pages/\n`);
}

// Запуск генератора
if (require.main === module) {
  generateAllPages();
}

module.exports = { generateAllPages, cities, bathTypes, tariffs };
