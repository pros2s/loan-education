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


  phoneMask() {
    //function to set cursour at right position
    const setCursourPosition = (position, elem) => {
      elem.focus(); //forced focus

      if (elem.setSelectionRange) {//if browser has method 'setSelectionRange'
        elem.setSelectionRange(position, position);
      }
      else if (elem.createTextRange) {//for other browsers(expl)
        let range = elem.createTextRange();

        range.collapse(true);//start position = end one
        range.moveEnd('character', position);//end position
        range.moveStart('character', position);//start position(= end position)
        range.select();//select textrange
      }
    };
    /////////////////////////////////////

    function createMask(event) {
      let matrix = '+1 (___)___-____'; //Here is our mask
      let i = 0; //index of symbols
      let def = matrix.replace(/\D/g, ''), //to show only plus and seven
          val = this.value.replace(/\D/g, ''); //to show only plus and seven for input

      //to prevent deleting plus and seven during input
      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, a => {
        //fill the phone mask
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      //if clicked outside the mask and no sybols in input, then mask become default
      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
        }
      }
      else {
        //set cursour in the end of val
        setCursourPosition(this.value.length, this);
      }
      /////////////////////////////////////
    }

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
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
    this.phoneMask();

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