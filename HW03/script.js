/////////////////////////////////////
// Define Constants
const PRICE_HOTDOG = 4.99;
const PRICE_FRIES = 3.99;
const PRICE_DRINK = 1.79;
const TAX_RATE = 0.0625;
const DISCOUNT_THRESHOLD = 30.00;
const DISCOUNT_RATE = 0.10;

/////////////////////////////////////
// Set up Button Event Listener
const orderButton = document.getElementById('order-btn');
orderButton.addEventListener('click', startOrder);


/////////////////////////////////////
// Functions

/*
startOrder()
Main function to begin the order process.
Triggers prompts, calculates totals, and displays the summary.
*/
function startOrder() {
    let numDogs = getValidNumber("How many hotdogs do you want?");
    let numFries = getValidNumber("How many French Fries do you want?");
    let numSoda = getValidNumber("How many drinks do you want?");

    let totalDogs = numDogs * PRICE_HOTDOG;
    let totalFries = numFries * PRICE_FRIES;
    let totalSoda = numSoda * PRICE_DRINK;
    let subtotalBeforeDiscount = totalDogs + totalFries + totalSoda;
    let discountAmount = 0;

    if (subtotalBeforeDiscount >= DISCOUNT_THRESHOLD) {
        discountAmount = subtotalBeforeDiscount * DISCOUNT_RATE;
    }

    let subtotalAfterDiscount = subtotalBeforeDiscount - discountAmount;
    let taxAmount = subtotalAfterDiscount * TAX_RATE;
    let finalTotal = subtotalAfterDiscount + taxAmount;

    const summaryDiv = document.getElementById('order-summary');
    let orderHtml = `<h2>Your Order Summary</h2>`;
    orderHtml += `<p>${numDogs} Hotdog(s): $${showMoney(totalDogs)}</p>`;
    orderHtml += `<p>${numFries} French Fries: $${showMoney(totalFries)}</p>`;
    orderHtml += `<p>${numSoda} Drink(s): $${showMoney(totalSoda)}</p><hr>`;
    orderHtml += `<p><strong>Subtotal:</strong> $${showMoney(subtotalBeforeDiscount)}</p>`;
    
    if (discountAmount > 0) {
        orderHtml += `<p><strong>10% Discount:</strong> -$${showMoney(discountAmount)}</p>`;
        orderHtml += `<p><strong>New Subtotal:</strong> $${showMoney(subtotalAfterDiscount)}</p>`;
    }

    orderHtml += `<p><strong>Tax (6.25%):</strong> $${showMoney(taxAmount)}</p><hr>`;
    if (finalTotal == 0){
        orderHtml += `<h3><strong>Final Total:</strong> FREE!!!!</h3>`;
    }
    else{
        orderHtml += `<h3><strong>Final Total:</strong> $${showMoney(finalTotal)}</h3>`;
    }
    

    summaryDiv.innerHTML = orderHtml;
    summaryDiv.style.display = 'block';
}

/*
getValidNumber(question)
@param {string} question - The initial question to ask the user.
@returns {number} - The validated whole number.
*/
function getValidNumber(question) {
    let input;
    let number;
    let promptMessage = question;

    do {
        input = prompt(promptMessage);

        if (input === null) {
            return 0;
        }

        number = parseFloat(input);
        promptMessage = "Please enter a valid whole number.";

    } while (isNaN(number) || number < 0 || number % 1 !== 0);

    return parseInt(number);
}

/*
showMoney(amount)
@param {number} amount - The currency value to format.
@returns {string} - The value formatted as a string with two decimal places.
*/
function showMoney(amount) {
    let roundedAmount = Math.round(amount * 100) / 100;
    let amountStr = roundedAmount.toString();
    
    if (amountStr.indexOf('.') === -1) {
        return amountStr + '.00';
    }
    if (amountStr.length - amountStr.indexOf('.') - 1 === 1) {
        return amountStr + '0';
    }
    return amountStr;
}