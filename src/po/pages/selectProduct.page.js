const HomePage = require('./home.page');
const Products = require('./../components/products/products.component.js');

class SelectProduct extends HomePage {
  constructor() {
    super();
    this.products = new Products();
  }
  async open() {
    await browser.url('https://cloud.google.com/products/calculator?hl=pl');
  }
}

module.exports = SelectProduct;
