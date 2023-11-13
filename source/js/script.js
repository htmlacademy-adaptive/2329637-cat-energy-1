const container = document.querySelector(".before-after-slider");
document
  .querySelector(".before-after-slider__slider")
  .addEventListener("input", (e) => {
    container.style.setProperty("--position", `${e.target.value}%`);
  });
let navWrapper = document.querySelector(".navigation__wrapper");
let navToggle = document.querySelector(".navigation__burger-menu");
navWrapper.classList.remove("navigation__wrapper--nojs");
navToggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("navigation__wrapper--closed")) {
    navWrapper.classList.remove("navigation__wrapper--closed");
    navWrapper.classList.add("navigation__wrapper--opened");
    navToggle.classList.remove("navigation__burger-menu--closed");
    navToggle.classList.add("navigation__burger-menu--opened");
  } else {
    navWrapper.classList.add("navigation__wrapper--closed");
    navWrapper.classList.remove("navigation__wrapper--opened");
    navToggle.classList.remove("navigation__burger-menu--opened");
    navToggle.classList.add("navigation__burger-menu--closed");
  }
});
