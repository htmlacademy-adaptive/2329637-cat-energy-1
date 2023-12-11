let navWrapper = document.querySelector(".navigation__wrapper");
let navToggle = document.querySelector(".navigation__burger-menu");
navWrapper.classList.remove("navigation__wrapper--nojs");

navToggle.onclick = function () {
  navToggle.classList.toggle("navigation__burger-menu--opened");
  navWrapper.classList.toggle("navigation__wrapper--opened");
};
