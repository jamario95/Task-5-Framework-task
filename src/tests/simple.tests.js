const { expect, browser, $ } = require('@wdio/globals');
const HomePage = require('./../po/pages/home.page.js');
const SearchPage = require('../po/pages/search.page.js');
const SelectProduct = require('./../po/pages/selectProduct.page.js');
const Calculator = require('../po/pages/calculator.page.js');
const Summary = require('../po/pages/summary.page.js');
const standardData = require('./../po/data/standard-compute-engine.js');
const expensiveData = require('./../po/data/expensive-compute-engine.js');

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

  it('Fill the form for pricing calculator with standard data', async () => {
    //Insert the full url
    await browser.url(await browser.getUrl());
    //Set Number of instances
    await calculator.calculatorComponents.textArea('numberInstances').setValue(standardData.numberOfInstances);

    //Edit Machine type to n1-standard-8 (vCPUs: 8, RAM: 30 GB)
    await calculator.calculatorComponents.textArea('numberCPUs').setValue(standardData.numberOfCPUs);
    await calculator.calculatorComponents.textArea('numberMemory').setValue(standardData.ammountOfMemory);

    //Select Add GPUs
    await calculator.calculatorComponents.buttons('addGPU').click();

    //Select GPU Model "NVIDIA Tesla V100"
    await calculator.calculatorComponents.dropdown('gpuModel').click();
    await calculator.calculatorComponents.gpuModels('nvidiaTeslaV100').click();

    //Select Local SSD 2x325Gb
    await calculator.calculatorComponents.dropdown('localSSD').click();
    await calculator.calculatorComponents.localSSD('gb2x375').click();

    //Select Region Netherlands since Frankfurt is missing
    await calculator.calculatorComponents.dropdown('region').click();
    await calculator.calculatorComponents.region('netherlands').click();

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
    expect(instances).toHaveText(standardData.numberOfInstances);

    //Operating System check
    const operatingSystem = await summary.summaryList.values('operatingSystem').getText();
    expect(operatingSystem).toHaveText(standardData.operatingSystem);

    //Provisioning Model check
    const provisioningModel = await summary.summaryList.values('provisioningModel').getText();
    expect(provisioningModel).toHaveText(standardData.provisioningModel);

    //Machine type check
    const machineType = await summary.summaryList.values('machineType').getText();
    expect(machineType).toHaveText(standardData.machineType);

    //Add GPUs selected check
    const numberGpu = await summary.summaryList.values('numberGpu').getText();
    expect(numberGpu).toHaveText(standardData.numberGpu);

    // GPU type/model check
    const bootDiskType = await summary.summaryList.values('bootDiskType').getText();
    expect(bootDiskType).toHaveText(standardData.bootDiskType);

    //Local SSD check
    const localSsd = await summary.summaryList.values('localSsd').getText();
    expect(localSsd).toHaveText(standardData.localSsd);

    // //Datacenter location check
    const region = await summary.summaryList.values('region').getText();
    expect(region).toHaveText(standardData.region);

    //Commited usage check
    const commitedUsage = await summary.summaryList.values('commitedUsage').getText();
    expect(commitedUsage).toHaveText(standardData.commitedUsage);
  });

  it('Fill the form for pricing calculator with expensive data @smoke', async () => {
    //Insert the full url
    await calculator.open();

    //Handle cookies
    // await $('//*[@class="glue-cookie-notification-bar__accept"]').click();

    //Set Number of instances
    await calculator.calculatorComponents.textArea('numberInstances').setValue(expensiveData.numberOfInstances);

    //Edit Machine type to n1-highcpu-64, vCPUs: 64, RAM: 57.6 GB
    await calculator.calculatorComponents.textArea('numberCPUs').setValue(expensiveData.numberOfCPUs);
    // await calculator.calculatorComponents.textArea('numberMemory').setValue(expensiveData.ammountOfMemory);

    //Select Add GPUs
    await calculator.calculatorComponents.buttons('addGPU').click();

    //Select GPU Model "NVIDIA Tesla T4
    await calculator.calculatorComponents.dropdown('gpuModel').click();
    await calculator.calculatorComponents.gpuModels('nvidiaTeslaT4').click();

    //Select Local SSD 2x325Gb
    await calculator.calculatorComponents.dropdown('localSSD').click();
    await calculator.calculatorComponents.localSSD('gb6x375').click();

    //Select Region Frankfurt
    await calculator.calculatorComponents.dropdown('region').click();
    await calculator.calculatorComponents.region('frankfurt').click();

    //Commited use dicount options : 3 year
    await calculator.calculatorComponents.buttons('threeYears').click();

    //Delay for system to calculate correct $
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //Click Shere
    await calculator.calculatorComponents.buttons('share').click();

    //Wait for Shere window to appear
    await calculator.calculatorComponents.shareWindow.waitForDisplayed({ timeout: 2000 });
  });

  //Check if values are the same as on summary
  it('Should compare results @smoke', async () => {
    //Get href for Summary
    const summaryHref = await $('//*[@class="tltOzc MExMre rP2xkc jl2ntd"]').getAttribute('href');

    //Go to summary page
    await browser.url('https://cloud.google.com' + summaryHref);

    //Instances check
    const instances = await summary.summaryList.values('instances').getText();
    expect(instances).toHaveText(expensiveData.numberOfInstances);

    //Operating System check
    const operatingSystem = await summary.summaryList.values('operatingSystem').getText();
    expect(operatingSystem).toHaveText(expensiveData.operatingSystem);

    //Provisioning Model check
    const provisioningModel = await summary.summaryList.values('provisioningModel').getText();
    expect(provisioningModel).toHaveText(expensiveData.provisioningModel);

    //Machine type check
    const machineType = await summary.summaryList.values('machineType').getText();
    expect(machineType).toHaveText(expensiveData.machineType);

    //Add GPUs selected check
    const numberGpu = await summary.summaryList.values('numberGpu').getText();
    expect(numberGpu).toHaveText(expensiveData.numberGpu);

    // GPU type/model check
    const bootDiskType = await summary.summaryList.values('bootDiskType').getText();
    expect(bootDiskType).toHaveText(expensiveData.bootDiskType);

    //Local SSD check
    const localSsd = await summary.summaryList.values('localSsd').getText();
    expect(localSsd).toHaveText(expensiveData.localSsd);

    // //Datacenter location check
    const region = await summary.summaryList.values('region').getText();
    expect(region).toHaveText(expensiveData.region);

    //Commited usage check
    const commitedUsage = await summary.summaryList.values('commitedUsage').getText();
    expect(commitedUsage).toHaveText(expensiveData.commitedUsage);
  });
});
