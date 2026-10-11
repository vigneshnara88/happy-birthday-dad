'use strict';

const photos = [
  ['350', 'Dad and his son smiling at home in matching pink shirts', 'My forever role model ♡'],
  ['351', 'Dad in sunglasses, standing with his son at home', 'The coolest Dad, always.'],
  ['352', 'A winter selfie of Dad and his son in the snow', 'Cold days, warm memories.'],
  ['353', 'Dad, his daughter and Mum together behind a birthday cake', 'Another reason to celebrate.'],
  ['354', 'A treasured old photograph of Mum and Dad', 'Where our story began.'],
  ['355', 'Dad wearing a backwards white cap', 'Effortlessly you.'],
  ['356', 'An old photograph of Dad holding his child', 'You & me, always.'],
  ['357', 'The whole family smiling together at home', 'Our favourite place: together.'],
  ['358', 'Mum and Dad standing together behind a birthday cake', 'A little cake. A lot of love.'],
  ['359', 'Dad and his son on a wooden jetty by the water', 'The adventures together.'],
  ['360', 'Dad and his daughter resting shoulder to shoulder on a train', 'A shoulder to lean on.'],
  ['361', 'Dad and his children sharing breakfast at a café', 'The little moments are the big ones.'],
  ['362', 'A family selfie outside a temple', 'Another memory with you.'],
  ['363', 'Mum and Dad smiling in a cable car surrounded by snow', 'Seeing the world, together.'],
  ['364', 'Dad and his children standing together in front of a brick wall', 'Adventures with our favourite person.'],
  ['365', 'Mum and Dad smiling over dessert', 'Here’s to many more of these.']
].map(([file, alt, caption]) => ({ src: `6226655226115068${file}.jpg`, alt, caption }));

const dialog = document.querySelector('#photo-dialog');
const albumImage = document.querySelector('#album-image');
const albumCaption = document.querySelector('#album-caption');
const albumCounter = document.querySelector('#album-counter');
const thumbnails = document.querySelector('#album-thumbnails');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentPhoto = 0;
let albumOpener;

photos.forEach((photo, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Photo ${index + 1}: ${photo.caption}`);
  const img = document.createElement('img');
  img.src = photo.src;
  img.alt = '';
  img.width = 52;
  img.height = 58;
  img.loading = 'lazy';
  button.append(img);
  button.addEventListener('click', () => showPhoto(index));
  thumbnails.append(button);
});

function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const photo = photos[currentPhoto];
  albumImage.src = photo.src;
  albumImage.alt = photo.alt;
  albumCaption.textContent = photo.caption;
  albumCounter.textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${photos.length} memories`;
  Array.from(thumbnails.children).forEach((button, i) => button.setAttribute('aria-current', String(i === currentPhoto)));
  const activeThumbnail = thumbnails.children[currentPhoto];
  thumbnails.scrollTo({ left: activeThumbnail.offsetLeft - thumbnails.offsetLeft - thumbnails.clientWidth / 2 + activeThumbnail.clientWidth / 2, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}

function openAlbum(index, opener) {
  albumOpener = opener;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  showPhoto(index);
  dialog.querySelector('.close-dialog').focus();
}

document.querySelectorAll('[data-photo]').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openAlbum(Number(link.dataset.photo), link);
}));
document.querySelector('#open-album').addEventListener('click', event => openAlbum(0, event.currentTarget));
dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.querySelector('.album-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
dialog.querySelector('.album-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  albumOpener?.focus({ preventScroll: true });
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
let touchStartX = 0;
let touchStartY = 0;
albumImage.addEventListener('touchstart', event => {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
}, { passive: true });
albumImage.addEventListener('touchend', event => {
  const dx = event.changedTouches[0].screenX - touchStartX;
  const dy = event.changedTouches[0].screenY - touchStartY;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) showPhoto(currentPhoto + (dx > 0 ? -1 : 1));
}, { passive: true });

const celebrate = document.querySelector('#celebrate');
const confettiLayer = document.querySelector('#confetti-layer');
let confettiTimer;
celebrate.addEventListener('click', () => {
  document.querySelector('#wish-message').textContent = 'Happy Birthday, Dad! Love you so, so much. ♡';
  celebrate.innerHTML = 'A little more birthday magic <span aria-hidden="true">✧</span>';
  clearTimeout(confettiTimer);
  confettiLayer.replaceChildren();
  if (reducedMotion.matches) return;
  const colors = ['#d6b86b', '#e4b3a0', '#93b196', '#f7f3e8', '#ac603f'];
  const pieces = document.createDocumentFragment();
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('i');
    piece.className = 'confetti';
    piece.style.setProperty('--x', `${Math.random() * 100}%`);
    piece.style.setProperty('--color', colors[i % colors.length]);
    piece.style.setProperty('--duration', `${3 + Math.random() * 2}s`);
    piece.style.setProperty('--delay', `${Math.random() * .6}s`);
    piece.style.setProperty('--drift', `${(Math.random() - .5) * 220}px`);
    piece.style.setProperty('--rotation', `${Math.random() * 360}deg`);
    pieces.append(piece);
  }
  confettiLayer.append(pieces);
  confettiTimer = setTimeout(() => confettiLayer.replaceChildren(), 6000);
});
