(function (ctx, $, undefined) {

    $(document).ready(function () {
        calculator.init();
        bindEvents();
    });

    var calculator = {
        init: function () {
            this.operand1 = null;
            this.reset = null;
            this.operator = null;
            this.display = $('#txtExpression');
            this.setText('');
        },

        calculateAndDisplay: function (operand2) {
            var result;
            switch (this.operator) {
                case '+':
                    result = this.operand1 + operand2;
                    break;
                case '-':
                    result = this.operand1 - operand2;
            }
            this.operand1 = result;
            this.operator = null;
            this.setText(result);
            this.reset = true;
        },

        getText: function () {
            return this.display.val();
        },

        setText: function (value) {
            this.display.val(value);
        }
    };

    var handlers = {
        evaluate: function () {
            if(!calculator.operator || calculator.getText() === '')  return;
            calculator.calculateAndDisplay(parseFloat(calculator.getText()));
            calculator.operator = $(this).val();
        },

        digit: function () {
            if(calculator.reset) {
                calculator.setText('');
                calculator.reset = false;
            }
            calculator.setText(calculator.getText() + $(this).val());
        },

        reset: function () {
            calculator.init();
        },

        operator: function () {
            if(calculator.getText() === '')  return;
            var operator = $(this).val(),
                operand = parseFloat(calculator.getText());
            if(calculator.operator) {
                calculator.calculateAndDisplay(operand);
                calculator.operator = operator;
            } else {
                if(calculator.operand1) {
                    calculator.calculateAndDisplay(operand);
                    calculator.operator = operator;
                } else {
                    calculator.operator = operator;
                    calculator.operand1 = operand;
                    calculator.reset = true;
                }
            }
        }
    };

    function bindEvents () {
        $('input.digit').click(handlers.digit);
        $('input.operator').click(handlers.operator);
        $('#reset').click(handlers.reset);
        $('#evaluate').click(handlers.evaluate);
    }

})({}, jQuery);
