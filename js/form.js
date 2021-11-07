import { sendData } from './api.js';
import { showMessage } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const DEFAULT_LAT = 35.68172;
const DEFAULT_LNG = 139.75392;
const DEFAULT_PRICE = 1000;
const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const adFormTitle = adForm.querySelector('[name="title"]');
const adFormAddress = adForm.querySelector('[name="address"]');
const adFormType = adForm.querySelector('[name="type"]');
const adFormPrice = adForm.querySelector('[name="price"]');
const adFormTimeIn = adForm.querySelector('[name="timein"]');
const adFormTimeOut = adForm.querySelector('[name="timeout"]');
const adFormRooms = adForm.querySelector('[name="rooms"]');
const adFormGuests = adForm.querySelector('[name="capacity"]');
const priceByType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const setCoordinates = (lat, lng) => {
  adFormAddress.value = `${lat}, ${lng}`;
};

const setMinPrice = (type) => {
  adFormPrice.min = priceByType[type.value];
  adFormPrice.placeholder = priceByType[type.value];
};

const setDefaultPrice = () => {
  adFormPrice.min = DEFAULT_PRICE;
  adFormPrice.placeholder = DEFAULT_PRICE;
};

const timeSync = (evt) => {
  adFormTimeIn.value = evt.target.value;
  adFormTimeOut.value = evt.target.value;
};

const checkPrice = () => {
  if (Number(adFormPrice.value) < Number(adFormPrice.min)) {
    adFormPrice.setCustomValidity(`Минимальная цена ${adFormPrice.min}`);
  } else if (Number(adFormPrice.value) > Number(adFormPrice.max)) {
    adFormPrice.setCustomValidity(`Максимальная цена ${adFormPrice.max}`);
  } else {
    adFormPrice.setCustomValidity('');
  }

  adFormPrice.reportValidity();
};

const checkRoomsAndGuests = () => {

  if (Number(adFormRooms.value) === 1 && Number(adFormGuests.value) === 1) {
    adFormGuests.setCustomValidity('');
  } else if (Number(adFormRooms.value) === 1) {
    adFormGuests.setCustomValidity('1 комната для 1 гостя');
  }

  if (Number(adFormRooms.value) === 2 && (Number(adFormGuests.value) === 1 || Number(adFormGuests.value) === 2)) {
    adFormGuests.setCustomValidity('');
  } else if (Number(adFormRooms.value) === 2) {
    adFormGuests.setCustomValidity('2 комнаты для 1-2 гостей');
  }

  if (Number(adFormRooms.value) === 3 && (Number(adFormGuests.value) === 1 || Number(adFormGuests.value) === 2 || Number(adFormGuests.value) === 3)) {
    adFormGuests.setCustomValidity('');
  } else if (Number(adFormRooms.value) === 3) {
    adFormGuests.setCustomValidity('3 комнаты для 1-3 гостей');
  }

  if (Number(adFormRooms.value) === 100 && Number(adFormGuests.value) === 0) {
    adFormGuests.setCustomValidity('');
  } else if (Number(adFormRooms.value) === 100) {
    adFormGuests.setCustomValidity('100 комнат не для гостей');
  }

  adFormRooms.reportValidity();
  adFormGuests.reportValidity();
};

adFormTitle.addEventListener('input', () => {
  const valueLength = adFormTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adFormTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adFormTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    adFormTitle.setCustomValidity('');
  }

  adFormTitle.reportValidity();
});

adFormType.addEventListener('input', () => {
  setMinPrice(adFormType);
  checkPrice();
});

adFormPrice.addEventListener('input', () => {
  checkPrice();
});

adFormTimeIn.addEventListener('input', (evt) => {
  timeSync(evt);
});

adFormTimeOut.addEventListener('input', (evt) => {
  timeSync(evt);
});

adFormRooms.addEventListener('input', () => {
  checkRoomsAndGuests();
});

adFormGuests.addEventListener('input', () => {
  checkRoomsAndGuests();
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => showMessage('success'),
    () => showMessage('error'),
    new FormData(evt.target),
  );
});

adForm.addEventListener('reset', () => {
  setDefaultPrice();
});

const toggleElements = (elements) => {
  elements.forEach((element) => {
    (element.disabled) ? element.disabled = false : element.disabled = true;
  });
};

const toggleForm = (form) => {
  const formFieldsets = form.querySelectorAll('fieldset');
  const formSelects = form.querySelectorAll('select');
  const formInputs = form.querySelectorAll('input');

  (form.classList.contains(`${form.classList[0]}--disabled`)) ? form.classList.remove(`${form.classList[0]}--disabled`) : form.classList.add(`${form.classList[0]}--disabled`);
  toggleElements(formFieldsets);
  toggleElements(formSelects);
  toggleElements(formInputs);
};

const deactivatePage = () => {
  toggleForm(adForm);
  toggleForm(mapFilters);
};

const activatePage = () => {
  toggleForm(adForm);
  toggleForm(mapFilters);
  setCoordinates(DEFAULT_LAT, DEFAULT_LNG);
  setMinPrice(adFormType);
  checkRoomsAndGuests();
};

export { deactivatePage, activatePage, setCoordinates, adForm };
