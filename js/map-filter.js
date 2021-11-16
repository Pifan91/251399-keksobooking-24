import { renderPoints, clearMap } from './map.js';
import { debounce } from './utils/debounce.js';

const MAX_POINTS = 10;
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const ONE_ROOM = 1;
const TWO_ROOMS = 2;
const THREE_ROOMS = 3;
const NOT_FOR_GUESTS = 0;
const ONE_GUEST = 1;
const TWO_GUESTS = 2;
const mapFiltersElement = document.querySelector('.map__filters');
const typeElement = mapFiltersElement.querySelector('#housing-type');
const priceElement = mapFiltersElement.querySelector('#housing-price');
const roomsElement = mapFiltersElement.querySelector('#housing-rooms');
const guestsElement = mapFiltersElement.querySelector('#housing-guests');
const featuresElement = mapFiltersElement.querySelectorAll('[name="features"]');

const filteringPoints = (cb) => {
  mapFiltersElement.addEventListener('input', () => {
    clearMap();
    debounce(cb());
  });
};

const filteringByType = (point) => {
  if (typeElement.value !== 'any') {
    return (point.offer.type === typeElement.value);
  } else {
    return point;
  }
};

const filteringByPrice = (point) => {
  switch (priceElement.value) {
    case 'low':
      return (point.offer.price < MIN_PRICE);
    case 'middle':
      return ((point.offer.price >= MIN_PRICE) && (point.offer.price <= MAX_PRICE));
    case 'high':
      return (point.offer.price > MAX_PRICE);
    default:
      return point;
  }
};

const filteringByRooms = (point) => {
  switch (roomsElement.value) {
    case '1':
      return (point.offer.rooms === ONE_ROOM);
    case '2':
      return (point.offer.rooms === TWO_ROOMS);
    case '3':
      return (point.offer.rooms === THREE_ROOMS);
    default:
      return point;
  }
};

const filteringByGuests = (point) => {
  switch (guestsElement.value) {
    case '0':
      return (point.offer.guests === NOT_FOR_GUESTS);
    case '1':
      return (point.offer.guests === ONE_GUEST);
    case '2':
      return (point.offer.guests === TWO_GUESTS);
    default:
      return point;
  }
};

const filteringByFeatures = (point) => {
  let featuresChecked = 0;
  let featuresInPoint = 0;
  featuresElement.forEach((feature) => {
    if (feature.checked) {
      featuresChecked++;
      if (!!point.offer.features && point.offer.features.includes(feature.value, 0)) {
        featuresInPoint++;
      }
    }
  });

  if (featuresInPoint < featuresChecked) {
    return false;
  } else {
    return point;
  }
};

const renderFilteringPoints = (points) => {
  const filteredPoints = points.slice().filter((point) => filteringByType(point) && filteringByPrice(point) && filteringByRooms(point) && filteringByGuests(point) && filteringByFeatures(point));
  renderPoints(filteredPoints.slice(0, MAX_POINTS));
};

export { renderFilteringPoints, filteringPoints };
