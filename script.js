const display=document.querySelector(".calculator-input");
const keys=document.querySelector(".calculator-keys");

let displayValue="0";
let firstValue=null;
let operator=null;
let waitingForSecValue=false;

function UpdateDisplay(){
    display.value=displayValue;
}

keys.addEventListener("click",function(e){
    const element=e.target;
    const value=element.value;
    if(!element.matches("button")) return;

    switch(element.value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);
    }
    UpdateDisplay();
})

function handleOperator(nextOperator){
    const value=parseFloat(displayValue);

    if(operator&&waitingForSecValue){
        operator=nextOperator;
        return;
    }

    if(firstValue===null){
        firstValue=value;
    }
    else if(operator){
        const result =calculate(firstValue,value,operator);

        displayValue=String(result);
        firstValue=result;
    }

    waitingForSecValue=true;
    operator=nextOperator;
}

function calculate(first,second,operator){
    if(operator==="+"){
        return first+second;
    }
    else if(operator==="-"){
        return first-second;
    }
    else if(operator==="*"){
        return first*second;
    }
    else if(operator==="/"){
        return first/second;
    }
    return second;
}

function inputNumber(num){
    if(waitingForSecValue){
        displayValue=num;
        waitingForSecValue=false;
    }
    else{
        displayValue = displayValue === "0" ? num : displayValue+num;
    }
}

function inputDecimal(){
    if(!displayValue.includes(".")){
        displayValue += ".";
    }
}

function clear(){
    displayValue="0";
}