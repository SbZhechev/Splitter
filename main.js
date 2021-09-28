let resetButton = document.getElementById('resetButton');
let numberOfPeopleValidation = document.getElementById('numberOfPeopleValidation');
let numberOfPeopleInput = document.getElementById('numberOfPeople');
let totalAmount = document.getElementById('totalAmount');
let customTipPercent = document.getElementById('customTipAmount');
let billAmountInput = document.getElementById('billAmount');

let tipPercent = customTipPercent.value ? customTipPercent.value : 0;
let buttons = Array.from(document.getElementsByClassName('tipButton'));

const checkNumberOfPeople = (inputValue) => {
    if (inputValue == 0) {
        numberOfPeopleValidation.innerText = "Can`t be zero";
        numberOfPeopleInput.classList.add('invalid');
    } else {
        numberOfPeopleValidation.innerText = "";
        numberOfPeopleInput.classList.remove('invalid');
    }
};

checkNumberOfPeople(tipPercent);

const isDataInvalid = (bill, tipPercent, numberOfPeople) => {
    return (isNaN(bill) || isNaN(tipPercent) || isNaN(numberOfPeople)) || (bill === 0 || tipPercent === 0 || numberOfPeople === 0);
}

const calculateTip = (tipPercent) => {
    
    let bill = Number(billAmountInput.value);
    let tipAmount = bill*Number(tipPercent)/100;
    let numberOfPeople = Number(numberOfPeopleInput.value);
    let withTip = bill + tipAmount;
    
    if (isDataInvalid(bill, tipPercent, numberOfPeople)) return;
    
    let tipPerPerson = tipAmount / numberOfPeople;
    let totalPerPerson = withTip / numberOfPeople;

    tipPerPerson = tipPerPerson.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    });

    totalPerPerson = totalPerPerson.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    });


    document.getElementById('tipAmount').innerText = `${tipPerPerson}`; 
    document.getElementById('totalAmount').innerText = `${totalPerPerson}`; 
};

const unselectButtons = (percent) => {
    buttons.forEach(button => {
        if (button.dataset.percent != percent) button.classList.remove('selected');
    });
};

const reset = () => {
    billAmountInput.value = 0;
    customTipPercent.value = '';
    tipPercent = 0;
    numberOfPeopleInput.value = 0;
    document.getElementById('tipAmount').innerText = "$0.00"; 
    document.getElementById('totalAmount').innerText = "$0.00";
    unselectButtons(-1);
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.classList.add('selected');
        tipPercent = e.target.dataset.percent;
        unselectButtons(tipPercent);
        customTipPercent.value = '';
        calculateTip(tipPercent);
    });
});

numberOfPeopleInput.addEventListener('input', (e) => {
    checkNumberOfPeople(e.target.value);
    calculateTip(tipPercent);
});

billAmountInput.addEventListener('input', () => {
    calculateTip(tipPercent);
});

resetButton.addEventListener('click', () => reset());

customTipPercent.addEventListener('input', (e) => {
    tipPercent = e.target.value;
    unselectButtons(-1);
    calculateTip(e.target.value);
});