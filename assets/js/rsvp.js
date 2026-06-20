/**
 * rsvp.js — RSVP DESIGN2
 */
let selectedStatus = '';

export function initRSVP() {
  const form      = document.getElementById('rsvp-form');
  const success   = document.getElementById('rsvp-success');
  const submitBtn = document.getElementById('btn-rsvp-submit');
  if (!form || !submitBtn) return;

  document.querySelectorAll('.radio-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.radio-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedStatus = opt.dataset.value;
    });
  });

  submitBtn.addEventListener('click', () => {
    const name   = document.getElementById('rsvp-name')?.value.trim();
    const guests = document.getElementById('rsvp-guests')?.value;
    if (!name)   { shakeEl('rsvp-name');        return; }
    if (!guests) { shakeEl('rsvp-guests');       return; }
    if (!selectedStatus) { shakeEl('rsvp-radio-group'); return; }
    form.style.display = 'none';
    if (success) { success.classList.add('show'); burstParticles(); }
  });
}

function shakeEl(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = 'var(--d-red)';
  el.style.animation   = 'shake 0.42s ease';
  setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 600);
}

function burstParticles() {
  const colors = ['#D4A017','#B22222','#2D6A2D','#FDFAF4','#1A1008'];
  for (let i = 0; i < 24; i++) {
    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position: 'fixed', width: '8px', height: '8px',
      borderRadius: '50%', background: colors[i % colors.length],
      top: '50%', left: '50%', pointerEvents: 'none', zIndex: '8000',
      transform: 'translate(-50%,-50%)',
      transition: 'transform 0.8s ease, opacity 0.8s ease',
    });
    document.body.appendChild(dot);
    const angle = (i / 24) * 360;
    const dist  = 80 + Math.random() * 100;
    const x = Math.cos(angle * Math.PI / 180) * dist;
    const y = Math.sin(angle * Math.PI / 180) * dist;
    requestAnimationFrame(() => {
      dot.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      dot.style.opacity   = '0';
    });
    setTimeout(() => dot.remove(), 900);
  }
}
