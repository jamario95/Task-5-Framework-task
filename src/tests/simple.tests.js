const { expect, browser, $ } = require('@wdio/globals');
const HomePage = require('./../po/pages/home.page.js');
const SearchPage = require('../po/pages/search.page.js');
const SelectProduct = require('./../po/pages/selectProduct.page.js');
const Calculator = require('../po/pages/calculator.page.js');
const Summary = require('../po/pages/summary.page.js');

const homePage = new HomePage();
const searchPage = new SearchPage();
const selectProduct = new SelectProduct();
const calculator = new Calculator();
const summary = new Summary();

describe('Google Cloud Navigation', () => {
  it('should open the website and use searchbar', async () => {
    await homePage.open();
    //Handle cookies
    await $('//*[@class="glue-cookie-notification-bar__accept"]').click();
    //Search icon click
    await homePage.navigationMenu.item('search').click();
    //Search word insert
    await homePage.navigationMenu.searchTab.setValue('Google Cloud Platform Pricing Calculator');

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
    await calculator.calculatorComponents.buttons('addGPU').click();

    //Select GPU Model "NVIDIA Tesla V100"
    await calculator.calculatorComponents.dropdown('gpuModel').click();
    await calculator.calculatorComponents.gpuModels('nvidiaTeslaV100').click();
    // await $('li[data-value="nvidia-tesla-v100"]').click();

    //Select Local SSD 2x325Gb
    await calculator.calculatorComponents.dropdown('localSSD').click();
    await calculator.calculatorComponents.localSSD('gb2x375').click();
    // await $$('li[data-value="2"]')[1].click();

    //Select Region Netherlands since Frankfurt is missing
    await calculator.calculatorComponents.dropdown('region').click();
    await calculator.calculatorComponents.region('netherlands').click();

    // await $('li[data-value="europe-west4"]').click();

    //Commited use dicount options : 1 year
    await calculator.calculatorComponents.buttons('oneYear').click();

    // Check the price from calculator on bottom right ???

    //Delay for system to calculate correct $
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //Click Shere
    await calculator.calculatorComponents.buttons('share').click();

    //Wait for Shere window to appear
    await calculator.calculatorComponents.shareWindow.waitForDisplayed({ timeout: 2000 });
  });

  //Check if values from Point 6 are the same as on summary
  it('Should compare results', async () => {
    //Get href for Summary
    const summaryHref = await $('//*[@class="tltOzc MExMre rP2xkc jl2ntd"]').getAttribute('href');

    //Go to summary page
    await browser.url('https://cloud.google.com' + summaryHref);

    //Instances check
    const instances = await summary.summaryList.values('instances').getText();
    expect(instances).toHaveText('4');

    //Operating System check
    const operatingSystem = await summary.summaryList.values('operatingSystem').getText();
    expect(operatingSystem).toHaveText('Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)');

    //Provisioning Model check
    const provisioningModel = await summary.summaryList.values('provisioningModel').getText();
    expect(provisioningModel).toHaveText('Regular');

    //Machine type check
    const machineType = await summary.summaryList.values('machineType').getText();
    expect(machineType).toHaveText('n1-standard-8');

    //Add GPUs selected check
    const numberGpu = await summary.summaryList.values('numberGpu').getText();
    expect(numberGpu).toHaveText('1');

    // GPU type/model check
    const bootDiskType = await summary.summaryList.values('bootDiskType').getText();
    expect(bootDiskType).toHaveText('NVIDIA Tesla V100');

    //Local SSD check
    const localSsd = await summary.summaryList.values('localSsd').getText();
    expect(localSsd).toHaveText('2x375 GB');

    // //Datacenter location check
    const region = await summary.summaryList.values('region').getText();
    expect(region).toHaveText('Netherlands (europe-west4)');

    //Commited usage check
    const commitedUsage = await summary.summaryList.values('commitedUsage').getText();
    expect(commitedUsage).toHaveText('1 year');
  });
});
