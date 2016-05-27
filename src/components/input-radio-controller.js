(function () {
    class InputRadioController {
        constructor($scope) {
            $.extend(this,{
                $scope,
            });
        }

        changeRadio(index) {
            if ( this.model === index ) {
                this.$scope.$broadcast('rippleEvent',{ index, state:'theme' });
            } else {
                this.model = index;
                this.$scope.$broadcast('rippleEvent',{ index, state:'normal' });
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
