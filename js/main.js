function getRandomInt(min, max, decimal) {
  return (Math.random() * (max - min) + min).toFixed(decimal);
}

function getNumberFromRange(minNumber, maxNumber, decimalPlaces) {
  if (minNumber < 0 || maxNumber < 0) {
    return;
  }

  if (minNumber > maxNumber) {
    const tempNumber = maxNumber;
    maxNumber = minNumber;
    minNumber = tempNumber;
  }

  if (!decimalPlaces) {
    decimalPlaces = 0;
  }

  return getRandomInt(minNumber, maxNumber, decimalPlaces);
}

getNumberFromRange(50, 40);
getNumberFromRange(9, 3, 4);
