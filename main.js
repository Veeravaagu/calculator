const buttons = document.querySelectorAll('.numberButton, .operationButton, .equalButton, .deleteButton, .decimalButton, .clearButton');
const displayScreen = document.querySelector('.display');

function getDisplay(value) {
  // Set the inner text of the display element
  displayScreen.innerText = value;
}

let clickedValue;
let firstOperand = '';
let secondOperand = '';
let operators = '';
let equalsOperator = '';
let result;

buttons.forEach(function(button) {
  button.addEventListener('click', handleClick);
});

function handleClick(event) {
  clickedValue = event.target.textContent;

  // Should return true if it's a number.
  const isNumber = !isNaN(parseFloat(clickedValue));

  // Should return true if it's not '=', 'Clear', or 'Delete'.
  const isOperator = clickedValue !== '=' && clickedValue !== 'Clear' && clickedValue !== 'Delete';

  const firstOperandCondition = isNumber && operators.length === 0;
  const operatorsCondition = !isNumber && operators.length === 0 && isOperator;
  const secondOperandCondition = isNumber && operators.length === 1 && equalsOperator === '';

  let display = firstOperandCondition ?  firstOperand += clickedValue :
                operatorsCondition ? operators += clickedValue :
                secondOperand += clickedValue;

  let updatedDisplay = (operators === '') ? (display += clickedValue).slice(0,-1) :
                      (secondOperand === '') ? `${parseFloat(firstOperand)}${operators}` :
                      `${parseFloat(firstOperand)}${operators}${parseFloat(secondOperand)}`;

  getDisplay(updatedDisplay)

    // Perform the calculation when '=' is clicked
    if (clickedValue === '=' && operators !== '' && firstOperand !== '' && secondOperand !== '') {
      calculate();
    }
  
    return;
  }
  
  
  function calculate() {
    // Convert operands to numbers
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);
  
    // Perform the calculation based on the operator
    switch (operators) {
      case '+':
        result = isAdd(a, b);
        break;
      case '-':
        result = isSubtract(a, b);
        break;
      case 'x':
        result = isMultiply(a, b);
        break;
      case '/':
        result = isDivide(a, b);
        break;
        case 'Clear':
        result = isClear();
        break;
        case 'Delete':
        result = isDelete(a, b);
        break;
      default:

        break;
    }
  
    // Update the display with the result
    getDisplay(result);
  
    // Reset operands and operator
    firstOperand = result.toString();
    secondOperand = '';
    operators = '';
  }
  
  function isAdd(a, b) {
    return a + b;
  }
  
  function isSubtract(a, b) {
    return a - b;
  }
  
  function isMultiply(a, b) {
    return a * b;
  }
  
  function isDivide(a, b) {
    // Handle division by zero
    return b !== 0 ? a / b : 'Error';
  }
  function isClear() {
    firstOperand = '';
    secondOperand = '';
    operators = '';
    equalsOperator = '';
    return
  }
  function isDelete(a, b) {
    return ;
  }
  






