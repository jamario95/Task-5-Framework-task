const { expect, browser, $ } = require('@wdio/globals');
const HomePage = require('./../po/pages/home.page.js');
const SearchPage = require('../po/pages/search.page.js');
const SelectProduct = require('./../po/pages/selectProduct.page.js')



const homePage = new HomePage();
const searchPage = new SearchPage();
const selectProduct = new SelectProduct()

describe('Google Cloud Navigation', () => {
  it('should open the website and use searchbar', async () => {
    await homePage.open();
    //Handle cookies
    await $('//*[@class="glue-cookie-notification-bar__accept"]').click();
    //Search icon click
    await homePage.navigationMenu.item('search').click();
    //Search word insert
    await homePage.navigationMenu.searchTab.setValue('Google Cloud Platform Pricing Calculator');
    // await $('div.YSM5S input').setValue('Google Cloud Platform Pricing Calculator');

    await browser.keys('Enter');
  });

  it('Should click the correct option from seach list', async () => {
    //Select 1st elemet from search
    await searchPage.listSearch.SearchResult.click();
  });

  it('Create pricing calculator', async () => {
    //Click Add button
    await selectProduct.products.openProductsList.click()
    //Wait for pop-up to open
    await selectProduct.products.productsWindow.waitForDisplayed({ timeout: 2000 });
    //Select compute
    await selectProduct.products.chooseProduct.click();
    //Wait for full url
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });
});
