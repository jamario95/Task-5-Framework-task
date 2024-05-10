const { expect, browser, $ } = require('@wdio/globals');
const HomePage = require('./../po/pages/home.page.js');
const SearchPage = require('../po/pages/search.page.js');
const SelectProduct = require('./../po/pages/selectProduct.page.js');
const Calculator = require('../po/pages/calculator.page.js');

const homePage = new HomePage();
const searchPage = new SearchPage();
const selectProduct = new SelectProduct();
const calculator = new Calculator();

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
    await selectProduct.products.openProductsList.click();
    //Wait for pop-up to open
    await selectProduct.products.productsWindow.waitForDisplayed({ timeout: 2000 });
    //Select compute
    await selectProduct.products.chooseProduct.click();
    //Wait for full url
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  it('Fill the form for pricing calculator', async () => {
    //Insert the full url
    await browser.url(await browser.getUrl());
    //Set Number of instances
    await calculator.calculatorComponents.textArea('numberInstances').setValue('4');

    //Edit Machine type to n1-standard-8 (vCPUs: 8, RAM: 30 GB)
    await calculator.calculatorComponents.textArea('numberCPUs').setValue('8');
    await calculator.calculatorComponents.textArea('numberMemory').setValue('30');

    //Select Add GPUs
    await $("//button[@aria-label='Add GPUs']//span[@class='eBlXUe-hywKDc']").click();

    //Select GPU Model "NVIDIA Tesla V100"
    await $('//span[text()="GPU Model"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').click();
    await $('li[data-value="nvidia-tesla-v100"]').click();

    //Select Local SSD 2x325Gb
    await $('//span[text()="Local SSD"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').click();
    await $$('li[data-value="2"]')[1].click();

    //Select Region Netherlands since Frankfurt is missing
    await $('//span[text()="Region"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]').click();
    await $('li[data-value="europe-west4"]').click();

    //Commited use dicount options : 1 year
    await $('//input[@id="1-year"]/ancestor::div[contains(@class, "e2WL2b MYT3K pV2hx oLWDHd")]').click();

    // Check the price from calculator on bottom right ???

    //Delay for system to calculate correct $
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //Click Shere
    await $('//span[@class="FOBRw-vQzf8d"]').click();

    //Wait for Shere window to appear
    await $('//*[@class="bwApif-cnG4Wd"]').waitForDisplayed({ timeout: 2000 });
  });
});
