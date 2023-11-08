const container = document.querySelector('.before-after-slider');
document.querySelector('.before-after-slider__slider').addEventListener('input', (e) => {
  container.style.setProperty('--position', `${e.target.value}%`);
})
