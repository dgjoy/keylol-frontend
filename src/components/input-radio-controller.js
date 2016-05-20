(function () {
    class InputRadioController {
        constructor($element, $scope) {
            $.extend(this,{
                $scope,
            });
        }

        changeRadio(index) {
            if ( this.currentRadio === index ) {
                this.$scope.$broadcast('rippleEvent',{ index, color:'theme' });
            } else {
                this.currentRadio = index;
                this.$scope.$broadcast('rippleEvent',{ index, color:'inertia' });
            }
        }
    }

    keylolApp.component('inputRadio', {
        templateUrl: 'src/components/input-radio.html',
        controller: InputRadioController,
        controllerAs: 'inputRadio',
        bindings: {
            items: '<',
            currentRadio: '=',
        },
    });
}());
