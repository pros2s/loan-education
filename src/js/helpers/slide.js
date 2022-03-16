const animateCSS = (element, animation) =>
// We create a Promise and return it
new Promise((resolve, reject) => {
  element.classList.add('animated', animation);

  // When the animation ends, we clean the classes and resolve the Promise
  function handleAnimationEnd(event) {
    event.stopPropagation();
    element.classList.remove('animated', animation);
    resolve('Animation ended');
  }

  element.addEventListener('animationend', handleAnimationEnd, {once: true});
});


export default animateCSS;