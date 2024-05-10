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
    const names = {
      addGPU: '//button[@aria-label="Add GPUs"]//span[@class="eBlXUe-hywKDc"]',
      oneYear: '//input[@id="1-year"]/ancestor::div[contains(@class, "e2WL2b MYT3K pV2hx oLWDHd")]',
      share: '//span[@class="FOBRw-vQzf8d"]',
    };
    return $(names[buttonName]);
  }

  dropdown(dropdownName) {
    const names = {
      gpuModel: '//span[text()="GPU Model"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]',
      localSSD: '//span[text()="Local SSD"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]',
      region: '//span[text()="Region"]/ancestor::div[contains(@class, "O1htCb-H9tDt PPUDSe t8xIwc")]',
    };
    return $(names[dropdownName]);
  }
  gpuModels(gpuModelsName) {
    const names = {
      nvidiaTeslaV100: 'li[data-value="nvidia-tesla-v100"]',
    };
    return $(names[gpuModelsName]);
  }
  localSSD(localSSDName) {
    const names = {
      gb2x375: 'li[data-value="2"]',
    };
    return $$(names[localSSDName])[1];
  }
  region(regionName) {
    const names = {
      netherlands: 'li[data-value="europe-west4"]',
    };
    return $(names[regionName]);
  }
  get shareWindow() {
    return $('//*[@class="bwApif-cnG4Wd"]');
  }
}

module.exports = CalculatorComponents;
