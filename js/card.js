import { createAdvertisements } from './data.js';

const fillTextContent = (element, option1, option2) => {
  (option1) ? element.textContent = option1 : option2 || element.remove();
};

const cleanPhotoContainer = (container) => {
  container.innerHTML = '';
};

const createCard = (advertisement) => {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const card = template.cloneNode(true);
  const cardTitle = card.querySelector('.popup__title');
  const cardAddress = card.querySelector('.popup__text--address');
  const cardPrice = card.querySelector('.popup__text--price');
  const cardType = card.querySelector('.popup__type');
  const cardCapacity = card.querySelector('.popup__text--capacity');
  const cardTime = card.querySelector('.popup__text--time');
  const cardFeaturesList = card.querySelector('.popup__features');
  const cardFeatures = card.querySelectorAll('.popup__feature');
  const cardDescription = card.querySelector('.popup__description');
  const cardPhotos = card.querySelector('.popup__photos');
  const cardPhotoItems = cardPhotos.querySelectorAll('.popup__photo');
  const cardPhotoTemplate = cardPhotoItems[0];
  const avatar = card.querySelector('.popup__avatar');
  const houseTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  fillTextContent(cardTitle, advertisement.offer.title, 'Объявление');
  fillTextContent(cardAddress, advertisement.offer.address);
  fillTextContent(cardPrice, `${advertisement.offer.price} ₽/ночь`, 'Уточняйте цену');
  fillTextContent(cardType, houseTypes[advertisement.offer.type]);
  fillTextContent(cardDescription, advertisement.offer.description);
  fillTextContent(avatar, advertisement.author.avatar);

  if (advertisement.offer.rooms || advertisement.offer.guests) {
    fillTextContent(cardCapacity, `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`);
  } else if (advertisement.offer.rooms || !advertisement.offer.guests) {
    fillTextContent(cardCapacity, `${advertisement.offer.rooms} комнаты`);
  } else if (!advertisement.offer.rooms || advertisement.offer.guests) {
    fillTextContent(cardCapacity, `${advertisement.offer.guests} гостей`);
  } else {
    cardCapacity.remove();
  }

  if (advertisement.offer.checkin || advertisement.offer.checkout) {
    fillTextContent(cardTime, `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`);
  } else if (advertisement.offer.checkin || !advertisement.offer.checkout) {
    fillTextContent(cardTime, `Заезд после ${advertisement.offer.checkin}`);
  } else if (!advertisement.offer.checkin || advertisement.offer.checkout) {
    fillTextContent(cardTime, `Выезд до ${advertisement.offer.checkout}`);
  } else {
    cardTime.remove();
  }

  if (cardFeatures.length !== 0) {
    for (const cardFeature of cardFeatures) {
      const isNecessary = advertisement.offer.features.some(
        (advertisementFeature) => cardFeature.classList.contains(`popup__feature--${advertisementFeature}`),
      );

      if (!isNecessary) {
        cardFeature.remove();
      }
    }
  } else {
    cardFeaturesList.remove();
  }

  cleanPhotoContainer(cardPhotos);

  if (advertisement.offer.photos.length !== 0) {
    for (const photoUrl of advertisement.offer.photos) {
      const cardPhotoElement = cardPhotoTemplate.cloneNode(true);
      cardPhotoElement.src = photoUrl;
      cardPhotos.appendChild(cardPhotoElement);
    }
  }

  return card;
};

const createCards = () => {
  const map = document.querySelector('#map-canvas');
  const similarAdvertisements = createAdvertisements();
  const fragment = document.createDocumentFragment();

  for (const advertisement of similarAdvertisements) {
    fragment.appendChild(createCard(advertisement));
  }

  map.appendChild(fragment);
};

export { createCards };
