const CalculatorComponents = require('../components/calculator/calculator.component.js');
const HomePage = require('./home.page');

class Calculator extends HomePage {
  constructor() {
    super();
    this.calculatorComponents = new CalculatorComponents();
  }
}

module.exports = Calculator;
