import { createCard } from './card.js';
import { toggleForm } from './form.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

createCard();

toggleForm(adForm);
toggleForm(mapFilters);
