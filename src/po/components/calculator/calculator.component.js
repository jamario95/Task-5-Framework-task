class CalculatorComponents {
  textArea(textAreaName) {
    const names = {
      numberInstances: '#i6',
      numberCPUs: '#i30',
      numberMemory: '#i31',
    };
    return $(names[textAreaName]);
  }

  buttons(buttonName) {
    const names1 = {
      addGPU: '//button[@aria-label="Add GPUs"]//span[@class="eBlXUe-hywKDc"]',
      oneYear: '//input[@id="1-year"]/ancestor::div[contains(@class, "e2WL2b MYT3K pV2hx oLWDHd")]',
      share: '//span[@class="FOBRw-vQzf8d"]',
    };
    return $(names1[buttonName]);
  }
}

module.exports = CalculatorComponents;
