import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import Difference from './modules/difference';
import VideoPlayer from './modules/playVideo';


window.addEventListener('DOMContentLoaded', () => {
  //Big slider
  const pageSlider = new MainSlider({
    container: '.page',
    btns: '.next'
  });
  pageSlider.render();
  /////////////////////////////////////


  //Small sliders
  const showUpSlider = new MiniSlider({
    container: '.showup__content-slider',
    next: '.showup__next',
    prev: '.showup__prev',
    activeClass: 'card-active',
    style: true,
  });
  showUpSlider.init();

  const modulesSlider = new MiniSlider({
    container: '.modules__content-slider',
    next: '.modules__info-btns .slick-next',
    prev: '.modules__info-btns .slick-prev',
    activeClass: 'card-active',
    style: true,
    autoplay: true,
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: '.feed__slider',
    next: '.feed__slider .slick-next',
    prev: '.feed__slider .slick-prev',
    activeClass: 'feed__item-active',
  });
  feedSlider.init();
  /////////////////////////////////////


  new Difference('.officerold', '.officernew').init();


  //Video players
  const player = new VideoPlayer('.showup .play', '.overlay');
  player.init();
  /////////////////////////////////////
});