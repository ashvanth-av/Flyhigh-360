const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenu && navMenu) {
  mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll(
    '.section-header, .about-card, .service-card, .industry-card, .tech-feature, .gallery-item, .commitment-card, .value-card, .stat-card, .mv-card, .team-member, .cert-card, .contact-method, .contact-card, .faq-item'
  );
  animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = `
  position: fixed; bottom: 24px; right: 24px; width: 44px; height: 44px;
  border-radius: 12px; background: linear-gradient(135deg, #f5b342, #d4942a);
  color: #0b0d17; border: none; cursor: pointer; opacity: 0; visibility: hidden;
  transition: all 0.3s ease; z-index: 1000;
  box-shadow: 0 4px 20px rgba(245,179,66,0.3);
  display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
`;
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

const preloaderStyles = document.createElement('style');
preloaderStyles.textContent = `
  body:not(.loaded) { overflow: hidden; }
  body:not(.loaded)::before {
    content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: #0b0d17; z-index: 9999;
    display: flex; align-items: center; justify-content: center;
  }
  body:not(.loaded)::after {
    content: 'FLYHIGH360'; position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: #f5b342; font-size: 2rem; font-weight: 800; letter-spacing: 4px;
    z-index: 10000;
    animation: preloaderPulse 1.5s ease-in-out infinite;
  }
  @keyframes preloaderPulse {
    0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.98); }
  }
`;
document.head.appendChild(preloaderStyles);
