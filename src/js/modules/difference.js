import animateCSS from "../helpers/slide";

export default class Difference {
  constructor(firstBlock, secondBlock) {
    this.first = document.querySelector(firstBlock);
    this.second = document.querySelector(secondBlock);
    try {
      this.firstItems = this.first.children;
      this.secondItems = this.second.children;
    }
    catch(err) {};

    this.firstCounter = 1;
    this.secondCounter = 1;
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
    try {
      this.openItems(this.firstItems, this.firstCounter);
      this.openItems(this.secondItems, this.secondCounter);
    }
    catch(err) {};
  }
}