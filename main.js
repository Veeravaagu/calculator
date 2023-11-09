const clearButton = document.querySelector('.clearButton');
const deleteButton = document.querySelector('.deleteButton');
const operationButton = document.querySelectorAll('.operationButton');
const numberButton = document.querySelectorAll('.numberButton');
const equalButton = document.querySelector('.equalButton');
const decimalButton = document.querySelector('.decimalButton');


function operand (){
    const number = Array.from(numberButton).map((numberButton) => {console.log(numberButton.textContent);})}
operand()

function operation (){
    const number = Array.from(operationButton).map((operationButton) => {console.log(operationButton.textContent);})}
operation()

