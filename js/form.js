const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const adForm = document.querySelector('.ad-form');
const adFormTitle = adForm.querySelector('[name="title"]');
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

const setMinPrice = (type) => {
  adFormPrice.min = priceByType[type.value];
  adFormPrice.placeholder = priceByType[type.value];
};

const timeSync = (evt) => {
  adFormTimeIn.value = evt.target.value;
  adFormTimeOut.value = evt.target.value;
};

window.addEventListener('load', () => {
  setMinPrice(adFormType);
});

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
});

adFormPrice.addEventListener('input', () => {
  if (Number(adFormPrice.value) < Number(adFormPrice.min)) {
    adFormPrice.setCustomValidity(`Минимальная цена ${adFormPrice.min}`);
  } else if (Number(adFormPrice.value) > Number(adFormPrice.max)) {
    adFormPrice.setCustomValidity(`Максимальная цена ${adFormPrice.max}`);
  } else {
    adFormPrice.setCustomValidity('');
  }

  adFormPrice.reportValidity();
});

adFormTimeIn.addEventListener('input', (evt) => {
  timeSync(evt);
});

adFormTimeOut.addEventListener('input', (evt) => {
  timeSync(evt);
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

  //Сомнительное решение если будет более одного класса у формы.
  form.classList.toggle(`${form.classList.value}--disabled`);
  toggleElements(formFieldsets);
  toggleElements(formSelects);
  toggleElements(formInputs);
};

export { toggleForm };
