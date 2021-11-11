import './map.js';
import { getData } from './api.js';
import { renderFilteringPoints, filteringPoints } from './map-filter.js';


getData((advertisements) => {
  renderFilteringPoints(advertisements);
  filteringPoints(() => renderFilteringPoints(advertisements));
});
