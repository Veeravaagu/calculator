let buttons = document.querySelectorAll('.numberButton, .operationButton, .equalButton, .deleteButton, .decimalButton, .clearButton');
let clickedValue;
let firstOperand = '';
let secondOperand = '';
let operators = '';
let equalsOperator = '';

  buttons.forEach(function(button) {
    button.addEventListener('click', handleClick);
  });

  function handleClick(event)
   {
clickedValue = event.target.textContent;

const firstOperandCondition = (isNaN(parseFloat(clickedValue)) === false && operators.length === 0);

const operatorsCondition = ((isNaN(parseFloat(clickedValue)) === true && operators.length < 1) && clickedValue !== ('=' || 'Clear' || 'Delete'));

const secondOperandCondition = ((isNaN(parseFloat(clickedValue)) === false && operators.length === 1) && equalsOperator === '') ;

let display = firstOperandCondition ?  firstOperand += clickedValue :
              operatorsCondition ? operators += clickedValue :
              secondOperand += clickedValue;



if (operators === ''){
  console.log((display += clickedValue).slice(0,-1));
}

else if (secondOperand === '') {
  console.log(`${parseFloat(firstOperand)}${operators}`);
} else{
  console.log(`${parseFloat(firstOperand)}${operators}${parseFloat(secondOperand)}` );
}
              
             
// let result = parseFloat(firstOperand) + operators + parseFloat(secondOperand);

// console.log(result);






  
    return
  }



  // const numberArr = console.table(Array.from(buttons)).map((element) => console.table(element.innerText))
  // console.log(numberArr);

    
  
  




