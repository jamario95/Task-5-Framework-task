class SummaryList {
  values(valueName) {
    const names = {
      instances: '//span[text()="Number of Instances"]/following-sibling::span[1]',
      operatingSystem: '//span[text()="Operating System / Software"]/following-sibling::span[1]',
      provisioningModel: '//span[text()="Provisioning Model"]/following-sibling::span[1]',
      machineType: '//span[text()="Machine type"]/following-sibling::span[1]',
      numberGpu: '//span[text()="Number of GPUs"]/following-sibling::span[1]',
      bootDiskType: '//span[text()="GPU Model"]/following-sibling::span[1]',
      localSsd: '//span[text()="Local SSD"]/following-sibling::span[1]',
      region: '//span[text()="Region"]/following-sibling::span[1]',
      commitedUsage: '//span[text()="Committed use discount options"]/following-sibling::span[1]',
    };
    return $(names[valueName]);
  }
}

module.exports = SummaryList;
