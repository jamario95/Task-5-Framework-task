const { expect, browser, $ } = require('@wdio/globals');
const HomePage = require('./../po/pages/home.page');

const homePage = new HomePage();

describe('Google Cloud Navigation', () => {
  it('should open the website and use searchbar', async () => {
    await homePage.open();
    //Handle cookies
    await $('//*[@class="glue-cookie-notification-bar__accept"]').click();
    //Search icon click
    await $('div.YSM5S').click();
    //Search word insert
    await $('div.YSM5S input').setValue('Google Cloud Platform Pricing Calculator');

    await browser.keys('Enter');
  });
});
