(function(ctx, $, undefined) {
    
    $(document).ready(init);

    var calculator = {
        operate: function() {
            var result;
            switch (this.operator) {
                case '+':
                    result = this.operand1 + this.operand2;
                    break;
                case '-':
                    result = this.operand1 - this.operand2;
                    break;
                case '*':
                    result = this.operand1 * this.operand2;
                    break;
                case '/':
                    result = this.operand1 / this.operand2;
            }
            // console.log(this.operand1);
            // console.log(this.operator);
            // console.log(this.operand2);
            // console.log("result: " + result);
            this.operand1 = result;
            this.operand2 = null;
            this.operator = null;
            this.reset = true;
            this.display.val(result);
        },
        reset: function() {
            this.operand1 = undefined;
            this.operand2 = undefined;
            this.reset = undefined;
            this.operator = undefined;
        }
    };

    var handlers = {
        evaluate: function () {
            if(calculator.operator) {
                calculator.operand2 = parseFloat(calculator.display.val());
                 calculator.operate();
            } 
        }, 

        digit: function () {
            if(calculator.reset) {
                calculator.display.val('');
                calculator.reset = false;
            }
            calculator.display.val(calculator.display.val() + $(this).val());
            // console.log('Digit pressed');
        },
        
        special: function () {
            // console.log('Special pressed');
        },

        operator: function () {
            console.log('Before: ' + calculator.operand1 + ' ' + calculator.operator + ' ' + calculator.operand2);
            // console.log('Operator pressed');
            var operator = $(this).val();
            if(calculator.display.val() === '')
                return;
            if(calculator.operator) {
                calculator.operand2 = parseFloat(calculator.display.val());
                calculator.operate();
            } else {
                if(calculator.operand1) {
                    calculator.operand2 = parseFloat(calculator.display.val());
                    calculator.operate();
                    calculator.operator = operator;
                } else {
                    calculator.operator = operator;
                    calculator.operand1 = parseFloat(calculator.display.val());
                    calculator.reset = true;
                }
            }
            console.log('After: ' + calculator.operand1 + ' ' + calculator.operator + ' ' + calculator.operand2);
        }
    };

    function bindEvents () {
        // console.log('binding events..');
        $('input.digit').click(handlers.digit);
        $('input.operator').click(handlers.operator);
        $('input.special').click(handlers.special);
        $('#evaluate').click(handlers.evaluate);
    }

    function init() {
        // console.log('Init..');
        calculator.display = $('#txtExpression');
        bindEvents();
    };

    ctx.processPrivateData = function () {
    //this way we will publically
    };

})(window.APP = window.APP || {}, jQuery);