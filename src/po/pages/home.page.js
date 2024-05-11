const NavigationMenu = require('./../components/common/navigationmenu.component.js');
class HomePage {
  constructor() {
    this.navigationMenu = new NavigationMenu();
  }

  async open() {
    await browser.url('https://cloud.google.com/');
    try {
      //Handle cookies
      await $('//*[@class="glue-cookie-notification-bar__accept"]').click();
    } catch (error) {}
  }
  async clickSearchIcon() {
    return this.navigationMenu.item('search').click();
  }
  async enterSearchText() {
    return this.navigationMenu.searchTab.setValue('Google Cloud Platform Pricing Calculator');
  }
  async clickEnter() {
    return browser.keys('Enter');
  }
}

module.exports = HomePage;
