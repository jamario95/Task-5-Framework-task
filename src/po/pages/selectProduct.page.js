const HomePage = require('./home.page');
const Products = require('./../components/products/products.component.js');

class SelectProduct extends HomePage {
  constructor() {
    super();
    this.products = new Products();
  }
}

module.exports = SelectProduct;
