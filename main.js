let buttons = document.querySelectorAll('.numberButton, .operationButton, .equalButton, .deleteButton, .decimalButton, .clearButton');
let clickedValue;
let firstOperand = ''
let secondOperand = ''
let operators = ''

  buttons.forEach(function(button) {
    button.addEventListener('click', handleClick);
  });

  function handleClick(event)
   {
    function result () {
    // total = `${parseFloat(firstOperand)} + ${operators} + ${parseFloat(secondOperand)}` 
    
    clickedValue = event.target.textContent;
    // const operand = (clickedValue - clickedValue);
    // if (isNaN(parseFloat(clickedValue)) === false){
    //   firstOperand += clickedValue;
    //   console.log(firstOperand);
    // }
    // // else if (Number.isNaN(operand) !== true && operators !== true){
    // //   secondOperand += clickedValue;
    // //   console.log(+secondOperand);
    // // }
    // else if (isNaN(parseFloat(clickedValue)) === true && operators.length < 1){
    //   operators += clickedValue;
    //   console.log(operators);
    // }
const firstOperandCondition = (isNaN(parseFloat(clickedValue)) === false && operators.length === 0);

const operatorsCondition = ((isNaN(parseFloat(clickedValue)) === true && operators.length < 1) && clickedValue !== ('=' || 'Clear' || 'Delete'));

const secondOperandCondition = (isNaN(parseFloat(clickedValue)) === false && operators.length === 1);

// console.log(firstOperandCondition);

const display = firstOperandCondition ?  firstOperand += clickedValue :
              operatorsCondition ? operators += clickedValue :
              secondOperand += clickedValue;

              console.log(display);


              // (isNaN(parseFloat(clickedValue)) === false && operators.length === 1) ? 

              console.log(`${parseFloat(firstOperand)}${operators}${parseFloat(secondOperand)}` );






  }
    return result()
  }



  // const numberArr = console.table(Array.from(buttons)).map((element) => console.table(element.innerText))
  // console.log(numberArr);

    
  
  




