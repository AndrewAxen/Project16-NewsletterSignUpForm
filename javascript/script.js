/* SLIDER */

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});

/* JS: FADE AND SLIDE ON SCROLL */

function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("element-show");
    }
  });
}

let options = {
  threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".element-animation");

for (let elm of elements) {
  observer.observe(elm);
}

/* FORM VALIDATION */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("submit-button");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("input", function () {
    const nameInput = document.getElementById("name");
    const cnameInput = document.getElementById("cname");
    const phonenumInput = document.getElementById("phonenum");
    const emailInput = document.getElementById("email");

    const nameError = document.getElementById("nameError");
    const companyError = document.getElementById("companyError");
    const phonenumError = document.getElementById("phonenumError");
    const emailError = document.getElementById("emailError");

    nameError.style.display = nameInput.validity.patternMismatch ? "block" : "none";
    companyError.style.display = cnameInput.validity.patternMismatch ? "block" : "none";
    phonenumError.style.display = phonenumInput.validity.patternMismatch ? "block" : "none";
    emailError.style.display = emailInput.validity.patternMismatch ? "block" : "none";

    submitButton.disabled = !form.checkValidity();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    successMessage.style.display = "block";
    form.reset();
    setTimeout(function () {
      successMessage.style.display = "none";
    }, 5000);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitButton = document.getElementById("submit-button");

  form.addEventListener("input", function () {
    const isValid = form.checkValidity();

    if (isValid) {
      submitButton.classList.add("active");
    } else {
      submitButton.classList.remove("active");
    }
  });

  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
    } else {
      document.getElementById("successMessage").style.display = "block";
    }
  });

  submitButton.addEventListener("mouseenter", function () {
    if (submitButton.classList.contains("active")) {
      submitButton.classList.add("hover");
    }
  });

  submitButton.addEventListener("mouseleave", function () {
    submitButton.classList.remove("hover");
  });
});