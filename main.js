let buttons = document.querySelectorAll('.numberButton, .operationButton, .equalButton, .deleteButton, .decimalButton, .clearButton');
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

  // console.log(updatedDisplay);

  getDisplay(updatedDisplay)

  return;
}

    
  
  




