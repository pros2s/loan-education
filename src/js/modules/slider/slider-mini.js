import Slider from './slider';


export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, style, autoplay) {
    super(container, next, prev, activeClass, style, autoplay);
  }


  styleFirstSlide() {
    //reset styles for every slide
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);

      if (this.style) {
        slide.querySelector('.card__title').style.opacity = '.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      };
    });
    //

    //add styles for the first slide
    this.slides[0].classList.add(this.activeClass);
    if (this.style) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    };
    //
  }


  switchSlide() {
    const button = this.container.querySelectorAll('BUTTON');//find all buttons(.feed__slider)

    //next arrow
    this.next.addEventListener('click', () => {
      //skip buttons
      if (this.slides[1] === button[0]) {
        this.container.appendChild(button[0]);
        this.container.appendChild(button[1]);
        this.container.appendChild(this.slides[0]);
      }
      else {
        this.container.appendChild(this.slides[0]);
      };
      //

      this.styleFirstSlide();
    });
    //


    //previous arrow
    this.prev.addEventListener('click', () => {
      //conditional operator for skip buttons
      this.slides[this.slides.length - 1] === button[1] ?
      this.container.insertBefore(this.slides[this.slides.length - 3], this.slides[0]) :
      this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
      //

      this.styleFirstSlide();
    });
    //
  }


  init() {
    //horizontal all slides
    this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
    `;

    this.switchSlide();
    this.styleFirstSlide();
  }
}