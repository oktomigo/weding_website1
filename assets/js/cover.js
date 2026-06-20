/**
 * cover.js — Cover screen DESIGN2
 */
export function initCover() {
  const cover   = document.getElementById('cover-screen');
  const mainCnt = document.getElementById('main-content');
  const openBtn = document.getElementById('btn-open');
  const bgMusic = document.getElementById('bg-music');

  if (!cover || !openBtn || !mainCnt) return;

  openBtn.addEventListener('click', () => {
    cover.classList.add('hide');

    if (bgMusic) {
      bgMusic.volume = 0.1;
      bgMusic.play().catch(() => {});
    }

    setTimeout(() => {
      cover.style.display   = 'none';
      mainCnt.style.display = 'block';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          mainCnt.classList.add('visible');
          if (window.ScrollTrigger) ScrollTrigger.refresh();
          window.dispatchEvent(new CustomEvent('hero:enter'));
        });
      });
    }, 1300);
  });
}
