(function () {
    class InputRadioController {
        constructor($element) {
            $.extend(this,{
                $element,
            });
            this.rippleColor = 'inertia';
        }

        changeRadio(index) {
            if (this.currentRadio === index) {
                this.rippleColor = 'theme';
            } else {
                this.rippleColor = 'inertia';
                this.currentRadio = index;
            }
        }
    }

    keylolApp.component('inputRadio', {
        templateUrl: 'src/components/input-radio.html',
        controller: InputRadioController,
        controllerAs: 'inputRadio',
        bindings: {},
    });
}());
