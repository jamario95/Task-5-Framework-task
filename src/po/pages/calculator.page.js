const CalculatorComponents = require('../components/calculator/calculator.component.js');
const HomePage = require('./home.page');

class Calculator extends HomePage {
  constructor() {
    super();
    this.calculatorComponents = new CalculatorComponents();
  }
  async open() {
    await browser.url(
      'https://cloud.google.com/products/calculator?hl=pl&dl=CiQxMjA3ZmUyZi0yM2RjLTQzZDEtYThjYy0wNmYyYjQzNGU0MzQQCBokMEY0MDFERUUtMDQxRi00ODFDLTg4N0YtQjk1NEFFNzZDMDVB'
    );
    try {
      //Handle cookies
      await $('//*[@class="glue-cookie-notification-bar__accept"]').click();
    } catch (error) {}
  }
  async inputInstanceNumber(numberOfInstances) {
    return this.calculatorComponents.textArea('numberInstances').setValue(numberOfInstances);
  }
  async inputCPUNumber(numberOfCPUs) {
    return this.calculatorComponents.textArea('numberCPUs').setValue(numberOfCPUs);
  }
  async inputMemoryNumber(ammountOfMemory) {
    return this.calculatorComponents.textArea('numberMemory').setValue(ammountOfMemory);
  }
  async selectAddGPU() {
    return this.calculatorComponents.buttons('addGPU').click();
  }
  async selectGPUModel(gpuModel) {
    this.calculatorComponents.dropdown('gpuModel').click();
    this.calculatorComponents.gpuModels(gpuModel).click();
  }

  async selectLocalSSD(localSSD) {
    this.calculatorComponents.dropdown('localSSD').click();
    this.calculatorComponents.localSSD(localSSD).click();
  }
  async selectRegion(region) {
    this.calculatorComponents.dropdown('region').click();
    return this.calculatorComponents.region(region).click();
  }
  async selectButton(year) {
    return this.calculatorComponents.buttons(year).click();
  }

  async selectShare(){
  return this.calculatorComponents.buttons('share').click()
  }
  async waitWindowDisplay() {
    return this.calculatorComponents.shareWindow.waitForDisplayed({ timeout: 2000 });
  }

}

module.exports = Calculator;
