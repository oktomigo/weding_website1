/**
 * wishes.js — DESIGN2
 */
const SEED_WISHES = [
  {
    name: 'Rizky Firmansyah',
    time: '1 hari yang lalu',
    msg:  '"Barakallahu laka wa baraka \'alaika wa jama\'a bainakuma fi khair. Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Selamat menempuh hidup baru, Santi dan Agung!"'
  },
  {
    name: 'Nurul Hidayah',
    time: '2 hari yang lalu',
    msg:  '"Selamat ya Santi sayang! Akhirnya hari yang ditunggu-tunggu tiba juga. Semoga rumah tangga kalian penuh berkah, cinta, dan kebahagiaan yang abadi. 🌸"'
  },
  {
    name: 'Ahmad Dhani Putra',
    time: '3 hari yang lalu',
    msg:  '"Bro Agung, selamat ya! Akhirnya menemukan belahan jiwa. Semoga langgeng, saling menjaga, dan selalu dipertemukan dalam kebaikan!"'
  },
];

export function initWishes() {
  renderSeeds();
  bindSubmit();
}

function renderSeeds() {
  const list = document.getElementById('wishes-list');
  if (!list) return;
  SEED_WISHES.forEach((w, i) => list.appendChild(createCard(w, i * 80)));
}

function bindSubmit() {
  const btn = document.getElementById('btn-wish-submit');
  if (!btn) return;
  btn.addEventListener('click', submitWish);
}

function submitWish() {
  const nameEl = document.getElementById('wish-name');
  const msgEl  = document.getElementById('wish-message');
  if (!nameEl || !msgEl) return;
  const name = nameEl.value.trim();
  const msg  = msgEl.value.trim();
  if (!name || !msg) return;
  const list = document.getElementById('wishes-list');
  if (!list) return;

  const card = createCard({ name, time: 'Baru saja', msg: `"${msg}"` }, 0);
  card.style.opacity   = '0';
  card.style.transform = 'translateY(22px)';
  list.insertBefore(card, list.firstChild);
  requestAnimationFrame(() => {
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.opacity    = '1';
    card.style.transform  = 'translateY(0)';
  });
  nameEl.value = '';
  msgEl.value  = '';
}

function createCard({ name, time, msg }, delay) {
  const card = document.createElement('div');
  card.className = 'wish-card';
  card.setAttribute('data-reveal', 'fade-up');
  if (delay) card.setAttribute('data-reveal-delay', String(delay));
  card.innerHTML = `
    <div class="wish-avatar">${name.charAt(0).toUpperCase()}</div>
    <div>
      <p class="wish-name">${escHtml(name)}</p>
      <p class="wish-time"><i class="fas fa-clock"></i> ${escHtml(time)}</p>
      <p class="wish-msg">${escHtml(msg)}</p>
    </div>
  `;
  return card;
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
