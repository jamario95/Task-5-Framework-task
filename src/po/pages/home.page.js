const NavigationMenu = require('./../components/common/navigationmenu.component.js')
class HomePage {
  constructor() {
    this.navigationMenu = new NavigationMenu();
  }

  async open() {
    await browser.url('https://cloud.google.com/');
  }
}

module.exports = HomePage;
