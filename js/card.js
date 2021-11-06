const fillData = (element, option1, option2) => {
  if (/png$|jpg$/.test(option1)) {
    (option1) ? element.src = option1 : option2 || element.remove();
  } else {
    (option1) ? element.textContent = option1 : option2 || element.remove();
  }
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

  fillData(cardTitle, advertisement.offer.title, 'Объявление');
  fillData(cardAddress, advertisement.offer.address);
  fillData(cardPrice, `${advertisement.offer.price} ₽/ночь`, 'Уточняйте цену');
  fillData(cardType, houseTypes[advertisement.offer.type]);
  fillData(cardDescription, advertisement.offer.description);
  fillData(avatar, advertisement.author.avatar);

  if (advertisement.offer.rooms || advertisement.offer.guests) {
    fillData(cardCapacity, `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`);
  } else if (advertisement.offer.rooms || !advertisement.offer.guests) {
    fillData(cardCapacity, `${advertisement.offer.rooms} комнаты`);
  } else if (!advertisement.offer.rooms || advertisement.offer.guests) {
    fillData(cardCapacity, `${advertisement.offer.guests} гостей`);
  } else {
    cardCapacity.remove();
  }

  if (advertisement.offer.checkin || advertisement.offer.checkout) {
    fillData(cardTime, `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`);
  } else if (advertisement.offer.checkin || !advertisement.offer.checkout) {
    fillData(cardTime, `Заезд после ${advertisement.offer.checkin}`);
  } else if (!advertisement.offer.checkin || advertisement.offer.checkout) {
    fillData(cardTime, `Выезд до ${advertisement.offer.checkout}`);
  } else {
    cardTime.remove();
  }

  if (advertisement.offer.features) {
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

  if (advertisement.offer.photos) {
    for (const photoUrl of advertisement.offer.photos) {
      const cardPhotoElement = cardPhotoTemplate.cloneNode(true);
      cardPhotoElement.src = photoUrl;
      cardPhotos.appendChild(cardPhotoElement);
    }
  }

  return card;
};

export { createCard };
