(function (ctx, $, undefined) {

    $(document).ready(function () {
        calculator.init();
        bindEvents();
    });

    var calculator = {
        init: function () {
            this.operand1 = undefined;
            this.operand2 = undefined;
            this.reset = undefined;
            this.operator = undefined;
            this.display = $('#txtExpression');
            this.display.val('');
        },

        calculateAndDisplay: function () {
            var result;
            switch (this.operator) {
                case '+':
                    result = this.operand1 + this.operand2;
                    break;
                case '-':
                    result = this.operand1 - this.operand2;
                    break;
            }
            this.operand1 = result;
            this.operand2 = null;
            this.operator = null;
            this.display.val(result);
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
            if(calculator.operator) {
                calculator.operand2 = parseFloat(calculator.getText());
                 calculator.calculateAndDisplay();
            }
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
            var operator = $(this).val(),
                operand = parseFloat(calculator.getText());
            if(calculator.getText() === '')
                return;
            if(calculator.operator) {
                calculator.operand2 = operand;
                calculator.calculateAndDisplay();
                calculator.operator = operator;
            } else {
                if(calculator.operand1) {
                    calculator.operand2 = operand;
                    calculator.calculateAndDisplay();
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

})(window.APP = window.APP || {}, jQuery);
