import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import Difference from './modules/difference';
import Forms from './modules/forms';
import VideoPlayer from './modules/playVideo';


window.addEventListener('DOMContentLoaded', () => {
  //Big sliders
  const pageIndexSlider = new MainSlider({
    container: '.page',
    btns: '.next'
  });
  pageIndexSlider.render();

  const pageModulesSlider = new MainSlider({
    container: '.moduleapp',
    btns: '.next',
    moduleNext: '.nextmodule',
    modulePrev: '.prevmodule',
  });
  pageModulesSlider.render();
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


  //accordions
  new Difference('.officerold').init();
  new Difference('.officernew').init();
  /////////////////////////////////////
  

  new Forms('.form').init();


  //Video players
  new VideoPlayer('.showup .play', '.overlay').init();
  new VideoPlayer('.module__video-item .play', '.overlay').init();
  /////////////////////////////////////
});