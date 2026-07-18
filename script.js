document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     MOBILE MENU
  ========================================================= */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================================
     SCROLL REVEAL (process steps & work cards)
  ========================================================= */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* =========================================================
     SEASON WHEEL
  ========================================================= */
  const seasonData = {
    spring: {
      name: 'Весна',
      desc: 'Тюльпаны, ранункулюсы и гиацинты — короткий и нежный сезон, собираем композиции близко к дате события.',
      flowers: 'тюльпаны, ранункулюсы, гиацинт',
      palette: 'нежно-розовая, лавандовая',
      note: 'самый короткий срок жизни среза'
    },
    summer: {
      name: 'Лето',
      desc: 'Пионы, дельфиниум и скабиоза — самый долгий и щедрый сезон живых цветов, три недели пионов в июне держат весь стиль лета.',
      flowers: 'пионы, дельфиниум, скабиоза',
      palette: 'свежая, разноцветная',
      note: 'самый долгий сезон живого среза'
    },
    autumn: {
      name: 'Осень',
      desc: 'Георгины, хризантемы и физалис — тёплая, насыщенная палитра, добавляем сухоцветы и ветки с ягодами.',
      flowers: 'георгины, хризантемы, физалис',
      palette: 'тёплая, бордово-оранжевая',
      note: 'дополняем сухоцветами и ветками'
    },
    winter: {
      name: 'Зима',
      desc: 'Розы, эустома, эвкалипт и ветки хвои — больше зелени и текстуры, меньше ярких цветовых пятен.',
      flowers: 'розы, эустома, эвкалипт, хвоя',
      palette: 'глубокая, зелёно-бордовая',
      note: 'акцент на зелень и текстуру'
    }
  };

  const seasonSection = document.getElementById('season');
  const wedges = document.querySelectorAll('.wedge');
  const wheelLabel = document.getElementById('wheelLabel');
  const nameEl = document.getElementById('seasonName');
  const descEl = document.getElementById('seasonDesc');
  const flowersEl = document.getElementById('seasonFlowers');
  const paletteEl = document.getElementById('seasonPalette');
  const noteEl = document.getElementById('seasonNote');

  function applySeason(key) {
    const data = seasonData[key];
    if (!data) return;

    if (wheelLabel) wheelLabel.textContent = data.name;
    if (nameEl) nameEl.textContent = data.name;
    if (descEl) descEl.textContent = data.desc;
    if (flowersEl) flowersEl.textContent = data.flowers;
    if (paletteEl) paletteEl.textContent = data.palette;
    if (noteEl) noteEl.textContent = data.note;

    if (seasonSection) seasonSection.dataset.season = key;
    wedges.forEach(w => w.classList.toggle('is-active', w.dataset.season === key));
  }

  wedges.forEach(w => {
    w.addEventListener('click', () => applySeason(w.dataset.season));
  });

  /* =========================================================
     REVIEWS CAROUSEL
  ========================================================= */
  const track = document.getElementById('reviewTrack');
  const reviews = track ? Array.from(track.querySelectorAll('.review')) : [];
  const dotsWrap = document.getElementById('reviewDots');
  const prevBtn = document.getElementById('reviewPrev');
  const nextBtn = document.getElementById('reviewNext');

  let current = 0;

  if (reviews.length && dotsWrap) {
    reviews.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Отзыв ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => showReview(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showReview(index) {
    if (!reviews.length) return;
    current = (index + reviews.length) % reviews.length;

    reviews.forEach((r, i) => r.classList.toggle('is-active', i === current));

    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
      });
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => showReview(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showReview(current + 1));

  /* =========================================================
     CONTACT FORM (demo submit — no backend attached)
  ========================================================= */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const phone = form.phone.value.trim();

      if (!name || !phone) {
        status.textContent = 'Заполните имя и контакт для связи.';
        status.style.color = '#b9707e';
        return;
      }

      status.textContent = `Спасибо, ${name}! Мы свяжемся с вами в течение дня.`;
      status.style.color = '#5c8a5f';
      form.reset();
    });
  }

});
