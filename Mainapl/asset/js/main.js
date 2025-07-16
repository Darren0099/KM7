  const allAnimatedItems = document.querySelectorAll('.animate-up, .animate-slide, .animate-spread');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        if (el.classList.contains('animate-up')) {
          el.classList.add('show');
        }

        if (el.classList.contains('animate-slide')) {
          const direction = el.dataset.slide;
          el.classList.add(`in-${direction}`);
        }

        if (el.classList.contains('animate-spread')) {
          const dir = el.dataset.slide;
          el.classList.add(`spread-${dir}`);
        }

      } else {
        if (el.classList.contains('animate-up')) {
          el.classList.remove('show');
        }

        if (el.classList.contains('animate-slide')) {
          const direction = el.dataset.slide;
          el.classList.remove(`in-${direction}`);
        }

        if (el.classList.contains('animate-spread')) {
          const dir = el.dataset.slide;
          el.classList.remove(`spread-${dir}`);
        }
      }
    });
  }, {
    threshold: 0.1
  });

  allAnimatedItems.forEach(item => observer.observe(item));

  const mainToggle = document.getElementById('mainToggle');
  const dropdownPanel = document.getElementById('dropdownPanel');
  const toggleAkses = document.getElementById('toggleAkses');
  const toggleKrisis = document.getElementById('toggleKrisis');
  const aksesMenu = document.getElementById('aksesMenu');
  const krisisMenu = document.getElementById('krisisMenu');

  let isOpen = false;

  mainToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    dropdownPanel.classList.toggle('hidden', !isOpen);
  });

  toggleAkses.addEventListener('click', () => {
    aksesMenu.classList.toggle('hidden');
  });

  toggleKrisis.addEventListener('click', () => {
    krisisMenu.classList.toggle('hidden');
  });



  