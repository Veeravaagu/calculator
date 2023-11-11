const buttons = document.querySelectorAll('.numberButton, .operationButton, .equalButton, .deleteButton, .decimalButton, .clearButton');
const displayScreen = document.querySelector('.display');

function getDisplay(value) {

  if (!isNaN(parseFloat(value))) {

    if (value % 1 === 0) {
      displayScreen.innerText = value;
    } else {

      displayScreen.innerText = parseFloat(value).toFixed(3);
    }
  } else {

    displayScreen.innerText = value;
  }

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


  const isNumber = !isNaN(parseFloat(clickedValue)) || clickedValue === '.';


  const isOperator = ['=', 'Clear', 'Delete'].indexOf(clickedValue) === -1;

  const firstOperandCondition = isNumber && operators.length === 0 && isOperator;
  
  const operatorsCondition = !isNumber && operators.length === 0 && isOperator;

  const secondOperandCondition = isNumber && operators.length === 1 && isOperator;
  

  let display = firstOperandCondition ?  firstOperand += clickedValue :
                operatorsCondition ? operators += clickedValue :
                secondOperandCondition ? secondOperand += clickedValue :
                null;

               

                display += clickedValue.slice(0,-1);
                displayScreen.innerText = display;
                console.log(display,`display`);


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

                     



    if (clickedValue === '=' && operators !== '' && firstOperand !== '' && secondOperand !== '') {
      calculate();
    }

    if (clickedValue === 'Clear'){

         
          firstOperand = '';
          secondOperand = '';
          operators = '';
          equalsOperator = '';

          displayScreen.innerText = '0';}

    



  
    return;



  }
  
  
  function calculate() {
    if (firstOperand !== '' && secondOperand !== '' && operators !== '') {

    const a = parseFloat(firstOperand);

    const b = parseFloat(secondOperand);

  

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
  

    getDisplay(result);
  

    firstOperand = result % 1 === 0 ? result.toString() : result.toFixed(3);

    secondOperand = '';

    operators = '';

  }
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

    
    return b !== 0 ? a / b : '404';
  }










