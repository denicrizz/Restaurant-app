/* eslint-disable linebreak-style */
import { saveFavoriteRestaurant, removeFavoriteRestaurant, isFavoriteRestaurant } from './idbConfig';
// eslint-disable-next-line linebreak-style

const API_ENDPOINT = 'https://restaurant-api.dicoding.dev/detail/';

async function displayFavoriteButton(id) {
  const isFavorite = await isFavoriteRestaurant(id);
  const favoriteButton = document.getElementById('favorite-button');

  if (!favoriteButton) {
    console.error("Element with id 'favorite-button' not found.");
    return;
  }

  if (isFavorite) {
    favoriteButton.textContent = 'Hapus dari Favorit';
    favoriteButton.classList.add('favorite-remove');
    favoriteButton.classList.remove('favorite-add');
  } else {
    favoriteButton.textContent = 'Tambahkan ke Favorit';
    favoriteButton.classList.remove('favorite-remove');
    favoriteButton.classList.add('favorite-add');
  }

  favoriteButton.onclick = async () => {
    if (isFavorite) {
      await removeFavoriteRestaurant(id);
    } else {
      // eslint-disable-next-line no-use-before-define
      const restaurant = await fetchRestaurantDetail(id);
      await saveFavoriteRestaurant(restaurant);
    }
    await displayFavoriteButton(id); // Refresh button state
  };
}

// Fungsi untuk mengambil detail restoran dari API
async function fetchRestaurantDetail(id) {
  try {
    const response = await fetch(`${API_ENDPOINT}${id}`);
    const data = await response.json();
    return data.restaurant;
  } catch (error) {
    console.error('Error fetching restaurant detail:', error);
    return null;
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function displayRestaurantDetail() {
  const main = document.getElementById('content-main');
  const id = window.location.hash.split('=')[1];
  const restaurant = await fetchRestaurantDetail(id);

  if (!restaurant) {
    main.innerHTML = '<p>Restaurant not found</p>';
    return;
  }

  main.innerHTML = `
  <div class="container-detail">
    <div class="restaurant-detail">
      <h2 tabindex="0">${restaurant.name}</h2>
      <img tabindex="0" src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}" />
      <p tabindex="0"><strong>Alamat:</strong> ${restaurant.address}</p>
      <p tabindex="0"><strong>Kota:</strong> ${restaurant.city}</p>
      <p tabindex="0">${restaurant.description}</p>
      <h3 tabindex="0">Menu Makanan</h3>
      <ul>${restaurant.menus.foods.map((food) => `<li tabindex="0">${food.name}</li>`).join('')}</ul>
      <h3 tabindex="0">Menu Minuman</h3>
      <ul>${restaurant.menus.drinks.map((drink) => `<li tabindex="0">${drink.name}</li>`).join('')}</ul>
      <h3 tabindex="0">Customer Reviews</h3>
      <ul>${restaurant.customerReviews.map((review) => `
          <p tabindex="0"><strong>${review.name}</strong></p>
          <p tabindex="0">${review.review}</p>
          <p tabindex="0"><em>${review.date}</em></p>`).join('')}
      </ul>
      <button id="favorite-button" class="button-favorite"></button>
    </div>
  </div>
  `;

  await new Promise((resolve) => { setTimeout(resolve, 0); });

  await displayFavoriteButton(id);
}
