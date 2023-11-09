let buttons = document.querySelectorAll('.numberButton, .operationButton, .equalButton, .deleteButton, .decimalButton, .clearButton');
  
  buttons.forEach(function(button) {
    button.addEventListener('click', handleClick);
  });

  function handleClick(event) {
    const clickedValue = event.target.textContent;
    console.log("Clicked value:", clickedValue);
    
  }
  




