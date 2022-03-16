import animateCSS from '../helpers/slide';


export default class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page);
    this.slides = this.page.children;
    this.btns = document.querySelectorAll(btns);

    this.slideIndex = 1;
  }


  showSlides(n) {
    if (n > this.slides.length) this.slideIndex = 1;
    if (n < 1) this.slideIndex = this.slides.length;

    this.slides.forEach(slide => {
      slide.style.display = 'none';
      slide.style.overflow = 'hidden';
    });

    const currentSlide = this.slides[this.slideIndex - 1];
    animateCSS(currentSlide, 'slideInUp');
    currentSlide.style.display = 'block';

    this.hanson.style.display = 'none';
    try {
      if (n === 3) {
        setTimeout(() => {
          this.hanson.style.display = 'block';
          animateCSS(this.hanson, 'fadeInUpBig');
        }, 3000);
      }
    } catch(e) {};
  }


  switchSlides(n) {
    this.showSlides(this.slideIndex += n);
  }


  render() {
    this.hanson = document.querySelector('.hanson');

    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchSlides(1);
      });

      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();

        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.showSlides(this.slideIndex);
  }
}