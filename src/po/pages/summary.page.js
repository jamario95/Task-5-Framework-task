const SummaryList = require('../components/summary/summarylist.component.js');
const HomePage = require('./home.page');

class Summary extends HomePage {
  constructor() {
    super();
    this.summaryList = new SummaryList();
  }

  async getNumberofInstances(){
    return this.summaryList.values('instances').getText();
  }
  async getOperatingSystem(){
    return this.summaryList.values('operatingSystem').getText();
  }
  async getProvisioningModel(){
    return this.summaryList.values('provisioningModel').getText();
  }
  async getMachineType(){
    return this.summaryList.values('machineType').getText();
  }
  async getNumberOfGpu(){
    return this.summaryList.values('numberGpu').getText();
  }
  async getBootDiskType(){
    return this.summaryList.values('bootDiskType').getText();
  }
  async getLocalSsd(){
    return this.summaryList.values('localSsd').getText();
  }
  async getRegion(){
    return this.summaryList.values('region').getText();
  }
  async getCommitedUsage(){
    return this.summaryList.values('commitedUsage').getText();
  }
}

module.exports = Summary;
