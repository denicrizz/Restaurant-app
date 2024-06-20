// Import fungsi atau modul yang akan diuji
import { saveFavoriteRestaurant, removeFavoriteRestaurant, isFavoriteRestaurant } from '../src/scripts/idbConfig';

describe('Favorite Restaurant Functionality', () => {
  // Test case untuk fungsi menyukai restoran
  test('should add restaurant to favorites', async () => {
    // Lakukan simulasi menyimpan restoran ke favorit
    await saveFavoriteRestaurant({ id: '123', name: 'Test Restaurant' });

    // Cek apakah restoran telah berhasil disimpan ke favorit
    const isFavorite = await isFavoriteRestaurant('123');
    expect(isFavorite).toBeTruthy();
  });

  // Test case untuk fungsi batal menyukai restoran
  test('should remove restaurant from favorites', async () => {
    // Simulasikan menyukai restoran terlebih dahulu
    await saveFavoriteRestaurant({ id: '123', name: 'Test Restaurant' });

    // Kemudian lakukan simulasi penghapusan dari favorit
    await removeFavoriteRestaurant('123');

    // Cek apakah restoran telah berhasil dihapus dari favorit
    const isFavorite = await isFavoriteRestaurant('123');
    expect(isFavorite).toBeFalsy();
  });
});
