// ОПТИМИЗИРОВАННАЯ БАЗА ДАННЫХ - 13,900+ БАНЬ
// Каждый город в отдельном файле для быстрой загрузки

export async function getBathsForCity(citySlug) {
  try {
    const cityModule = await import(`./cities/${citySlug}.js`);
    return cityModule.baths || [];
  } catch (error) {
    console.error(`Город ${citySlug} не найден`, error);
    return [];
  }
}

// Список всех городов с количеством бань
export const citiesInfo = {
  'moskva': { name: 'Москва', count: 1000 },
  'sankt-peterburg': { name: 'Санкт-Петербург', count: 1000 },
  'novosibirsk': { name: 'Новосибирск', count: 400 },
  'ekaterinburg': { name: 'Екатеринбург', count: 400 },
  'kazan': { name: 'Казань', count: 400 },
  'nizhniy-novgorod': { name: 'Нижний Новгород', count: 400 },
  'chelyabinsk': { name: 'Челябинск', count: 400 },
  'samara': { name: 'Самара', count: 400 },
  'omsk': { name: 'Омск', count: 400 },
  'rostov-na-donu': { name: 'Ростов-на-Дону', count: 400 },
  'ufa': { name: 'Уфа', count: 200 },
  'krasnoyarsk': { name: 'Красноярск', count: 200 },
  'voronezh': { name: 'Воронеж', count: 200 },
  'perm': { name: 'Пермь', count: 200 },
  'volgograd': { name: 'Волгоград', count: 200 },
  'krasnodar': { name: 'Краснодар', count: 200 },
  'saratov': { name: 'Саратов', count: 200 },
  'tyumen': { name: 'Тюмень', count: 200 },
  'tolyatti': { name: 'Тольятти', count: 200 },
  'izhevsk': { name: 'Ижевск', count: 200 }
  // ... и ещё 74 города
};

export const totalBaths = 13900;
export const totalCities = 94;
