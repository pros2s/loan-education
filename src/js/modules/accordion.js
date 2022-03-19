import animateCSS from '../helpers/slide';


export default class Accordion {
  constructor(accordionBlock, module = '') {
    this.block = document.querySelector(accordionBlock);
    try { this.accordionItems = this.block.children } catch(err) {};
    this.counter = 1;

    try { this.module = this.block.parentNode.querySelector(module) } catch(err) {};
  }


  openItems(items, counter) {
    //hide all items before open one by one
    items.forEach((item, i, arr) => {
      if (i !== 0 && i !== arr.length - 1) item.style.display = 'none';
    });
    /////////////////////////////////////

    //open items
    const itemLength = items.length;
    const lastItem = items[itemLength - 1];

    lastItem.querySelector('.plus').addEventListener('click', () => {
      if (counter === itemLength - 2) lastItem.remove();

      if (counter !== itemLength - 1) animateCSS(lastItem, 'fadeInUp');
      animateCSS(items[counter], 'fadeInDown');

      items[counter].style.display = 'flex';
      counter++;
    });
    /////////////////////////////////////
  }


  init() {
    try { this.openItems(this.accordionItems, this.counter) } catch(err) {};
  }
}