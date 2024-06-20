/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import 'regenerator-runtime';
// eslint-disable-next-line linebreak-style
import '../styles/main.css';
// eslint-disable-next-line linebreak-style
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// eslint-disable-next-line linebreak-style
const API_ENDPOINT = 'https://restaurant-api.dicoding.dev/list';
// eslint-disable-next-line linebreak-style

async function fetchRestaurantData() {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data.restaurants;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function displayRestaurants() {
  const restaurantContainer = document.getElementById('restaurant-list');
  if (!restaurantContainer) {
    console.error("Element with id 'restaurant-list' not found.");
    return;
  }

  restaurantContainer.innerHTML = '';

  try {
    const restaurantList = await fetchRestaurantData();

    restaurantList.forEach((restaurant) => {
      const restaurantItem = document.createElement('div');
      restaurantItem.classList.add('restaurant-item');

      const restaurantImg = document.createElement('img');
      restaurantImg.classList.add('restaurant-img', 'lazyload');
      restaurantImg.setAttribute('data-src', `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`);
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
    console.error('Error displaying restaurants:', error);
  }
}

// Panggil fungsi untuk menampilkan daftar restoran saat aplikasi pertama kali dimuat
if (window.location.hash === '' || window.location.hash === '#/') {
  displayRestaurants();
}
