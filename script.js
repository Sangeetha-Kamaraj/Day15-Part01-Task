const $ = document.querySelector.bind(document);
const $_ = document.querySelectorAll.bind(document);

let operation = {
  num1: '',
  num2: '',
  operator: null
};

const sum = () => parseFloat(currentOperation.num1) + parseFloat(currentOperation.num2);
const subtract = () => parseFloat(currentOperation.num1) - parseFloat(currentOperation.num2);
const multiply = () => parseFloat(currentOperation.num1) * parseFloat(currentOperation.num2);
const divide = () => parseFloat(currentOperation.num1) / parseFloat(currentOperation.num2);
const show = (i) => $('#display').innerText = i;
const showIncremental = (i) => $('#display').innerText += i;
const showPrev = (i) => $('#prev').innerText += i;
const deleteLastPrev = () => $('#prev').innerText = $('#prev').innerText.slice(0, -1);
const getFormula = () => $('#prev').innerText;
const hasOperator = () => $('#prev').innerText.endsWith('+') || $('#prev').innerText.endsWith('-') || $('#prev').innerText.endsWith('*') || $('#prev').innerText.endsWith('/');
const isOperator = (i) => ['+', '-', '*', '/'].indexOf(i) !== -1;
const hasMinus = () => $('#prev').innerText.endsWith('-');

const updateDisplay = (input) => {
  if($('#display').innerText.includes('.') && input === '.') {
    return;
  }
  operation.num1 === '' ? operation.num1 += input : operation.num2 += input;
  showPrev(input);
  $('#display').innerText.startsWith('0') ? show(input) : showIncremental(input);
}

const addOperator = (input) => {
  if (operation.num1 === '') {
    if(input !== '-') {
      return;
    }
  } else {
    if(operation.operator === null) {
      operation.operator = input;
      return;
    }
  } 

  const currentFormula = $('#prev').innerText;
  if (hasOperator() && isOperator(input)) {
    if(input !== '-' || hasMinus()) {
      while(hasOperator()) {
        deleteLastPrev();
      }
    }
  }
  showPrev(input);
  show(input);
}

const calc = () => {
  if (operation.num1 == '' || operation.num2 == '' || operation.operator === null) return;

  const result = eval(getFormula()).toString();
  show(result);
  $('#prev').innerText = result;
  currentOperation = {
    num1: 0,
    num2: 0,
    operator: null
  }
}

const clearDisplay = () => {
  show(0);
  $('#prev').innerHTML = `&nbsp`;
  currentOperation = {
    num1: null,
    num2: null,
    operator: null
  }
}

const deleteDigit = () => {
  show($('#display').innerText.slice(0, -1));
  $('#prev').innerText = $('#prev').innerText.slice(0, -1);
  if($('#display').innerText.length <= 0) {
    show(0);
    $('#prev').innerHTML = '&nbsp;';
  }
}

$('#clear').addEventListener('click', () => clearDisplay());
$('#clearLine').addEventListener('click', () => $('#display').innerText = '0');
$_('.digit').forEach((d) => d.addEventListener('click', (e) => updateDisplay(e.target.innerText)));
$_("[data-operation]").forEach( o => o.addEventListener('click', (e) => addOperator(e.target.innerText)));
$('#equals').addEventListener('click', () => calc());
$('#backspace').addEventListener('click', () => deleteDigit());