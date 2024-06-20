import 'regenerator-runtime';
import '../styles/main.css';
import { router } from './router'; // Import router dari router.js
import './register-sw'; // Import file register-sw.js
import { deleteDatabase } from './idbConfig';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  // eslint-disable-next-line no-restricted-globals
  event.preventDefault();
  navLinks.classList.toggle('active');
});

deleteDatabase();

// event listener untuk menu Home
const homeLink = document.querySelector('a[href="#/home"]');
homeLink.addEventListener('click', async (event) => {
  event.preventDefault();
  window.location.hash = '#/home';
  await router();
});

// Panggil fungsi untuk menampilkan daftar restoran saat aplikasi pertama kali dimuat
if (window.location.hash === '' || window.location.hash === '#/') {
  router(); // Panggil router untuk menampilkan halaman home saat aplikasi dimuat
}
