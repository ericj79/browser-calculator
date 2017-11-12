(function() {
    let currentValue = "";
    let inputs = []; // array of string to track what the current equation is
    const operators = ["+", "-", "*", "/"];

    /**
     * Update the HTML
     */
    function onUpdate() {
        let total = 0;
        let output = "";
        let currentOperator = null;
        inputs.forEach(item => {
            if (item === "=") {
                output += "= " + total.toPrecision();
            } else if (operators.indexOf(item) >= 0) {
                currentOperator = item;
                // this is an operator
                // substitute times and divide
                let str = "";
                switch (item) {
                    case "*":
                        str = "&times;";
                        break;
                    case "/":
                        str = "&#247;";
                        break;
                    default:
                        str = item;
                        break;
                }
                output += str;
            } else {
                // this is a number

                const decimal = item.indexOf(".");
                let currentSignificant = 0;
                if (decimal >= 0) {
                    currentSignificant = item.length - decimal;
                }

                // add it to the output
                output += item + " ";

                let number = 0;
                if (currentSignificant > 0) {
                    number = parseFloat(item);
                } else {
                    number = parseInt(item);
                }

                switch (currentOperator) {
                    case "*":
                        total *= number;
                        break;
                    case "/":
                        total /= number;
                        break;
                    case "+":
                        total += number;
                        break;
                    case "-":
                        total -= number;
                        break;
                    default:
                        total = number;
                        break;
                }
            }
        });
        document.getElementById("output").innerHTML = output.length ?
            output :
            "&nbsp;";
        document.calculator.input.value = total.toPrecision();
    }

    /** 
     * handle key events
     */
    function onKeyPress(keyEvent) {
        /* Check the key that is pressed and send it to the proper function 
         * For numbers send it to the on number function
         * For operators send to the on operator function
         * anything else can be ignored
         */

        console.log("Key Press", keyEvent);
    }

    /**
     * handle a number button being clicked.
     * 
     * Append it to the end of the current number, plus handle special cases
     */
    function onNumber(number) {
        if (currentValue.length) {
            currentValue += number; // string concatonation
        } else {
            currentValue = number;
        }

        document.calculator.input.value = currentValue;
    }

    /**
     * handle the decimal being clicked.
     * 
     * Append it to the end of the current number, plus handle special cases
     */
    function onDecimal() {
        if (currentValue.indexOf(".") === -1) {
            if (currentValue.length) {
                currentValue += ".";
            } else {
                currentValue = "0.";
            }
        }
        // if there is already a deicaml, then just ignore this

        document.calculator.input.value = currentValue;
    }

    /**
     * handle operator keys
     */
    function onOperator(operator) {
        if (currentValue.length) {
            // normal case
            inputs.push(currentValue);
        } else {
            // somone hit an operator right ofter the equals two operators in a row
            if (inputs.length > 0) {
                // two operators in a row, so just replace the last one with this
                inputs.pop();
            } else {
                // operator right after equals, so put the total in the start of the equation
                inputs.push(this.calculator.input.value);
            }
        }
        currentValue = "";
        inputs.push(operator);
        onUpdate();
    }

    /**
     * handle clear action
     */
    function onReset() {
        currentValue = "";
        inputs = [];
        onUpdate();
    }

    /**
     * figure out equation
     */
    function onEqual() {
        inputs.push(currentValue);
        inputs.push("=");
        onUpdate();
        currentValue = "";
        inputs = [];
    }

    /**
     * Attache event handlers for buttons and keys
     */
    function init() {
        // all number buttons
        for (let counter = 0; counter < 10; counter++) {
            let str = counter.toString();
            document
                .getElementById("button" + str)
                .addEventListener("click", () => onNumber(str), false);
        }

        // decimal button
        document
            .getElementById("buttonDecimal")
            .addEventListener("click", () => onDecimal(), false);

        // operator buttons
        document
            .getElementById("buttonPlus")
            .addEventListener("click", () => onOperator("+"), false);
        document
            .getElementById("buttonMinus")
            .addEventListener("click", () => onOperator("-"), false);
        document
            .getElementById("buttonTimes")
            .addEventListener("click", () => onOperator("*"), false);
        document
            .getElementById("buttonDivide")
            .addEventListener("click", () => onOperator("/"), false);

        // clear
        document
            .getElementById("buttonClear")
            .addEventListener("click", () => onReset(), false);

        // Equals
        document
            .getElementById("buttonEqual")
            .addEventListener("click", () => onEqual(), false);

        // capture all key events
        window.addEventListener("keypress", onKeyPress, false);

        onReset();
    }

    //run init on load;
    init();
})();