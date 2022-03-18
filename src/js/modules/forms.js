export default class Forms {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);

    this.messge = {
      loading: "loading...",
      success: "success!",
      error: "ERROR",
    };
    this.path = './assets/question.php';
  }


  async fetchData(url, data) {
    let result = fetch(url, {
      method: 'POST',
      body: data,
    });

    return (await result).text();
  }
}