import { createCards } from './card.js';
import { toggleForm } from './form.js';

const mapFilters = document.querySelector('.map__filters');

createCards();

//toggleForm(adForm);
toggleForm(mapFilters);
