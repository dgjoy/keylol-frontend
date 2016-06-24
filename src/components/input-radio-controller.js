(function () {
    class InputRadioController {
        constructor($scope) {
            $.extend(this,{
                $scope,
            });
        }

        changeRadio(index) {
            if (this.model !== index ) {
                this.model = index;
            }
        }
    }

    keylolApp.component('inputRadio', {
        templateUrl: 'src/components/input-radio.html',
        controller: InputRadioController,
        controllerAs: 'inputRadio',
        bindings: {
            object: '<',
            model: '=',
            theme: '<',
        },
    });
}());
