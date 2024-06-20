/* eslint-disable linebreak-style */
import { openDB } from 'idb';

const DATABASE_NAME = 'restaurant-db';
const OBJECT_STORE_NAME = 'restaurant';

const dbPromise = openDB(DATABASE_NAME, 1, {
  upgrade(database) {
    if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
      database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    }
  },
});

export async function openDatabase() {
  // eslint-disable-next-line no-return-await
  return await dbPromise;
}

export async function saveFavoriteRestaurant(restaurant) {
  const db = await openDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.put(restaurant);
  await tx.done;
}

export async function removeFavoriteRestaurant(id) {
  const db = await openDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  await store.delete(id);
  await tx.done;
}

export async function isFavoriteRestaurant(id) {
  const db = await openDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  const restaurant = await store.get(id);
  await tx.done;
  return restaurant !== undefined;
}

export const deleteDatabase = () => {
  const request = indexedDB.deleteDatabase(DATABASE_NAME);
  request.onsuccess = () => {
    console.log('Database deleted successfully');
  };
  request.onerror = () => {
    console.log('Failed to delete database');
  };
};
