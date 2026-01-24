// Animación al hacer scroll usando Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
  // Solo se animan los elementos que ya tengan `class="animate"` en el HTML
  // (textos y SVGs). No se agregan clases a contenedores o imágenes.

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    },
  );

  document.querySelectorAll(".animate").forEach((el) => {
    observer.observe(el);
  });
});
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let index = 0;
let startX = 0;
let isDragging = false;
let autoSlide;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  index = (index + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
}

// Botones
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

// Swipe
track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;

  if (diff > 50) {
    nextSlide();
    isDragging = false;
    resetAutoSlide();
  } else if (diff < -50) {
    prevSlide();
    isDragging = false;
    resetAutoSlide();
  }
});

track.addEventListener("touchend", () => {
  isDragging = false;
});

// Autoplay
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();
// script.js
// Reproducir audio automáticamente al entrar (con manejo de autoplay en navegadores)
window.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio-bg");
  if (audio) {
    // Intentar reproducir inmediatamente
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Si el navegador bloquea el autoplay, reproducir al primer click/tap
        const userInteract = () => {
          audio.play();
          window.removeEventListener("click", userInteract);
          window.removeEventListener("touchstart", userInteract);
        };
        window.addEventListener("click", userInteract);
        window.addEventListener("touchstart", userInteract);
      });
    }
  }

  // Inicializar contador de 'gracias' si existe
  startGraciasCountdown();
});

// Contador para la sección de 'Gracias'
function startGraciasCountdown() {
  const target = new Date("2026-04-09T00:00:00");
  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  if (!diasEl || !horasEl || !minutosEl || !segundosEl) return;

  function update() {
    const now = new Date();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    diasEl.textContent = String(days).padStart(2, "0");
    horasEl.textContent = String(hours).padStart(2, "0");
    minutosEl.textContent = String(minutes).padStart(2, "0");
    segundosEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}
