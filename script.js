// Simple animated neon lines for extra craziness
const bg = document.querySelector('.background-animation');

function addNeonLines() {
  for (let i = 0; i < 15; i++) {
    const line = document.createElement('div');
    line.className = 'neon-line';
    line.style.top = `${Math.random() * 100}vh`;
    line.style.left = `${Math.random() * 100}vw`;
    line.style.width = `${Math.random() * 80 + 40}px`;
    line.style.height = '2px';
    line.style.background = 'linear-gradient(90deg, #ff003c, #fff0)';
    line.style.position = 'absolute';
    line.style.filter = 'blur(1px)';
    line.style.opacity = 0.7;
    line.style.animation = `moveLine${i} 6s linear infinite`;
    bg.appendChild(line);

    // Add unique keyframes for each line
    const styleSheet = document.styleSheets[0];
    const keyframes =
      `@keyframes moveLine${i} {
        0% { transform: translateX(0); opacity: 0.7; }
        50% { transform: translateX(100vw); opacity: 1; }
        100% { transform: translateX(0); opacity: 0.7; }
      }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }
}

addNeonLines();
const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = 0;
canvas.style.pointerEvents = 'none';
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

let particles = [];
const particleCount = 100;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: random(0, window.innerWidth),
      y: random(0, window.innerHeight),
      size: random(1, 3),
      speedX: random(-0.5, 0.5),
      speedY: random(-0.5, 0.5),
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ff003c';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateParticles() {
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0 || p.x > window.innerWidth) p.speedX *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.speedY *= -1;
  });
}

function animate() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
animate();
// Profile pic hover effect
document.querySelector('.profile-pic').addEventListener('mouseover', function() {
  this.style.transform = 'scale(1.1) rotate(5deg)';
  this.style.boxShadow = '0 0 50px #ff003c';
});

document.querySelector('.profile-pic').addEventListener('mouseout', function() {
  this.style.transform = 'scale(1) rotate(0deg)';
  this.style.boxShadow = '0 0 30px #ff003c';
});

// Glassmorphism interactive effect
document.querySelectorAll('nav a, .project-card').forEach(element => {
  element.addEventListener('mouseover', () => {
    element.style.background = 'rgba(255, 0, 60, 0.15)';
  });
  element.addEventListener('mouseout', () => {
    element.style.background = 'transparent';
  });
});
// Contact form fake submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const status = contactForm.querySelector('.form-status');
    status.textContent = "Sending...";
    setTimeout(() => {
      status.textContent = "Thank you! Your message has been received.";
      contactForm.reset();
      setTimeout(() => status.textContent = "", 4000);
    }, 1200);
  });
}
// Typing animation for lock overlay with Enter Site button
const lockOverlay = document.getElementById('lock-overlay');
const typingText = document.getElementById('typing-text');
const enterBtn = document.getElementById('enter-btn');
const message = "Welcome to Tanishka's Portfolio...";
let idx = 0;

function typeWriter() {
  if (idx <= message.length) {
    typingText.textContent = message.slice(0, idx);
    idx++;
    setTimeout(typeWriter, 70);
  } else {
    setTimeout(() => {
      enterBtn.style.display = "inline-block";
      enterBtn.focus();
    }, 500); // Show button after typing finishes
  }
}

enterBtn.addEventListener('click', () => {
  lockOverlay.classList.add('hide');
  setTimeout(() => lockOverlay.style.display = 'none', 800);
});

window.addEventListener('DOMContentLoaded', () => {
  typeWriter();
});
const cursorEffect = document.querySelector('.cursor-effect');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Smoothly move the effect towards the mouse position
  const currentX = parseFloat(cursorEffect.style.left) || mouseX;
  const currentY = parseFloat(cursorEffect.style.top) || mouseY;
  cursorEffect.style.left = currentX + (mouseX - currentX) * 0.18 + 'px';
  cursorEffect.style.top = currentY + (mouseY - currentY) * 0.18 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Optional: Make the effect bigger on interactive elements
document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .edu-flip-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorEffect.style.width = '60px';
    cursorEffect.style.height = '60px';
    cursorEffect.style.opacity = '0.7';
    cursorEffect.style.boxShadow = '0 0 30px #ff003c';
  });
  el.addEventListener('mouseleave', () => {
    cursorEffect.style.width = '40px';
    cursorEffect.style.height = '40px';
    cursorEffect.style.opacity = '0.4';
    cursorEffect.style.boxShadow = '0 0 18px #ff003c88';
  });
});
// Scroll-triggered fade-up animation
const faders = document.querySelectorAll('.fade-up');

function checkFade() {
  faders.forEach(fader => {
    const rect = fader.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      fader.classList.add('visible');
    } else {
      fader.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

// Fade-up on scroll
function fadeUpOnScroll() {
  document.querySelectorAll('.fade-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', fadeUpOnScroll);
window.addEventListener('DOMContentLoaded', fadeUpOnScroll);
window.addEventListener('load', fadeUpOnScroll);
