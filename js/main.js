const APARTAMENT_TITLES = [
  'Только сегодня',
  'Уникальное предложение',
  'Дешевле не найдёте',
  'Кто сегодня не успеет, завтра крепко пожалеет',
];

const APARTAMENT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const APARTAMENT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const APARTAMENT_DESCRIPTIONS = [
  'Как в лучших домах Парижа и Лондона',
  'Квартира только Славянам, Стасянам не звонить',
];

const APARTAMENT_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const SIMILAR_ADVERTISEMENT_COUNT = 10;

const getRandomInt = (min, max, decimal) => (Math.random() * (max - min) + min).toFixed(decimal);

const getNumberFromRange = (minNumber, maxNumber, decimalPlaces = 0) => {
  const lower = Math.min(Math.abs(minNumber), Math.abs(maxNumber));
  const upper = Math.max(Math.abs(minNumber), Math.abs(maxNumber));

  return getRandomInt(lower, upper, decimalPlaces);
};

const getRandomElementInArray = (array) => {
  const randomIndex =  Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomArray = (array) => {
  const randomIndex =  Math.floor(Math.random() * array.length);
  return array.slice(randomIndex);
};

const createAuthor = (index) => {
  return {
    avatar: 'img/avatars/user' + ((index < 10) ? '0' + index : index)  + '.png',
  };
};

const createOffer = (location) => {
  return {
    title: getRandomElementInArray(APARTAMENT_TITLES),
    address : location.lat + ', ' + location.lng,
    price: getNumberFromRange(1000, 100000),
    type: getRandomElementInArray(APARTAMENT_TYPES),
    rooms: getNumberFromRange(1, 10),
    guests: getNumberFromRange(1, 10),
    checkin: getRandomElementInArray(TIMES),
    checkout: getRandomElementInArray(TIMES),
    features: getRandomArray(APARTAMENT_FEATURES),
    description: getRandomElementInArray(APARTAMENT_DESCRIPTIONS),
    photos: getRandomArray(APARTAMENT_PHOTOS),
  };
};

const createLocation = () => {
  return {
    lat: getRandomInt(MIN_LATITUDE, MAX_LATITUDE, 5),
    lng: getRandomInt(MIN_LONGITUDE, MAX_LONGITUDE, 5),
  };
};

const createAdvertisements = () => {
  const advertisements = [];
  for (let i = 1; i <= SIMILAR_ADVERTISEMENT_COUNT; i++) {
    const author = createAuthor (i);
    const location = createLocation ();
    const offer = createOffer (location);
    advertisements.push ({
      author,
      offer,
      location,
    });
  }
  return advertisements;
};

const similarAdvertisements = createAdvertisements();
console.log(similarAdvertisements);
