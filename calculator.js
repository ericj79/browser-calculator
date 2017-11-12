(function() {
    let output = ""; // String that will be used to populate the output area in the calculator
    let inputs = []; // array of string to track what the current equation is
    let display = ""; // string to track the value that goes into teh input display
    let total = 0; // the current total value of the equation

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
    }

    /**
     * handle the decimal being clicked.
     * 
     * Append it to the end of the current number, plus handle special cases
     */
    function onDecimal() {
        console.log("On Decimal");
    }

    /**
     * handle operator keys
     */
    function onOperator(operator) {
        console.log("On Operator", operator);
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

        console.log("done with init");
    }

    //run init on load;
    init();
})();