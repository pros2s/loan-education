export default class Download {
  constructor(download) {
    this.download = document.querySelectorAll(download);
    this.path = 'assets/img/download/1.png';
  }


  watchId(elem) {
    switch (elem.closest('.module').getAttribute('id')) {
      case '1': this.path = 'assets/img/download/1.png'; this.name = 'picture 1'; break;
      case '2': this.path = 'assets/img/download/2.png'; this.name = 'picture 2'; break;
      case '3': this.path = 'assets/img/download/3.png'; this.name = 'picture 3'; break;
      case '4': this.path = 'assets/img/download/4.png'; this.name = 'picture 4'; break;
      case '5': this.path = 'assets/img/download/5.png'; this.name = 'picture 5'; break;
      case '6': this.path = 'assets/img/download/6.png'; this.name = 'picture 6'; break;
      case '7': this.path = 'assets/img/download/7.png'; this.name = 'picture 7'; break;
      case '8': this.path = 'assets/img/download/8.png'; this.name = 'picture 8'; break;
    };
  }


  downloadFile() {
    this.download.forEach(load => {
      load.addEventListener('click', () => {
        this.watchId(load);
        const link = document.createElement('A');

        link.setAttribute('href', this.path);
        link.setAttribute('download', this.name);
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  }
}