const imageModal = document.createElement('div');
imageModal.className = 'image-modal';
imageModal.innerHTML = `
  <button class="image-modal-close" type="button" aria-label="Close image">&times;</button>
  <button class="image-modal-arrow prev" type="button" aria-label="Show previous expanded image">‹</button>
  <img src="" alt="">
  <button class="image-modal-arrow next" type="button" aria-label="Show next expanded image">›</button>
`;
document.body.appendChild(imageModal);

const modalImage = imageModal.querySelector('img');
const closeModalButton = imageModal.querySelector('.image-modal-close');
const previousModalButton = imageModal.querySelector('.image-modal-arrow.prev');
const nextModalButton = imageModal.querySelector('.image-modal-arrow.next');
let modalImages = [];
let modalActiveIndex = 0;

const closeImageModal = () => {
  imageModal.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';
  modalImages = [];
  modalActiveIndex = 0;
};

const showModalImage = (nextIndex) => {
  if (!modalImages.length) return;

  modalActiveIndex = (nextIndex + modalImages.length) % modalImages.length;
  const image = modalImages[modalActiveIndex];
  modalImage.src = image.src;
  modalImage.alt = image.alt || 'Expanded project image';
};

const openImageModal = (images, activeIndex) => {
  modalImages = images;
  showModalImage(activeIndex);
  imageModal.classList.add('is-open');
};

closeModalButton.addEventListener('click', closeImageModal);
previousModalButton.addEventListener('click', () => showModalImage(modalActiveIndex - 1));
nextModalButton.addEventListener('click', () => showModalImage(modalActiveIndex + 1));
imageModal.addEventListener('click', (event) => {
  if (event.target === imageModal) closeImageModal();
});
document.addEventListener('keydown', (event) => {
  if (!imageModal.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeImageModal();
  if (event.key === 'ArrowLeft') showModalImage(modalActiveIndex - 1);
  if (event.key === 'ArrowRight') showModalImage(modalActiveIndex + 1);
});

document.querySelectorAll('.project-gallery').forEach((gallery) => {
  const images = Array.from(gallery.querySelectorAll('img'));
  if (!images.length) return;

  let activeIndex = 0;
  images[0].classList.add('is-active');

  const showImage = (nextIndex) => {
    images[activeIndex].classList.remove('is-active');
    activeIndex = (nextIndex + images.length) % images.length;
    images[activeIndex].classList.add('is-active');
  };

  const expandButton = document.createElement('button');
  expandButton.className = 'gallery-expand';
  expandButton.type = 'button';
  expandButton.setAttribute('aria-label', 'Expand project image');
  expandButton.textContent = '⛶';
  expandButton.addEventListener('click', () => openImageModal(images, activeIndex));

  if (images.length < 2) {
    gallery.append(expandButton);
    return;
  }

  const playButton = document.createElement('button');
  playButton.className = 'gallery-play';
  playButton.type = 'button';
  playButton.setAttribute('aria-label', 'Show next project image');

  playButton.addEventListener('click', () => showImage(activeIndex + 1));

  gallery.append(playButton, expandButton);
});
