export default class Forms {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);

    this.message = {
      loadingPath: './assets/img/status-message/load.gif',
      successPath: './assets/img/status-message/ok.gif',
      errorPath: './assets/img/status-message/err.gif',
    };

    this.postPath = 'assets/question.php';
  }


  //post data to the server
  async fetchData(url, data) {
    let result = fetch(url, {
      method: 'POST',
      body: data,
    });

    return (await result).text();
  }
  /////////////////////////////////////


  clearInputs(inputs) {
    inputs.forEach((input) => {
      input.value = '';
    });
  };


  init() {
    this.forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        //append status message for user
        let statusMessage = document.createElement('img');
        form.parentNode.appendChild(statusMessage);
        statusMessage.style.cssText = `
          width: 50px;
          heigh: 50px;
          margin-left: 72px;
          margin-top: 10px;
        `;
        /////////////////////////////////////

        statusMessage.setAttribute('src', this.message.loadingPath);
        statusMessage.setAttribute('alt', 'loading');

        const formData = new FormData(form);
        this.fetchData(this.postPath, formData)
          //change notifications depending on the result
          .then((res) => {
            statusMessage.setAttribute('src', this.message.successPath);
            statusMessage.setAttribute('alt', 'success');

            console.log(res)
          })
          .catch((err) => {
            statusMessage.setAttribute('src', this.message.errorPath);
            statusMessage.setAttribute('alt', 'error');

            console.log(err)
          })
          /////////////////////////////////////

          //reset whole form
          .finally(() => {
            this.inputs = form.querySelectorAll('input');
            this.clearInputs(this.inputs);

            setTimeout(() => {
              statusMessage.remove();
            }, 10000);
          });
          /////////////////////////////////////
      });
    });
  }
}