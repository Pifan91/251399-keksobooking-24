import { sendData } from './api.js';
import { showMessage } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const DEFAULT_LAT = 35.68172;
const DEFAULT_LNG = 139.75392;
const DEFAULT_PRICE = 1000;
const DEFAULT_PICTURE = 'img/muffin-grey.svg';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const mapFiltersElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');
const avatarUploadElement = adFormElement.querySelector('[name="avatar"]');
const avatarPreviewElement = adFormElement.querySelector('.ad-form-header__preview img');
const titleElement = adFormElement.querySelector('[name="title"]');
const addressElement = adFormElement.querySelector('[name="address"]');
const typeElement = adFormElement.querySelector('[name="type"]');
const priceElement = adFormElement.querySelector('[name="price"]');
const timeInElement = adFormElement.querySelector('[name="timein"]');
const timeOutElement = adFormElement.querySelector('[name="timeout"]');
const roomsElement = adFormElement.querySelector('[name="rooms"]');
const guestsElement = adFormElement.querySelector('[name="capacity"]');
const imagesUploadElement = adFormElement.querySelector('[name="images"]');
const imagesPreviewElement = adFormElement.querySelector('.ad-form__photo img');
const priceByType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const setCoordinates = (lat, lng) => {
  addressElement.value = `${lat}, ${lng}`;
};

const setMinPrice = (type) => {
  priceElement.min = priceByType[type.value];
  priceElement.placeholder = priceByType[type.value];
};

const setDefaultPrice = () => {
  priceElement.min = DEFAULT_PRICE;
  priceElement.placeholder = DEFAULT_PRICE;
};

const setDefaultPictures = () => {
  avatarPreviewElement.src = DEFAULT_PICTURE;
  imagesPreviewElement.src = DEFAULT_PICTURE;
};

const timeSync = (evt) => {
  timeInElement.value = evt.target.value;
  timeOutElement.value = evt.target.value;
};

const checkPrice = () => {
  if (Number(priceElement.value) < Number(priceElement.min)) {
    priceElement.setCustomValidity(`Минимальная цена ${priceElement.min}`);
  } else if (Number(priceElement.value) > Number(priceElement.max)) {
    priceElement.setCustomValidity(`Максимальная цена ${priceElement.max}`);
  } else {
    priceElement.setCustomValidity('');
  }

  priceElement.reportValidity();
};

const checkRoomsAndGuests = () => {
  if (Number(roomsElement.value) === 1 && Number(guestsElement.value) === 1) {
    guestsElement.setCustomValidity('');
  } else if (Number(roomsElement.value) === 1) {
    guestsElement.setCustomValidity('1 комната для 1 гостя');
  }

  if (Number(roomsElement.value) === 2 && (Number(guestsElement.value) === 1 || Number(guestsElement.value) === 2)) {
    guestsElement.setCustomValidity('');
  } else if (Number(roomsElement.value) === 2) {
    guestsElement.setCustomValidity('2 комнаты для 1-2 гостей');
  }

  if (Number(roomsElement.value) === 3 && (Number(guestsElement.value) === 1 || Number(guestsElement.value) === 2 || Number(guestsElement.value) === 3)) {
    guestsElement.setCustomValidity('');
  } else if (Number(roomsElement.value) === 3) {
    guestsElement.setCustomValidity('3 комнаты для 1-3 гостей');
  }

  if (Number(roomsElement.value) === 100 && Number(guestsElement.value) === 0) {
    guestsElement.setCustomValidity('');
  } else if (Number(roomsElement.value) === 100) {
    guestsElement.setCustomValidity('100 комнат не для гостей');
  }

  roomsElement.reportValidity();
  guestsElement.reportValidity();
};

const toggleElements = (elements) => {
  elements.forEach((element) => {
    (element.disabled) ? element.disabled = false : element.disabled = true;
  });
};

const toggleForm = (form) => {
  const fieldsetsElement = form.querySelectorAll('fieldset');
  const selectsElement = form.querySelectorAll('select');
  const inputsElement = form.querySelectorAll('input');

  (form.classList.contains(`${form.classList[0]}--disabled`)) ? form.classList.remove(`${form.classList[0]}--disabled`) : form.classList.add(`${form.classList[0]}--disabled`);
  toggleElements(fieldsetsElement);
  toggleElements(selectsElement);
  toggleElements(inputsElement);
};

const deactivatePage = () => {
  toggleForm(adFormElement);
  toggleForm(mapFiltersElement);
};

const activatePage = () => {
  toggleForm(adFormElement);
  toggleForm(mapFiltersElement);
  setCoordinates(DEFAULT_LAT, DEFAULT_LNG);
  setMinPrice(typeElement);
  checkRoomsAndGuests();
};

avatarUploadElement.addEventListener('change', () => {
  const file = avatarUploadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

imagesUploadElement.addEventListener('change', () => {
  const file = imagesUploadElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagesPreviewElement.src = URL.createObjectURL(file);
  }
});

titleElement.addEventListener('input', () => {
  const valueLength = titleElement.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleElement.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleElement.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleElement.setCustomValidity('');
  }

  titleElement.reportValidity();
});

typeElement.addEventListener('input', () => {
  setMinPrice(typeElement);
  checkPrice();
});

priceElement.addEventListener('input', () => {
  checkPrice();
});

timeInElement.addEventListener('input', (evt) => {
  timeSync(evt);
});

timeOutElement.addEventListener('input', (evt) => {
  timeSync(evt);
});

roomsElement.addEventListener('input', () => {
  checkRoomsAndGuests();
});

guestsElement.addEventListener('input', () => {
  checkRoomsAndGuests();
});

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => showMessage('success'),
    () => showMessage('error'),
    new FormData(evt.target),
  );
});

adFormElement.addEventListener('reset', () => {
  setDefaultPrice();
  setDefaultPictures();
});

export { deactivatePage, activatePage, setCoordinates, adFormElement };
