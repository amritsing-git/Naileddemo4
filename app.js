/* ==========================================
   NAILED BY TRUPTI
   DEMO WEBSITE JAVASCRIPT
========================================== */


/* =========================
   ELEMENTS
========================= */

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const header = document.getElementById("header");

const menuLinks = document.querySelectorAll(".menu-link");

const reveals = document.querySelectorAll(".reveal");

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

const bookingForm = document.getElementById("bookingForm");

const toast = document.getElementById("toast");

const serviceSelect = document.getElementById("service");


/* =========================
   MENU OPEN
========================= */

function openMenu() {

  mobileMenu.classList.add("active");

  document.body.classList.add("menu-open");

}


/* =========================
   MENU CLOSE
========================= */

function closeNavigation() {

  mobileMenu.classList.remove("active");

  document.body.classList.remove("menu-open");

}


menuBtn.addEventListener("click", openMenu);

closeMenu.addEventListener("click", closeNavigation);


/* =========================
   CLOSE MENU ON LINK CLICK
========================= */

menuLinks.forEach(link => {

  link.addEventListener("click", () => {

    closeNavigation();

  });

});


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeNavigation();

    closeLightbox();

  }

});


/* =========================
   HEADER SCROLL EFFECT
========================= */

window.addEventListener("scroll", () => {

  if (window.scrollY > 60) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

});


/* =========================
   SCROLL REVEAL
========================= */

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


reveals.forEach(element => {

  revealObserver.observe(element);

});


/* =========================
   GALLERY LIGHTBOX
========================= */

galleryItems.forEach(item => {

  item.addEventListener("click", () => {

    const image = item.querySelector("img");

    if (!image) return;

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");

    document.body.classList.add("menu-open");

  });

});


/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {

  lightbox.classList.remove("active");

  document.body.classList.remove("menu-open");

  setTimeout(() => {

    lightboxImage.src = "";

  }, 300);

}


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener("click", event => {

  if (event.target === lightbox) {

    closeLightbox();

  }

});


/* =========================
   SERVICE BOOK BUTTON
========================= */

function selectService(serviceName) {

  serviceSelect.value = serviceName;

  const contactSection =
    document.getElementById("contact");

  contactSection.scrollIntoView({
    behavior: "smooth"
  });

}


/* =========================
   BOOKING FORM
========================= */

bookingForm.addEventListener("submit", event => {

  event.preventDefault();


  const name =
    document.getElementById("name").value.trim();

  const contact =
    document.getElementById("contactInput").value.trim();

  const service =
    document.getElementById("service").value;


  if (!name || !contact || !service) {

    showToast(
      "Please fill the required details."
    );

    return;

  }


  showToast(
    "Demo request received."
  );


  bookingForm.reset();

});


/* =========================
   TOAST
========================= */

let toastTimer;

function showToast(message) {

  const title =
    toast.querySelector("strong");

  title.textContent = message;

  toast.classList.add("show");


  clearTimeout(toastTimer);


  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3500);

}


/* =========================
   ACTIVE SECTION TRACKING
========================= */

const sections =
  document.querySelectorAll("main section[id]");


const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const id = entry.target.id;

          history.replaceState(
            null,
            "",
            "#" + id
          );

        }

      });

    },
    {
      threshold: 0.55
    }
  );


sections.forEach(section => {

  sectionObserver.observe(section);

});


/* =========================
   IMAGE LOADING
========================= */

document.querySelectorAll("img").forEach(img => {

  img.addEventListener("error", () => {

    img.style.background = "#ead7d5";

  });

});


/* =========================
   DATE MINIMUM
========================= */

const dateInput =
  document.getElementById("date");


if (dateInput) {

  const today =
    new Date().toISOString().split("T")[0];

  dateInput.min = today;

}


/* =========================
   PAGE LOAD
========================= */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});


/* =========================
   SMOOTH HASH NAVIGATION
========================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach(anchor => {

  anchor.addEventListener("click", function(event) {

    const targetId =
      this.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) return;


    const target =
      document.querySelector(targetId);

    if (!target) return;


    event.preventDefault();


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});