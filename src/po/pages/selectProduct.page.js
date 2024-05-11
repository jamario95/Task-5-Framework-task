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

  async addProduct() {
    return this.products.openProductsList.click();
  }
  async waitWindowDisplay() {
    return this.products.productsWindow.waitForDisplayed({ timeout: 2000 });
  }
  async selectProduct() {
    return this.products.chooseProduct.click();
  }
}

module.exports = SelectProduct;
