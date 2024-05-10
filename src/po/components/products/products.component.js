class Products {
  get openProductsList() {
    return $('//span[text()="Add to estimate"]');
  }
  get productsWindow() {
    return $('div.bwApif-wzTsW > div > div');
  }
  get chooseProduct() {
    return $('//*[@class="honxjf"] [text()="Compute Engine"]');
  }
}

module.exports = Products;
