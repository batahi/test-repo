window.onload = calc;

let operators = [];
let operands = [];

function calc (){
	const controlsElem = document.querySelector('.calc-controls');
	controlsElem.addEventListener('click', handleInput);
}

function handleInput (e){
	const keyPressed = e.target.innerText;
	const displayValueElement = document.querySelector('.calc-display');

	if (keyPressed.charCodeAt() >= 48 && keyPressed.charCodeAt() <= 57){
		copyInputToDisplay(keyPressed, displayValueElement);
		
	} else if (keyPressed === '←'){
		deleteDisplay(displayValueElement);
	} else if (keyPressed === 'x' || keyPressed === '+' || keyPressed === '-' || keyPressed === '÷'){
		operands.push(parseInt(displayValueElement.innerText));
		operators.push(keyPressed);
		clearDisplay(displayValueElement);
	} else if (keyPressed === 'C'){
		clearDisplay(displayValueElement);
		operands = [];
		operators = []
	} else if (keyPressed === '='){
		operands.push(parseInt(displayValueElement.innerText));
		displayValueElement.innerText = calculateResult();
		operands = [];
		operators = []
	}
}

function copyInputToDisplay(keyPressed, displayValueElement) {
	const displayValue = displayValueElement.innerText; 
	if (displayValue === '0'){
		displayValueElement.innerText = keyPressed;
	} else{
		displayValueElement.innerText = displayValue + keyPressed;
	}
}

function deleteDisplay(displayValueElement){
	if (displayValueElement.innerText === '0' || displayValueElement.innerText.length === 1){
		displayValueElement.innerText = '0';
	} else {
		displayValueElement.innerText = displayValueElement.innerText.slice(0,  -1);
	}
}

function clearDisplay(displayValueElement){
	displayValueElement.innerText = '0';
}

function calculateResult(){
	let result;
	result = operands[0];
	for (let i=0; i<operators.length; i++){
		if (operators[i] === '+'){
			result = result + operands[i+1];
		} else if (operators[i] === '-'){
			result = result - operands[i+1];
		} else if (operators[i] === 'x'){
			result = result * operands[i+1];
		} else if (operators[i] === '÷'){
			result = result / operands[i+1];
		}
	}
	return result;
}