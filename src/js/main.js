import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import ShowUp from './modules/showUp';
import Accordion from './modules/accordion';
import Forms from './modules/forms';
import Download from './modules/download';
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
  new Accordion('.officerold').init();
  new Accordion('.officernew').init();

  new ShowUp('.module__info-show').init();
  /////////////////////////////////////


  new Forms('.form').init();
  new Download('.download').downloadFile();


  //Video players
  new VideoPlayer('.showup .play', '.overlay').init();
  new VideoPlayer('.module__video-item .play', '.overlay').init();
  /////////////////////////////////////
});