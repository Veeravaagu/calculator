// Select all calculator buttons and display screen
const buttons = document.querySelectorAll('.numberButton, .operationButton, .equalButton, .deleteButton, .decimalButton, .clearButton');
const displayScreen = document.querySelector('.display');

// Function to update the display with appropriate formatting
function getDisplay(value) {
  // Check if the value is a number
  if (!isNaN(parseFloat(value))) {
    // If it's an integer, display without decimal places
    if (value % 1 === 0) {
      displayScreen.innerText = value;
    } else {
      // If it has a decimal part, round to 3 decimal places
      displayScreen.innerText = parseFloat(value).toFixed(3);
    }
  } else {
    // Set the inner text of the display element
    displayScreen.innerText = value;
  }
}

// Initialize variables
let clickedValue;
let firstOperand = '';
let secondOperand = '';
let operators = '';
let equalsOperator = '';
let result;

// Add click event listeners to all buttons
buttons.forEach(function(button) {
  button.addEventListener('click', handleClick);
});

// Handle button clicks
function handleClick(event) {
  clickedValue = event.target.textContent;

  // Check if clicked value is a number or operator
  const isNumber = !isNaN(parseFloat(clickedValue)) || clickedValue === '.';
  const isOperator = ['=', 'Clear', 'Delete'].indexOf(clickedValue) === -1;

  // Conditions for handling different parts of the expression
  const firstOperandCondition = isNumber && operators.length === 0 && isOperator;
  const operatorsCondition = !isNumber && operators.length === 0 && isOperator;
  const secondOperandCondition = isNumber && operators.length === 1 && isOperator;

  // Update the display and operands based on conditions
  let display = firstOperandCondition ? firstOperand += clickedValue :
                operatorsCondition ? operators += clickedValue :
                secondOperandCondition ? secondOperand += clickedValue :
                null;

  display += clickedValue.slice(0, -1);
  displayScreen.innerText = display;

  // Handle delete button
  if (clickedValue === 'Delete') {
    if (secondOperand !== '') {
      secondOperand = secondOperand.slice(0, -1);
    } else if (operators !== '') {
      operators = operators.slice(0, -1);
    } else {
      firstOperand = firstOperand.slice(0, -1);
    }

    displayScreen.innerText = firstOperand + operators + secondOperand;
  }

  // Perform the calculation when '=' is clicked
  if (clickedValue === '=' && operators !== '' && firstOperand !== '' && secondOperand !== '') {
    calculate();
  }

  // Handle Clear button
  if (clickedValue === 'Clear') {
    firstOperand = '';
    secondOperand = '';
    operators = '';
    equalsOperator = '';
    displayScreen.innerText = '0';
  }

  return;
}

// Function to perform the calculation
function calculate() {
  if (firstOperand !== '' && secondOperand !== '' && operators !== '') {
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
      case '*':
        result = isMultiply(a, b);
        break;
      case '/':
        result = isDivide(a, b);
        break;
      default:
        break;
    }

    // Update the display with the result
    getDisplay(result);

    // Reset operands and operator
    firstOperand = result % 1 === 0 ? result.toString() : result.toFixed(3);
    secondOperand = '';
    operators = '';
  }
}

// Basic arithmetic operations
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
  return b !== 0 ? a / b : '404';
}
