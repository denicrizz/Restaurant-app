Feature('Favorite Restaurant');

Scenario('test something',  ({ I }) => {
  //Mengunjungi halaman utama
  I.amOnPage('/');

  //Menunggu daftar restoran muncul
  I.waitForElement('.restaurant-list .restaurant-item', 5);

  //Klik link detail restoran pertama
  I.click('.restaurant-item a.restaurant-detail-a');

  //Menunggu halaman detail restoran muncul
  I.waitForElement('.restaurant-detail', 5);

  //Menunggu tombol favorit muncul dan klik untuk menyukai restoran
  I.waitForElement('#favorite-button', 5);
  I.click('#favorite-button');

  //Tombol berubah menjadi "Hapus dari Favorit"
  I.see('Hapus dari Favorit', '#favorite-button');

  //Klik tombol favorit lagi untuk batal menyukai restoran
  I.click('#favorite-button');

  //Tombol berubah menjadi "Tambahkan ke Favorit"
  I.see('Tambahkan ke Favorit', '#favorite-button');
});
