const buttons = document.querySelectorAll('.numberButton, .operationButton, .equalButton, .deleteButton, .decimalButton, .clearButton');
const displayScreen = document.querySelector('.display');

function getDisplay(value) {
  displayScreen.innerText = value;
}

let clickedValue;
let firstOperand = '';
let secondOperand = '';
let operators = '';
let equalsOperator = '';
let result;

// Function to count decimals in an operand
function countDecimals(operand) {
  return (operand.match(/\./g) || []).length;
}

buttons.forEach(function (button) {
  button.addEventListener('click', handleClick);
});

function handleClick(event) {
  clickedValue = event.target.textContent;

  const isNumber = !isNaN(parseFloat(clickedValue));
  const isOperator = clickedValue !== '=' && clickedValue !== 'Clear' && clickedValue !== 'Delete' && clickedValue !== '.';
  const isDecimal = clickedValue === '.';

  const firstOperandCondition = isNumber && operators.length === 0 && equalsOperator === '';
  const operatorsCondition = !isNumber && operators.length === 0 && isOperator && equalsOperator === '';
  const secondOperandCondition = isNumber && operators.length === 1 && equalsOperator === '' && !secondOperand.includes('.') && !isDecimal;

  let display = firstOperandCondition ? (firstOperand.includes('.') && isDecimal ? firstOperand : firstOperand += clickedValue) :
    operatorsCondition ? operators += clickedValue :
      (secondOperand.includes('.') && isDecimal ? secondOperand : secondOperand += clickedValue);

  // Prevent repeating the decimal more than twice in the same operand
  if (isDecimal) {
    const decimalCountFirstOperand = countDecimals(firstOperand);
    const decimalCountSecondOperand = countDecimals(secondOperand);

    if (firstOperand !== '' && decimalCountFirstOperand >= 2) {
      return;
    }

    if (secondOperand !== '' && decimalCountSecondOperand >= 2) {
      return;
    }
  }

  let updatedDisplay = (operators === '') ? (display += clickedValue).slice(0, -1) :
    (secondOperand === '') ? `${parseFloat(firstOperand)}${operators}` :
      `${parseFloat(firstOperand)}${operators}${parseFloat(secondOperand)}`;

  getDisplay(updatedDisplay);

  if (clickedValue === '=' && operators !== '' && firstOperand !== '' && secondOperand !== '') {
    calculate();
    equalsOperator = '=';
  } else if (clickedValue === 'Delete') {
    handleDelete();
  } else if (clickedValue === 'Clear') {
    isClear();
  }

  return;
}

function calculate() {
  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);

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
    default:
      break;
  }

  getDisplay(result);

  firstOperand = result.toString();
  secondOperand = '';
  operators = '';
}

function handleDelete() {
  if (firstOperand !== '' && secondOperand !== '' && operators !== '' && equalsOperator === '') {
    secondOperand = removeLastCharacter(secondOperand);
  } else if (operators !== '' && equalsOperator === '') {
    operators = '';
  } else if (firstOperand !== '' && equalsOperator === '') {
    // Check if deleting the last character would result in an empty string
    firstOperand = (firstOperand.length > 1) ? removeLastCharacter(firstOperand) : '0';
  } else if (firstOperand === '' && secondOperand === '' && operators === '') {
    // Display 0 when attempting to delete from an empty input
    getDisplay('0');
  }

  getDisplay(getUpdatedExpression());
}

function removeLastCharacter(operand) {
  return operand.slice(0, -1);
}

function isClear() {
  firstOperand = '';
  secondOperand = '';
  operators = '';
  equalsOperator = '';
  getDisplay('0');
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
  return b !== 0 ? a / b : 'Error';
}

function getUpdatedExpression() {
  return secondOperand !== '' ? `${parseFloat(firstOperand)}${operators}${parseFloat(secondOperand)}` :
    operators !== '' ? `${parseFloat(firstOperand)}${operators}` :
      firstOperand;
}









