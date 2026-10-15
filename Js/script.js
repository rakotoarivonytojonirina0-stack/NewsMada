(function () {
  const nav = document.querySelector('.navbar');
  const bar = document.getElementById('progress');
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.onglets');
  const hero = document.querySelector('header');

  // Barre de progression + navbar qui se réduit au scroll
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    nav.classList.toggle('scrolled', scrollY > 40);
    if (scrollY < innerHeight * 1.3) hero.style.setProperty('--py', (scrollY * 0.35) + 'px');
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  // Apparition des éléments au défilement
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Lien actif du menu selon la section visible
  const links = [...menu.querySelectorAll('a')];
  const targets = links.map(a => document.querySelector(a.getAttribute('href')));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const i = targets.indexOf(e.target);
        links.forEach((l, k) => l.classList.toggle('active', k === i));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  targets.forEach(t => t && spy.observe(t));
  links[0].classList.add('active');

  // Diaporama automatique (pause au survol)
  const slider = document.querySelector('.photo');
  const radios = [...document.querySelectorAll('.slide-input')];
  let n = 0, paused = false;
  slider.addEventListener('mouseenter', () => paused = true);
  slider.addEventListener('mouseleave', () => paused = false);
  radios.forEach((r, i) => r.addEventListener('change', () => n = i));
  setInterval(() => {
    if (paused) return;
    n = (n + 1) % radios.length;
    radios[n].checked = true;
  }, 4500);

  // Newsletter : confirmation simple
  const form = document.querySelector('.newsletter');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const b = form.querySelector('button');
    b.textContent = 'Merci ✓';
    form.reset();
    setTimeout(() => b.textContent = "S'abonner", 2500);
  });
})();
