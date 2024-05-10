const SummaryList = require('../components/summary/summarylist.component.js');
const HomePage = require('./home.page');

class Summary extends HomePage {
  constructor() {
    super();
    this.summaryList = new SummaryList();
  }
}

module.exports = Summary;
