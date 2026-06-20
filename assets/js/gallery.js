/**
 * gallery.js — Gallery DESIGN2
 */
export const GALLERY_ITEMS = [
  { src: 'assets/img/weding1.jpg',                                       cls: 'h-tall'   },
  { src: 'assets/img/pexels-rebeca-medeiros-333886492-16236027.jpg',     cls: 'h-normal' },
  { src: 'assets/img/pexels-ekoagalarov-28745499.jpg',                   cls: 'h-wide'   },
  { src: 'assets/img/pexels-bulat843-1243575272-34079489.jpg',           cls: 'h-tall'   },
  { src: 'assets/img/pexels-esma-nur-buyukguclu-112544374-35241391.jpg', cls: 'h-normal' },
  { src: 'assets/img/pexels-paula-rodriguez-2161068380-37194849.jpg',    cls: 'h-wide'   },
];

let currentIndex = 0;

export function initGallery() {
  renderGallery();
  initLightbox();
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  GALLERY_ITEMS.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.setAttribute('data-reveal', 'fade-up');
    el.setAttribute('data-reveal-delay', String((i % 4) * 80));
    el.innerHTML = `
      <div class="gallery-thumb ${item.cls}" style="position:relative;">
        <img src="${item.src}" alt="Galeri foto ${i + 1}" loading="lazy"
             style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="gallery-overlay"><i class="fas fa-expand"></i></div>
    `;
    el.addEventListener('click', () => openLightbox(i));
    grid.appendChild(el);
  });
}

function initLightbox() {
  const lb    = document.getElementById('lightbox');
  const close = document.getElementById('lb-close');
  const prev  = document.getElementById('lb-prev');
  const next  = document.getElementById('lb-next');
  if (!lb) return;

  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  if (close) close.addEventListener('click', closeLightbox);
  if (prev)  prev.addEventListener('click',  () => navigate(-1));
  if (next)  next.addEventListener('click',  () => navigate(1));

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

function openLightbox(index) {
  currentIndex = index;
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  if (!lb || !img) return;
  img.style.background = '#111';
  img.innerHTML = `<img src="${GALLERY_ITEMS[index].src}" alt="Foto ${index + 1}"
    style="width:100%;height:100%;object-fit:contain;border-radius:18px;display:block;">`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  currentIndex = (currentIndex + dir + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  const img = document.getElementById('lb-img');
  if (!img) return;
  img.style.background = '#111';
  img.innerHTML = `<img src="${GALLERY_ITEMS[currentIndex].src}" alt="Foto ${currentIndex + 1}"
    style="width:100%;height:100%;object-fit:contain;border-radius:18px;display:block;">`;
}
