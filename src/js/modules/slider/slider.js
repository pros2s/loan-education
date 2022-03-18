export default class Slider {
  constructor({
      container = null,
      btns = null,
      next = null,
      moduleNext = null,
      prev = null,
      modulePrev = null,
      activeClass = '',
      style = false,
      autoplay = false,
    } = {}) {
    this.container = document.querySelector(container);
    try {this.slides = this.container.children;} catch(err) {};

    this.btns = document.querySelectorAll(btns);

    this.next = document.querySelector(next);
    this.moduleNext = document.querySelectorAll(moduleNext);
    this.prev = document.querySelector(prev);
    this.modulePrev = document.querySelectorAll(modulePrev);

    this.activeClass = activeClass;
    this.style = style;
    this.autoplay = autoplay;

    this.slideIndex = 1;
  }
}