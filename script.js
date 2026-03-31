/* ═══════════════════════════════════════════════════════════════
   Ayush Sharma Portfolio – script.js
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Typing Animation ─── */
const typingWords = [
  'Web Developer',
  'AI Coder',
  'BCA Student',
  'Accountant',
  'Problem Solver',
];

let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  if (!typingEl) return;

  const currentWord = typingWords[wordIdx];

  if (!isDeleting) {
    typingEl.textContent = currentWord.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentWord.length) {
      // Pause at end of word
      setTimeout(() => { isDeleting = true; type(); }, 1800);
      return;
    }
  } else {
    typingEl.textContent = currentWord.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % typingWords.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}

// Start after page load
window.addEventListener('load', () => setTimeout(type, 800));


/* ─── Sticky Navbar + Active Link ─── */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  // Scrolled class
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active section highlight
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); // Run on load


/* ─── Hamburger Menu ─── */
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navList.classList.toggle('open');
  document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : '';
});

// Close on link click
navList?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navList.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (navList?.classList.contains('open') &&
      !navList.contains(e.target) &&
      !hamburger?.contains(e.target)) {
    hamburger?.classList.remove('open');
    navList.classList.remove('open');
    document.body.style.overflow = '';
  }
});


/* ─── Scroll-triggered Fade-up Animations ─── */
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // Animate only once
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));


/* ─── Skill Bar Animation ─── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width  = target.getAttribute('data-width');
      // Small delay for staggered feel
      setTimeout(() => {
        target.style.width = width + '%';
      }, 150);
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* ─── Scroll to Top Button ─── */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn?.classList.add('visible');
  } else {
    scrollTopBtn?.classList.remove('visible');
  }
}, { passive: true });

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ─── Contact Form Handler ─── */
function handleSubmit(e) {
  e.preventDefault();

  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const submitBtn  = form?.querySelector('button[type="submit"]');

  // Basic validation
  const name    = document.getElementById('name')?.value.trim();
  const email   = document.getElementById('email')?.value.trim();
  const subject = document.getElementById('subject')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !subject || !message) return;

  // Simulate sending
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  }

  setTimeout(() => {
    // Reset button
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    }

    // Show success
    if (successMsg) {
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    }

    // Reset form
    form?.reset();
  }, 1600);
}

// Expose to HTML
window.handleSubmit = handleSubmit;


/* ─── Smooth Anchor Scroll (extra safety for older browsers) ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ─── Parallax blobs on mouse move (subtle) ─── */
const blobs = document.querySelectorAll('.blob');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  blobs.forEach((blob, i) => {
    const depth = (i + 1) * 0.4;
    blob.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
}, { passive: true });


/* ─── Lazy-load images ─── */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}


/* ─── Console Easter Egg ─── */
console.log(
  '%c🌿 Ayush Sharma Portfolio',
  'color:#2D6A4F; font-size:20px; font-weight:bold; font-family:Georgia,serif;'
);
console.log(
  '%c Built with ❤️ using HTML, CSS & Vanilla JS',
  'color:#52B788; font-size:13px;'
);
