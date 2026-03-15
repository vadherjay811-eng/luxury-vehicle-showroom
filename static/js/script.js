



// ============================
// Hamburger Menu
// ============================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// ============================
// Model Data & Populate Grid
// ============================
const models = [
  { name: "BMW X5", price: "$60,000", type: "SUV" },
  { name: "BMW M3", price: "$72,000", type: "Sedan" },
  { name: "BMW i8", price: "$140,000", type: "Hybrid Sports" },
  { name: "BMW 7 Series", price: "$86,000", type: "Luxury Sedan" },
];

const modelGrid = document.getElementById("modelGrid");
const modelSelect = document.getElementById("modelSelect");

if (modelGrid && modelSelect) {
  models.forEach(model => {
    const div = document.createElement("div");
    div.classList.add("model-card");
    div.innerHTML = `
      <h2>${model.name}</h2>
      <p>Type: ${model.type}</p>
      <p>Price: ${model.price}</p>
      <a href="#test-ride" class="hero-btn">Book Test Ride</a>
      <button class="model-btn">Details</button>`;
    modelGrid.appendChild(div);

    const option = document.createElement("option");
    option.value = model.name;
    option.textContent = model.name;
    modelSelect.appendChild(option);
  });
}

// ============================
// Test Ride Form Handling
// ============================
const form = document.getElementById("testRideForm");
const successSection = document.getElementById("successMessage");
const successText = document.getElementById("successText");
const historyTable = document.getElementById("historyTable");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const model = document.getElementById("modelSelect").value;
    const date = document.getElementById("date").value;
    const time = new Date().toLocaleString();

    if (successText && successSection) {
      successText.textContent = `Your test ride for ${model} is booked on ${date}.`;
      successSection.style.display = "block";
    }

    if (historyTable) {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${name}</td><td>${email}</td><td>${model}</td><td>${date}</td><td>${time}</td>`;
      historyTable.appendChild(row);
    }

    form.reset();
  });
}

// ============================
// Carousel Functionality
// ============================
const slides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const heroTitle = document.querySelector(".hero-title");
const heroSubtitle = document.querySelector(".hero-subtitle");
const carouselDots = document.getElementById("carouselDots");
let currentSlide = 0;

if (slides.length > 0 && carouselDots) {
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentSlide = i;
      updateCarousel();
    });
    carouselDots.appendChild(dot);
  });

  function updateCarousel() {
    slides.forEach((slide, i) => slide.classList.remove("active"));
    slides[currentSlide].classList.add("active");

    const slide = slides[currentSlide];
    if (heroTitle && heroSubtitle) {
      heroTitle.textContent = slide.dataset.name;
      heroSubtitle.textContent = `${slide.dataset.type} | Price: ${slide.dataset.price}`;
    }

    document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    });
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }, 5000);
}

// ============================
// Navbar Scroll Effect
// ============================
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});

// ============================
// Scroll Animation for Models
// ============================
function revealOnScroll() {
  const modelCards = document.querySelectorAll(".model-card");
  const windowHeight = window.innerHeight;

  modelCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < windowHeight - 100) {
      card.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ============================
// Animate Hero Buttons on Load
// ============================
window.addEventListener("load", () => {
  const heroButtons = document.querySelectorAll(".hero-btn");
  heroButtons.forEach((btn, i) => {
    setTimeout(() => {
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
    }, i * 200);
  });
});




// ============================
// Model Details Button
// ============================
document.querySelectorAll(".model-btn").forEach(button => {
  button.addEventListener("click", () => {
    const model = button.parentElement.querySelector("h2").innerText;
    alert(`More details about ${model} coming soon!`);
  });
});

// ============================
// Popup Handling
// ============================
const popupOverlay = document.getElementById("popupOverlay");
const popupForm = document.getElementById("popupTestRideForm");
const closePopup = document.getElementById("closePopup");
const popupModel = document.getElementById("popupModel");

if (popupOverlay && closePopup && popupForm && popupModel) {
  document.querySelectorAll(".model-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const modelName = e.target.parentElement.querySelector("h2").textContent;
      popupModel.value = modelName;
      popupOverlay.style.display = "flex";
    });
  });

  closePopup.addEventListener("click", () => popupOverlay.style.display = "none");
  popupOverlay.addEventListener("click", e => {
    if (e.target === popupOverlay) popupOverlay.style.display = "none";
  });

  popupForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("popupName").value;
    const email = document.getElementById("popupEmail").value;
    const model = popupModel.value;
    const date = document.getElementById("popupDate").value;
    const bookedOn = new Date().toLocaleString();

    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td><td>${email}</td><td>${model}</td><td>${date}</td><td>${bookedOn}</td>`;
    if (historyTable) historyTable.appendChild(row);

    popupOverlay.style.display = "none";
    popupForm.reset();
    alert(`✅ Test ride booked for ${model} on ${date}!`);
  });
}

// ============================
// Smooth Scroll (with Navbar Offset)
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      target.classList.add("highlight");
      setTimeout(() => target.classList.remove("highlight"), 1500);
    }
  });
});

// ============================
// Sign-In Modal Functionality
// ============================
const signInModal = document.getElementById("signInModal");
const openSignIn = document.getElementById("openSignIn");
const closeModal = document.getElementById("closeModal");

if (openSignIn && signInModal && closeModal) {
  openSignIn.addEventListener("click", () => {
    signInModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    signInModal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === signInModal) {
      signInModal.style.display = "none";
    }
  });
}

// ============================
// Local Storage User Handling
// ============================
const user = localStorage.getItem("bmwUser");
const signinBtn = document.getElementById("signinButton");
const logoutBtn = document.getElementById("logoutButton");

if (signinBtn && logoutBtn) {
  if (user) {
    signinBtn.textContent = "Welcome, " + user;
    signinBtn.disabled = true;
    signinBtn.style.background = "linear-gradient(90deg, #00b4ff, #007bff)";
    logoutBtn.style.display = "inline-block";
  } else {
    signinBtn.addEventListener("click", () => {
      window.location.href = "signin.html";
    });
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("bmwUser");
    window.location.reload();
  });
}



// Navbar Scroll Effect
// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});




  const cards = document.querySelectorAll('.car-card');
  const fadeInOnScroll = () => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll();




  // Fade-in header on page load
window.addEventListener("load", () => {
  const header = document.querySelector("header");
  header.style.opacity = "1";
});



// Light blue glowing header on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});




  // ===========================
  // Dark Mode Toggle System
  // ===========================
  const toggleButton = document.getElementById("themeToggle");
  const darkTheme = document.getElementById("darkTheme");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    darkTheme.removeAttribute("disabled");
    document.body.classList.add("dark-active");
    toggleButton.textContent = "☀️";
  } else {
    darkTheme.setAttribute("disabled", "true");
    toggleButton.textContent = "🌙";
  }

  // Toggle theme
  toggleButton.addEventListener("click", () => {
    document.body.classList.add("theme-transition");
    setTimeout(() => document.body.classList.remove("theme-transition"), 500);

    if (darkTheme.hasAttribute("disabled")) {
      darkTheme.removeAttribute("disabled");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark-active");
      toggleButton.textContent = "☀️";
    } else {
      darkTheme.setAttribute("disabled", "true");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark-active");
      toggleButton.textContent = "🌙";
    }
  });

document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});



// === Theme toggle (fixed) ===
const themeToggle = document.getElementById('themeToggle'); // matches your HTML
const pageBody = document.body; // renamed to avoid duplicate 'body' declarations

// Initialize from storage (run once)
if (themeToggle) {
  if (localStorage.getItem('theme') === 'dark') {
    pageBody.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    // Start cinematic fade
    pageBody.classList.add('fade-transition');

    // small delay so fade-transition is visible before toggling theme
    setTimeout(() => {
      pageBody.classList.toggle('dark-mode');

      // update icon
      themeToggle.textContent = pageBody.classList.contains('dark-mode') ? '☀️' : '🌙';

      // persist choice
      localStorage.setItem('theme', pageBody.classList.contains('dark-mode') ? 'dark' : 'light');
    }, 100);

    // remove transition class after CSS transition ends
    // match this duration with your CSS (0.7s used in previous suggestion)
    setTimeout(() => {
      pageBody.classList.remove('fade-transition');
    }, 800);
  });
}
































