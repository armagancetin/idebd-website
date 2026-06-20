const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Mobile menu
const btn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (btn && nav) {
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");
        io.unobserve(entry.target);

        // Counter animation when visible
        const counters = entry.target.querySelectorAll(".count");
        counters.forEach(animateCount);
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
} else {
  // Fallback
  revealEls.forEach((el) => el.classList.add("show"));
}

function animateCount(el) {
  const target = Number(el.getAttribute("data-target") || "0");
  if (!target) return;

  let current = 0;
  const duration = 900;
  const start = performance.now();

  function tick(t) {
    const p = Math.min(1, (t - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    current = Math.round(target * eased);
    el.textContent = String(current);

    if (p < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function handleSubmit(e) {
  e.preventDefault();

  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  const name = form.querySelector('input[name="name"]').value.trim();
  const contact = form.querySelector('input[name="contact"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();

  const subject = encodeURIComponent("İde Web İletişim Formu");
  const body = encodeURIComponent(
    "Ad Soyad: " + name + "\n" +
    "Telefon / E-posta: " + contact + "\n\n" +
    "Mesaj:\n" + message
  );

  window.location.href = `mailto:iletisim@idebd.com.tr?subject=${subject}&body=${body}`;

  if (note) {
    note.textContent = "Mail uygulamanız açılıyor. Açılmazsa lütfen iletisim@idebd.com.tr adresine manuel olarak yazın.";
  }

  return false;
}