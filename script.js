document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle state
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
      
      // Prevent page scrolling when mobile menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
      });
    });
  }

  /* ==========================================================================
     SCROLL FADE-IN ANIMATION (INTERSECTION OBSERVER)
     ========================================================================== */
  const fadeSections = document.querySelectorAll('.fade-in-section');
  
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Trigger the one-by-one stagger reveal for any direct
          // "stagger-children" containers inside this section, now that
          // it's actually scrolled into view (not on page load).
          entry.target.querySelectorAll('.stagger-children').forEach(group => {
            group.classList.add('stagger-active');
          });

          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% of section is visible
      rootMargin: '0px 0px -50px 0px'
    });

    fadeSections.forEach(section => {
      sectionObserver.observe(section);
    });
  } else {
    // Fallback if IntersectionObserver is not supported by legacy browser
    fadeSections.forEach(section => {
      section.classList.add('is-visible');
      section.querySelectorAll('.stagger-children').forEach(group => {
        group.classList.add('stagger-active');
      });
    });
  }

  /* ==========================================================================
     NAVBAR SCROLL SPY (DYNAMIC LINK HIGHLIGHTING)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  function scrollSpy() {
    const scrollPosition = window.scrollY + 100; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);

  /* ==========================================================================
     CONTACT FORM HANDLING (MOCK SUBMISSION)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page reload

      // Form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      // Visual loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      // Mock network submission delay
      setTimeout(() => {
        // Mock success response
        showStatus('Thank you, Khushi! Your message has been sent successfully.', 'success');
        contactForm.reset();
        
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 1200);
    });
  }

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
  }
  
/* ==========================================
   STAR BACKGROUND
========================================== */

const canvas = document.getElementById("stars");

if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const stars = [];

    for (let i = 0; i < 250; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            size: Math.random() * 2,
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.z -= 2;

            if (star.z <= 0) {
                star.z = canvas.width;
            }

            const k = 128 / star.z;
            const px = (star.x - canvas.width / 2) * k + canvas.width / 2;
            const py = (star.y - canvas.height / 2) * k + canvas.height / 2;

            if (
                px >= 0 &&
                px <= canvas.width &&
                py >= 0 &&
                py <= canvas.height
            ) {
                const size = (1 - star.z / canvas.width) * 3;

                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();
}
const robot = document.getElementById("robot-wrapper");
const robotGlowShadow = document.getElementById("robot-glow-shadow");

if(robot){

let mouseX = 0;
let mouseY = 0;

let rotateX = 0;
let rotateY = 0;

window.addEventListener("mousemove",(e)=>{

    mouseX = (e.clientX/window.innerWidth - 0.5) * 30;
    mouseY = (e.clientY/window.innerHeight - 0.5) * 30;

});

function animate(){

    rotateX += (mouseY - rotateX) * 0.08;
    rotateY += (mouseX - rotateY) * 0.08;

    robot.style.transform = `
        perspective(1200px)
        rotateX(${-rotateX}deg)
        rotateY(${rotateY}deg)
    `;

    // Glow shadow shifts opposite-ish the tilt and narrows as the robot turns,
    // reinforcing the sense of 3D depth beneath it.
    if (robotGlowShadow) {
        const shadowShiftX = rotateY * 1.1;
        const facing = Math.max(0.55, 1 - Math.abs(rotateY) / 40);
        robotGlowShadow.style.transform = `translateX(calc(-50% + ${shadowShiftX}px)) scaleX(${facing})`;
    }

    requestAnimationFrame(animate);
}

animate();

}

// NOTE: project cards already carry the "tilt-card" class, so they're handled
// by the single .skills-card/.tilt-card/.expertise-card listener below.
// (A second, separate listener used to also attach to .project-card here,
// which fought with this one for the same transform property and caused
// hover jitter -- removed so the tilt is smooth.)

document.querySelectorAll(".skills-card, .tilt-card, .expertise-card").forEach(card => {

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width)-0.5)*20;
        const rotateX = ((y / rect.height)-0.5)*-20;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.03)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    });

});

  /* ==========================================================================
     CUSTOM CURSOR
     A small dot that tracks the mouse exactly, plus a larger ring that
     trails behind it with easing, matching the style of the reference
     design. Automatically does nothing on touch devices (see CSS
     `pointer: coarse` query — this JS still runs but the elements are
     hidden, which is harmless).
     ========================================================================== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {

    let mouseCX = window.innerWidth / 2;
    let mouseCY = window.innerHeight / 2;
    let ringX = mouseCX;
    let ringY = mouseCY;

    window.addEventListener('mousemove', (e) => {
      mouseCX = e.clientX;
      mouseCY = e.clientY;
      cursorDot.style.transform = `translate(${mouseCX}px, ${mouseCY}px) translate(-50%, -50%)`;
    });

    function animateCursorRing() {
      ringX += (mouseCX - ringX) * 0.16;
      ringY += (mouseCY - ringY) * 0.16;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    // Grow the ring whenever hovering anything interactive
    const hoverTargets = document.querySelectorAll(
      'a, button, input, textarea, .tilt-card, .expertise-card, .timeline-alt-card, .social-icon'
    );
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });

    // Hide the custom cursor when it leaves the browser window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

});

