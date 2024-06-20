/* eslint-disable linebreak-style */
import { openDatabase } from './idbConfig';
import 'regenerator-runtime';
import '../styles/main.css';

async function fetchFavoriteRestaurants() {
  const db = await openDatabase();
  const tx = db.transaction('restaurant', 'readonly');
  const store = tx.objectStore('restaurant');
  // eslint-disable-next-line no-return-await
  return await store.getAll();
}

// eslint-disable-next-line import/prefer-default-export
export async function displayFavoriteRestaurants() {
  const main = document.getElementById('content-main');
  const restaurantContainer = document.getElementById('restaurant-list') || document.createElement('div');
  restaurantContainer.id = 'restaurant-list';
  restaurantContainer.classList.add('restaurant-list');
  main.innerHTML = '<section class="container"></section>';
  main.querySelector('.container').appendChild(restaurantContainer);

  restaurantContainer.innerHTML = '';

  try {
    const restaurantList = await fetchFavoriteRestaurants();

    if (restaurantList.length === 0) {
      restaurantContainer.innerHTML = '<p tabindex="0" class="favorite-message">Belum ada yang difavoritkan</p>';
      return;
    }

    restaurantList.forEach((restaurant) => {
      const restaurantItem = document.createElement('div');
      restaurantItem.classList.add('restaurant-item');

      const restaurantImg = document.createElement('img');
      restaurantImg.classList.add('restaurant-img');
      restaurantImg.src = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;
      restaurantImg.alt = restaurant.name;
      restaurantImg.title = restaurant.name;
      restaurantImg.setAttribute('tabindex', '0');

      const restaurantInfo = document.createElement('div');
      restaurantInfo.classList.add('restaurant-info');

      const restaurantName = document.createElement('h2');
      restaurantName.classList.add('restaurant-name');
      restaurantName.textContent = restaurant.name;
      restaurantName.setAttribute('tabindex', '0');

      const restaurantCity = document.createElement('p');
      restaurantCity.classList.add('restaurant-city');
      restaurantCity.textContent = `Kota: ${restaurant.city}`;
      restaurantCity.setAttribute('tabindex', '0');

      const restaurantRating = document.createElement('p');
      restaurantRating.classList.add('restaurant-rating');
      restaurantRating.textContent = `Rating: ${restaurant.rating}`;
      restaurantRating.setAttribute('tabindex', '0');

      const restaurantDescription = document.createElement('p');
      restaurantDescription.classList.add('restaurant-description');
      restaurantDescription.textContent = restaurant.description;
      restaurantDescription.setAttribute('tabindex', '0');

      const restaurantDetailLink = document.createElement('a');
      restaurantDetailLink.classList.add('restaurant-detail-a');
      restaurantDetailLink.textContent = 'Lihat Detail';
      restaurantDetailLink.href = `#/detail?id=${restaurant.id}`;
      restaurantDetailLink.setAttribute('tabindex', '0');

      restaurantInfo.appendChild(restaurantName);
      restaurantInfo.appendChild(restaurantCity);
      restaurantInfo.appendChild(restaurantRating);
      restaurantInfo.appendChild(restaurantDescription);
      restaurantInfo.appendChild(restaurantDetailLink);

      restaurantItem.appendChild(restaurantImg);
      restaurantItem.appendChild(restaurantInfo);

      restaurantContainer.appendChild(restaurantItem);
    });
  } catch (error) {
    console.error('Error displaying favorite restaurants:', error);
    restaurantContainer.innerHTML = '<p>Error loading favorite restaurants.</p>';
  }
}
