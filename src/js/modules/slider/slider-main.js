import Slider from './slider';
import animateCSS from '../../helpers/slide';


export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);

    this.logoClicked = false;//variable for watch the click on logo
  }


  showSlides(n) {
    //checks outside slideIndex
    if (n > this.slides.length) this.slideIndex = 1;
    if (n < 1) this.slideIndex = this.slides.length;

    //hides every slide
    this.slides.forEach(slide => {
      slide.style.display = 'none';
      slide.style.overflow = 'hidden';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';//shows current slide

    //.hanson exists only on one slide
    try {
      //fadeInUp 'hanson' block on the third slide
      this.hanson.style.display = 'none';
      if (n === 3) {
        setTimeout(() => {
          this.hanson.style.display = 'block';
          animateCSS(this.hanson, 'fadeInUpBig');
        }, 3000);
      }
      /////////////////////////////////////
    } catch(e) {};
    /////////////////////////////////////
  }


  switchSlides(n, logoClicked, prevOrNext = null) {
    this.showSlides(this.slideIndex += n);//change slide

    const currentSlide = this.slides[this.slideIndex - 1];

    logoClicked ? animateCSS(currentSlide, 'fadeIn') ://fadeIn animation only for logo
    !prevOrNext ? animateCSS(currentSlide, 'slideInUp') ://for prev animation up
    animateCSS(currentSlide, 'slideInDown');//for next animation down
  }


  //left/right(.prevmodule/.nextmodule) arrows
  bindControlsArrows(module) {
    module.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        module === this.modulePrev ? this.switchSlides(-1, false, 'prev') : this.switchSlides(1, false);
      });
    });
  }


  //arrows(prev/next) method
  bindArrows() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        //this one because of two same classNames for different arrows
        btn.tagName === 'A' ? this.switchSlides(1) : this.slides[this.slideIndex - 1].style.display = 'block';
      });

      //show the first slide on logo click
      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        if (btn.tagName === 'A') {
          e.preventDefault();
          this.logoClicked = true;

          this.slideIndex = 1;
          this.switchSlides(0, this.logoClicked, null);
        };
      });
    });

    this.bindControlsArrows(this.modulePrev);
    this.bindControlsArrows(this.moduleNext);
  }
  /////////////////////////////////////


  render() {
    if (this.container) {//different containers for different pages
      try {this.hanson = document.querySelector('.hanson')} catch(err) {};//find .hanson block

      this.bindArrows();
      this.showSlides(this.slideIndex);
    };
  }
}