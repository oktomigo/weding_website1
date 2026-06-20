/**
 * countdown.js — DESIGN2
 *
 * ── CARA GANTI TANGGAL ACARA ──────────────────────────────
 *  Ubah WEDDING_DATE di bawah ini.
 *  Format: 'YYYY-MM-DDTHH:MM:SS+08:00'  (WITA = UTC+8)
 * ──────────────────────────────────────────────────────────
 */

export const WEDDING_DATE = new Date('2026-09-28T08:00:00+08:00').getTime();

let _interval = null;

export function initCountdown() {
  if (_interval) { clearInterval(_interval); _interval = null; }
  tick();
  _interval = setInterval(tick, 1000);
}

function tick() {
  const diff = WEDDING_DATE - Date.now();
  let days, hours, minutes, seconds;

  if (diff <= 0) {
    days = hours = minutes = seconds = 0;
    const marriedEl = document.getElementById('cd-married');
    const grid      = document.getElementById('cd-grid');
    if (marriedEl) marriedEl.style.display = 'block';
    if (grid)      grid.style.display      = 'none';
  } else {
    days    = Math.floor(diff / 86_400_000);
    hours   = Math.floor((diff % 86_400_000) / 3_600_000);
    minutes = Math.floor((diff % 3_600_000)  /    60_000);
    seconds = Math.floor((diff %    60_000)  /     1_000);
  }

  setNum('cd-days',    days);
  setNum('cd-hours',   hours);
  setNum('cd-minutes', minutes);
  setNum('cd-seconds', seconds);
}

function setNum(id, n) {
  const el  = document.getElementById(id);
  if (!el) return;
  const val = pad(n);
  if (el.textContent === val) return;
  el.textContent = val;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = 'flip-num 0.38s ease';
}

function pad(n) { return n < 10 ? '0' + n : String(n); }
