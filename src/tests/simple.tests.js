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
    //Search icon click
    await homePage.clickSearchIcon();
    //Search word insert
    await homePage.enterSearchText();

    await homePage.clickEnter();
  });

  it('Should click the correct option from seach list', async () => {
    //Select 1st elemet from search
    await searchPage.clickCalculatorOption();
  });

  it('Create pricing calculator', async () => {
    //Click Add button
    await selectProduct.addProduct();
    //Wait for pop-up to open
    await selectProduct.waitWindowDisplay();
    //Select compute
    await selectProduct.selectProduct();
    //Wait for full url
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  it('Fill the form for pricing calculator with standard data', async () => {
    //Insert the full url
    await browser.url(await browser.getUrl());
    //Set Number of instances
    await calculator.inputInstanceNumber(standardData.numberOfInstances);

    //Edit Machine type to n1-standard-8 (vCPUs: 8, RAM: 30 GB)
    await calculator.inputCPUNumber(standardData.numberOfCPUs);
    await calculator.inputMemoryNumber(standardData.ammountOfMemory);

    //Select Add GPUs
    await calculator.selectAddGPU();

    //Select GPU Model "NVIDIA Tesla V100"
    await calculator.selectGPUModel('nvidiaTeslaV100');

    //Select Local SSD 2x325Gb
    await calculator.selectLocalSSD('gb2x375');

    //Select Region Netherlands since Frankfurt is missing
    await calculator.selectRegion('netherlands');

    //Commited use dicount options : 1 year
    await calculator.selectButton('oneYear');

    //Delay for system to calculate correct $
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //Click Shere
    await calculator.selectShare();

    //Wait for Shere window to appear
    await calculator.waitWindowDisplay();
  });

  //Check if values from Point 6 are the same as on summary
  it('Should compare results', async () => {
    //Get href for Summary
    const summaryHref = await $('//*[@class="tltOzc MExMre rP2xkc jl2ntd"]').getAttribute('href');

    //Go to summary page
    await browser.url('https://cloud.google.com' + summaryHref);

    //Instances check
    const instances = await summary.getNumberofInstances();
    expect(instances).toHaveText(standardData.numberOfInstances);

    //Operating System check
    const operatingSystem = await summary.getOperatingSystem();
    expect(operatingSystem).toHaveText(standardData.operatingSystem);

    //Provisioning Model check
    const provisioningModel = await summary.getProvisioningModel();
    expect(provisioningModel).toHaveText(standardData.provisioningModel);

    //Machine type check
    const machineType = await summary.getMachineType();
    expect(machineType).toHaveText(standardData.machineType);

    //Add GPUs selected check
    const numberGpu = await summary.getNumberOfGpu();
    expect(numberGpu).toHaveText(standardData.numberGpu);

    // GPU type/model check
    const bootDiskType = await summary.getBootDiskType();
    expect(bootDiskType).toHaveText(standardData.bootDiskType);

    //Local SSD check
    const localSsd = await summary.getLocalSsd();
    expect(localSsd).toHaveText(standardData.localSsd);

    // //Datacenter location check
    const region = await summary.getRegion();
    expect(region).toHaveText(standardData.region);

    //Commited usage check
    const commitedUsage = await summary.getCommitedUsage();
    expect(commitedUsage).toHaveText(standardData.commitedUsage);
  });

  it('Fill the form for pricing calculator with expensive data @smoke', async () => {
    //Insert the full url
    await calculator.open();

    //Set Number of instances
    await calculator.inputInstanceNumber(expensiveData.numberOfInstances);

    //Edit Machine type to n1-highcpu-64, vCPUs: 64, RAM: 57.6 GB
    await calculator.inputCPUNumber(expensiveData.numberOfCPUs);

    //Select Add GPUs
    await calculator.selectAddGPU();

    //Select GPU Model "NVIDIA Tesla T4
    await calculator.selectGPUModel('nvidiaTeslaT4');

    //Select Local SSD 2x325Gb
    await calculator.selectLocalSSD('gb6x375');

    //Select Region Frankfurt
    await calculator.selectRegion('frankfurt');

    //Commited use dicount options : 3 year
    await calculator.selectButton('threeYears');

    //Delay for system to calculate correct $
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //Click Shere
    await calculator.selectShare();

    //Wait for Shere window to appear
    await calculator.waitWindowDisplay();
  });

  //Check if values are the same as on summary
  it('Should compare results @smoke', async () => {
    //Get href for Summary
    const summaryHref = await $('//*[@class="tltOzc MExMre rP2xkc jl2ntd"]').getAttribute('href');

    //Go to summary page
    await browser.url('https://cloud.google.com' + summaryHref);

    //Instances check
    //Instances check
    const instances = await summary.getNumberofInstances();
    expect(instances).toHaveText(expensiveData.numberOfInstances);

    //Operating System check
    const operatingSystem = await summary.getOperatingSystem();
    expect(operatingSystem).toHaveText(expensiveData.operatingSystem);

    //Provisioning Model check
    const provisioningModel = await summary.getProvisioningModel();
    expect(provisioningModel).toHaveText(expensiveData.provisioningModel);

    //Machine type check
    const machineType = await summary.getMachineType();
    expect(machineType).toHaveText(expensiveData.machineType);

    //Add GPUs selected check
    const numberGpu = await summary.getNumberOfGpu();
    expect(numberGpu).toHaveText(expensiveData.numberGpu);

    // GPU type/model check
    const bootDiskType = await summary.getBootDiskType();
    expect(bootDiskType).toHaveText(expensiveData.bootDiskType);

    //Local SSD check
    const localSsd = await summary.getLocalSsd();
    expect(localSsd).toHaveText(expensiveData.localSsd);

    // //Datacenter location check
    const region = await summary.getRegion();
    expect(region).toHaveText(expensiveData.region);

    //Commited usage check
    const commitedUsage = await summary.getCommitedUsage();
    expect(commitedUsage).toHaveText(expensiveData.commitedUsage);
  });
});
