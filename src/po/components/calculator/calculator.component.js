class CalculatorComponents {


    textArea(textAreaName) {
        const names = {
          numberInstances: '#i6',
          numberCPUs:'#i30',
          numberMemory:'#i31',



        };
        return $(names[textAreaName]);
      }
}

module.exports = CalculatorComponents;
