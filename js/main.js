function getRandomInt(min, max, decimal) {
  return (Math.random() * (max - min) + min).toFixed(decimal);
}

function getNumberFromRange(minNumber, maxNumber, decimalPlaces = 0) {
  const lower = Math.min(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const upper = Math.max(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));

  return getRandomInt(lower, upper, decimalPlaces);
}

getNumberFromRange(50, 40);
getNumberFromRange(9, 3, 4);
