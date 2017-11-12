(function() {
    let currentValue = "";
    let inputs = []; // array of string to track what the current equation is
    let operators = ["+", "-", "*", "/"];

    /**
     * Update the HTML
     */
    function onUpdate() {
        console.log("On Update");

        let total = 0;
        let output = "";
        let currentOperator = null;
        inputs.forEach(item => {
            if (operators.indexOf(item) >= 0) {
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
                currentOperator = item;
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
        console.log("On Number", number);

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
        console.log("On Decimal");
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
        console.log("On Operator", operator);
        inputs.push(currentValue);
        currentValue = "";
        inputs.push(operator);
        onUpdate();
    }

    /**
     * handle clear action
     */
    function onReset() {
        console.log("On Reset");
    }

    /**
     * figure out equation
     */
    function onEqual() {
        console.log("On Equal");
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

        onUpdate();
    }

    //run init on load;
    init();
})();