import { createAdvertisements } from './data.js';

const similarAdvertisements = createAdvertisements();
const map = document.querySelector('#map-canvas');
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const fragment = document.createDocumentFragment();
const houseTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCard = () => {
  for (const advertisement of similarAdvertisements) {
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
    let cardPhotoTemplate;
    const avatar = card.querySelector('.popup__avatar');


    (advertisement.offer.title) ? cardTitle.textContent = advertisement.offer.title: 'Объявление';
    (advertisement.offer.address) ? cardAddress.textContent = advertisement.offer.address: cardAddress.remove();
    (advertisement.offer.price) ? cardPrice.textContent = `${advertisement.offer.price} ₽/ночь`: 'Уточняйте цену';
    (advertisement.offer.type) ? cardType.textContent = houseTypes[advertisement.offer.type]: cardType.remove();

    if (advertisement.offer.rooms || advertisement.offer.guests) {
      cardCapacity.textContent = (advertisement.offer.rooms) ? `${advertisement.offer.rooms} комнаты для `: '';
      cardCapacity.textContent += (advertisement.offer.guests) ? `${advertisement.offer.guests} гостей`: '';
    } else {
      cardCapacity.remove();
    }

    if (advertisement.offer.rooms || advertisement.offer.guests) {
      cardTime.textContent = (advertisement.offer.checkin) ? `Заезд после ${advertisement.offer.checkin}`: '';
      cardTime.textContent += (advertisement.offer.checkout) ? `, выезд до ${advertisement.offer.checkout}`: '';
      if (!advertisement.offer.checkin && advertisement.offer.checkout) {
        cardTime.textContent = `Выезд до ${advertisement.offer.checkout}`;
      }
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

    (advertisement.offer.description) ? cardDescription.textContent = advertisement.offer.description : cardDescription.remove();

    cardPhotoItems.forEach((cardPhoto) => {
      cardPhotoTemplate = cardPhoto;
      cardPhoto.remove();
    });

    if (advertisement.offer.photos.length !== 0) {
      for (const photoUrl of advertisement.offer.photos) {
        const cardPhotoElement = cardPhotoTemplate.cloneNode(true);
        cardPhotoElement.src = photoUrl;
        cardPhotos.appendChild(cardPhotoElement);
      }
    }

    (advertisement.author.avatar) ? avatar.src = advertisement.author.avatar: avatar.remove();

    fragment.appendChild(card);
  }
  map.appendChild(fragment);
};

export { createCard };
