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

export { getRandomInt, getNumberFromRange, getRandomElementInArray, getRandomArray };
