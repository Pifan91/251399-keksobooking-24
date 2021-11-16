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
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);
  const titleElement = cardElement.querySelector('.popup__title');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const typeElement = cardElement.querySelector('.popup__type');
  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  const timeElement = cardElement.querySelector('.popup__text--time');
  const featuresListElement = cardElement.querySelector('.popup__features');
  const featuresElement = cardElement.querySelectorAll('.popup__feature');
  const descriptionElement = cardElement.querySelector('.popup__description');
  const photosElement = cardElement.querySelector('.popup__photos');
  const photoItemsElement = photosElement.querySelectorAll('.popup__photo');
  const photoTemplate = photoItemsElement[0];
  const avatarElement = cardElement.querySelector('.popup__avatar');
  const houseTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  fillData(titleElement, advertisement.offer.title, 'Объявление');
  fillData(addressElement, advertisement.offer.address);
  fillData(priceElement, `${advertisement.offer.price} ₽/ночь`, 'Уточняйте цену');
  fillData(typeElement, houseTypes[advertisement.offer.type]);
  fillData(descriptionElement, advertisement.offer.description);
  fillData(avatarElement, advertisement.author.avatar);

  if (advertisement.offer.rooms || advertisement.offer.guests) {
    fillData(capacityElement, `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`);
  } else if (advertisement.offer.rooms || !advertisement.offer.guests) {
    fillData(capacityElement, `${advertisement.offer.rooms} комнаты`);
  } else if (!advertisement.offer.rooms || advertisement.offer.guests) {
    fillData(capacityElement, `${advertisement.offer.guests} гостей`);
  } else {
    capacityElement.remove();
  }

  if (advertisement.offer.checkin || advertisement.offer.checkout) {
    fillData(timeElement, `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`);
  } else if (advertisement.offer.checkin || !advertisement.offer.checkout) {
    fillData(timeElement, `Заезд после ${advertisement.offer.checkin}`);
  } else if (!advertisement.offer.checkin || advertisement.offer.checkout) {
    fillData(timeElement, `Выезд до ${advertisement.offer.checkout}`);
  } else {
    timeElement.remove();
  }

  if (advertisement.offer.features) {
    for (const cardFeature of featuresElement) {
      const isNecessary = advertisement.offer.features.some(
        (advertisementFeature) => cardFeature.classList.contains(`popup__feature--${advertisementFeature}`),
      );

      if (!isNecessary) {
        cardFeature.remove();
      }
    }
  } else {
    featuresListElement.remove();
  }

  cleanPhotoContainer(photosElement);

  if (advertisement.offer.photos) {
    for (const photoUrl of advertisement.offer.photos) {
      const cardPhotoElement = photoTemplate.cloneNode(true);
      cardPhotoElement.src = photoUrl;
      photosElement.appendChild(cardPhotoElement);
    }
  }

  return cardElement;
};

export { createCard };
