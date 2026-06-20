/**
 * utils.js — Utilities DESIGN2
 */

export function copyToClipboard(text, btnEl) {
  const doSuccess = () => {
    const orig = btnEl.innerHTML;
    btnEl.classList.add('copied');
    btnEl.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
    setTimeout(() => { btnEl.classList.remove('copied'); btnEl.innerHTML = orig; }, 2500);
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(doSuccess).catch(() => fallbackCopy(text, doSuccess));
  } else {
    fallbackCopy(text, doSuccess);
  }
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try { document.execCommand('copy'); cb(); } catch(e) {}
  document.body.removeChild(ta);
}

export function addToCalendar({ title, startUTC, endUTC, location }) {
  const url = [
    'https://www.google.com/calendar/render?action=TEMPLATE',
    `&text=${encodeURIComponent(title)}`,
    `&dates=${startUTC}/${endUTC}`,
    `&location=${encodeURIComponent(location)}`,
    '&sf=true&output=xml'
  ].join('');
  window.open(url, '_blank');
}

export function initScrollTop(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 320);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

export function initMusic(btnId, audioId) {
  const btn   = document.getElementById(btnId);
  const audio = document.getElementById(audioId);
  if (!btn || !audio) return;
  let playing = false;
  btn.addEventListener('click', () => {
    if (playing) { audio.pause(); btn.classList.remove('playing'); }
    else { audio.play().catch(() => {}); btn.classList.add('playing'); }
    playing = !playing;
  });
  audio.addEventListener('play',  () => { playing = true;  btn.classList.add('playing'); });
  audio.addEventListener('pause', () => { playing = false; btn.classList.remove('playing'); });
}

export function initShare(toggleId, optionsId) {
  const toggle  = document.getElementById(toggleId);
  const options = document.getElementById(optionsId);
  if (!toggle || !options) return;
  toggle.addEventListener('click', (e) => { e.stopPropagation(); options.classList.toggle('open'); });
  document.addEventListener('click', () => options.classList.remove('open'));
}

export function spawnPetals(containerId, count = 16) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const petals = ['🌺','🌸','✿','❀','🌼'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className   = 'petal';
    p.textContent = petals[i % petals.length];
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 30}%`,
      `font-size:${14 + Math.random() * 14}px`,
      `animation-duration:${(5 + Math.random() * 9).toFixed(1)}s`,
      `animation-delay:${(Math.random() * 7).toFixed(1)}s`,
    ].join(';');
    wrap.appendChild(p);
  }
}

export function spawnParticles(containerId, count = 22) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'p-dot';
    const size = 3 + Math.random() * 5;
    d.style.cssText = [
      `width:${size}px`, `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `top:${55 + Math.random() * 45}%`,
      `animation-duration:${(7 + Math.random() * 11).toFixed(1)}s`,
      `animation-delay:${(Math.random() * 9).toFixed(1)}s`,
    ].join(';');
    wrap.appendChild(d);
  }
}

export function initVideoEmbed(frameId, thumbId, captionId, youtubeId) {
  const frame   = document.getElementById(frameId);
  const thumb   = document.getElementById(thumbId);
  const caption = document.getElementById(captionId);
  if (!frame || !thumb) return;
  frame.addEventListener('click', () => {
    thumb.innerHTML = `
      <iframe width="100%" height="100%"
        src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0"
        frameborder="0" allow="autoplay;encrypted-media;fullscreen"
        allowfullscreen style="border:none;display:block;"></iframe>`;
    if (caption) caption.style.display = 'none';
  });
}
