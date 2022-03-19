export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');

    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);//strict context(this) binding
  }


  bindTriggers() {
    this.btns.forEach((btn, i) => {
      if (i % 2 === 0) btn.setAttribute('data-locked', 'false');

      btn.addEventListener('click', () => {
        this.clickedBtn = btn;//current(clicked) videoplayer for onPlayerStateChange

        if (btn.getAttribute('data-locked') === 'false') {
          //create new player only if it hasn't been opened
          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';

            //open other video by click on other btn
            if (this.path !== btn.getAttribute('data-url')){
              this.path = btn.getAttribute('data-url');
              this.player.loadVideoById({videoId: this.path});
            };
            /////////////////////////////////////
          }
          else {
            this.path = btn.getAttribute('data-url');
            this.createPlayer(this.path);
          };
          /////////////////////////////////////
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
      videoId: url,
      events: {
        'onStateChange': this.onPlayerStateChange,//watching state.data to confirm video finish
      }
    });

    this.overlay.style.display = 'flex';
  }


  onPlayerStateChange(state) {
    try {
      const blockedElem = this.clickedBtn.closest('.module__video-item').nextElementSibling;
      const playCircle = blockedElem.querySelector('.play__circle');
      const playSVG = this.clickedBtn.querySelector('SVG').cloneNode(true);//clones play svg

      if (state.data === 0) {//state.data = 0 => video has been watched
        //activates next video styles when current video has been watched
        playCircle.classList.remove('closed');
        playCircle.querySelector('SVG').remove();
        playCircle.appendChild(playSVG);

        playCircle.nextElementSibling.classList.remove('attention');
        playCircle.nextElementSibling.textContent = 'play video';

        blockedElem.style.filter = 'none';
        blockedElem.style.opacity = '1';
        /////////////////////////////////////

        blockedElem.querySelector('.play').setAttribute('data-locked', 'false');
      };
    }
    catch(err) {};
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
    };
  }
}