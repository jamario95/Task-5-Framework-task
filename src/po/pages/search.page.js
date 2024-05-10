const HomePage = require('./home.page.js');
const ListSearch = require('./../components/search/list-search.component.js');

class SearchPage extends HomePage {
  constructor() {
    super();
    this.listSearch = new ListSearch();
  }
}

module.exports = SearchPage;
