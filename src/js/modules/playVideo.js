export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
  }


  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        //create new player only if it hasn't been opened
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';

          //open other video by click on other btn
          if (this.path !== btn.getAttribute('data-url')){
            this.path = btn.getAttribute('data-url');
            this.player.loadVideoById({videoId: this.path});
          }
          /////////////////////////////////////
        }
        else {
          this.path = btn.getAttribute('data-url');
          this.createPlayer(this.path);
        }
      });
    });
  }


  //close overlay
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  /////////////////////////////////////


  createPlayer(url) {
    //youtube API(YT)
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: url
    });

    this.overlay.style.display = 'flex';
  }


  init() {
    if (this.btns.length > 0) {
    //this code from youtube API to connect itself
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";//sdn link of youtube API

      //inserts youtube API script before all of others
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    /////////////////////////////////////

      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}