import Slider from './slider';
import animateCSS from '../../helpers/slide';


export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }


  showSlides(n) {
    //checks outside slideIndex
    if (n > this.slides.length) this.slideIndex = 1;
    if (n < 1) this.slideIndex = this.slides.length;
    //

    //hides every slide
    this.slides.forEach(slide => {
      slide.style.display = 'none';
      slide.style.overflow = 'hidden';
    });
    //

    //shows current slide with animation
    const currentSlide = this.slides[this.slideIndex - 1];
    animateCSS(currentSlide, 'slideInUp');
    currentSlide.style.display = 'block';
    //

    //fadeInUp 'hanson' block on the third slide
    this.hanson.style.display = 'none';
    try {
      if (n === 3) {
        setTimeout(() => {
          this.hanson.style.display = 'block';
          animateCSS(this.hanson, 'fadeInUpBig');
        }, 3000);
      }
    } catch(e) {};
    //
  }


  switchSlides(n) {
    this.showSlides(this.slideIndex += n);
  }


  render() {
    try {
      this.hanson = document.querySelector('.hanson');//find .hanson block

      this.btns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.switchSlides(1);
        });

        //show the first slide on logo click
        btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
          e.preventDefault();

          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        });
        //
      });

      this.showSlides(this.slideIndex);
    }
    catch(err) {};
  }
}