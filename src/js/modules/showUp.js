import animateCSS from '../helpers/slide';


export default class ShowUp {
  constructor(blocks) {
    try { this.blocks = document.querySelectorAll(blocks) } catch(err) {};
  }


  init() {
    this.blocks.forEach((block) => {
      const plus = block.querySelector('.plus');
      const msg = block.nextElementSibling;
      const nextOne = msg.nextElementSibling;
      const nextTwo = nextOne.nextElementSibling;

      plus.setAttribute('data-opened', 'false');

      plus.addEventListener('click', () => {
        if (plus.getAttribute('data-opened') === 'false') {
          plus.setAttribute('data-opened', 'true');

          msg.style.display = 'block';
          animateCSS(msg, 'fadeInDown');
          animateCSS(nextOne, 'slideInDown');
          animateCSS(nextTwo, 'slideInDown');
        }
        else {
          plus.setAttribute('data-opened', 'false');

          animateCSS(nextTwo, 'slideOutUp');
          animateCSS(nextOne, 'slideOutUp');
          animateCSS(msg, 'fadeOutUp').then(() => msg.style.display = 'none');
        };
      });
    });
  }
}