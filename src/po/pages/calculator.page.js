const CalculatorComponents = require('../components/calculator/calculator.component.js');
const HomePage = require('./home.page');

class Calculator extends HomePage {
  constructor() {
    super();
    this.calculatorComponents = new CalculatorComponents();
  }
  async open() {
    await browser.url(
      'https://cloud.google.com/products/calculator?hl=pl&dl=CiQxMjA3ZmUyZi0yM2RjLTQzZDEtYThjYy0wNmYyYjQzNGU0MzQQCBokMEY0MDFERUUtMDQxRi00ODFDLTg4N0YtQjk1NEFFNzZDMDVB'
    );
    try{
      //Handle cookies
    await $('//*[@class="glue-cookie-notification-bar__accept"]').click();
    }catch(error){

    }

  }
  async addProduct() {
    // return this.navigationMenu.item('search').click();
  }
}

module.exports = Calculator;
