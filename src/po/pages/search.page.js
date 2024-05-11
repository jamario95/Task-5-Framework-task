const HomePage = require('./home.page.js');
const ListSearch = require('./../components/search/list-search.component.js');

class SearchPage extends HomePage {
  constructor() {
    super();
    this.listSearch = new ListSearch();
  }
  async open() {
    await browser.url(
      'https://cloud.google.com/s/results?q=Google%20Cloud%20Platform%20Pricing%20Calculator&text=Google%20Cloud%20Platform%20Pricing%20Calculator'
    );
  }
}

module.exports = SearchPage;
