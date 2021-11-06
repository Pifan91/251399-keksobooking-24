const getRandomInt = (min, max, decimal) => (Math.random() * (max - min) + min).toFixed(decimal);

const getNumberFromRange = (minNumber, maxNumber, decimalPlaces = 0) => {
  const lower = Math.min(Math.abs(minNumber), Math.abs(maxNumber));
  const upper = Math.max(Math.abs(minNumber), Math.abs(maxNumber));

  return getRandomInt(lower, upper, decimalPlaces);
};

const getRandomElementInArray = (items) => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

const getRandomArray = (items) => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items.slice(randomIndex);
};

const showMessage = (name, error) => {
  const templateFragment = document.querySelector(`#${name}`).content;
  const template = templateFragment.querySelector(`.${name}`);
  const message = template.cloneNode(true);
  const button = message.querySelector(`.${name}__button`);
  if (error) {
    const messageText = message.querySelector(`.${name}__text`);
    messageText.textContent = error;
  }

  if (button) {
    button.addEventListener('click', () => {
      message.remove();
    }, { once: true });
  }

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      message.remove();
    }
  }, { once: true });

  document.body.appendChild(message);
};


export { getRandomInt, getNumberFromRange, getRandomElementInArray, getRandomArray, showMessage };
