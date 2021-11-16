import { activatePage, deactivatePage, setCoordinates, adFormElement } from './form.js';
import { createCard } from './card.js';

const DEFAULT_LAT = 35.68172;
const DEFAULT_LNG = 139.75392;

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', () => {
  const lat = mainPinMarker.getLatLng().lat.toFixed(5);
  const lng = mainPinMarker.getLatLng().lng.toFixed(5);
  setCoordinates(lat, lng);
});

let markerGroup;

const renderPoints = (points) => {
  markerGroup = L.layerGroup();
  points.forEach((point) => {
    const lat = point.location.lat;
    const lng = point.location.lng;

    const pointIcon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pointIcon,
      },
    );
    markerGroup.addLayer(marker);
    marker.bindPopup(createCard(point));
  });
  markerGroup.addTo(map);
};

const mapToDefault = () => {
  map.closePopup();

  mainPinMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });

  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, 13);
};

const clearMap = () => {
  map.removeLayer(markerGroup);
};

window.addEventListener('load', () => {
  deactivatePage();
});

adFormElement.addEventListener('reset', () => {
  mapToDefault();
});

export { renderPoints, clearMap };
