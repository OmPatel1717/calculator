const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay(value) {
    display.textContent = value;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'clear') {
            currentInput = '';
            operator = '';
            firstOperand = null;
            waitingForSecondOperand = false;
            updateDisplay('0');
        } else if (button.id === 'equals') {
            if (operator && firstOperand !== null && currentInput !== '') {
                const secondOperand = parseFloat(currentInput);
                let result = 0;
                switch (operator) {
                    case '+':
                        result = firstOperand + secondOperand;
                        break;
                    case '-':
                        result = firstOperand - secondOperand;
                        break;
                    case '*':
                        result = firstOperand * secondOperand;
                        break;
                    case '/':
                        result = secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
                        break;
                }
                updateDisplay(result);
                currentInput = result.toString();
                operator = '';
                firstOperand = null;
                waitingForSecondOperand = false;
            }
        } else if (button.classList.contains('operator')) {
            if (currentInput !== '') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator) {
                    const secondOperand = parseFloat(currentInput);
                    switch (operator) {
                        case '+':
                            firstOperand += secondOperand;
                            break;
                        case '-':
                            firstOperand -= secondOperand;
                            break;
                        case '*':
                            firstOperand *= secondOperand;
                            break;
                        case '/':
                            firstOperand = secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
                            break;
                    }
                }
                operator = value;
                waitingForSecondOperand = true;
                currentInput = '';
                updateDisplay(firstOperand);
            } else if (firstOperand !== null) {
                operator = value;
            }
        } else {
            if (waitingForSecondOperand) {
                currentInput = value === '.' ? '0.' : value;
                waitingForSecondOperand = false;
            } else {
                if (value === '.' && currentInput.includes('.')) return;
                currentInput = currentInput === '0' && value !== '.' ? value : currentInput + value;
            }
            updateDisplay(currentInput);
        }
    });
}); 