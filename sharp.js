const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = target;  // Ubah ke target agar tetap di src/public

fs.readdirSync(target).forEach(image => {
  // Mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(path.resolve(
      destination,
      `${image.split('.').slice(0, -1).join('.')}-large.jpg`
    ));

  // Mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(path.resolve(
      destination,
      `${image.split('.').slice(0, -1).join('.')}-small.jpg`
    ));
});