/* eslint-disable linebreak-style */
import { displayRestaurants } from './home';
import { displayRestaurantDetail } from './detail';
import { displayFavoriteRestaurants } from './favorite';

const routes = {
  '/': displayRestaurants,
  '/home': displayRestaurants,
  '/detail': displayRestaurantDetail,
  '/favorite': displayFavoriteRestaurants,
};

const router = async () => {
  const url = window.location.hash.slice(1).toLowerCase() || '/';
  const request = url.split('/')[1] || '';
  const parsedURL = `/${request.split('?')[0]}`;

  if (routes[parsedURL]) {
    await routes[parsedURL]();
  } else {
    console.error('Route not found:', parsedURL);
  }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// eslint-disable-next-line import/prefer-default-export
export { router };
