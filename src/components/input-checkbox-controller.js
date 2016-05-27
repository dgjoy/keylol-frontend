(function () {
    class InputCheckboxController {
        constructor($scope) {
            $.extend(this,{
                $scope,
            });
        }

        toggle(index) {
            if ( this.model[index] ) {
                this.model[index] = false;
                this.$scope.$broadcast('rippleEvent',{ index, state:'theme' });
            } else {
                this.model[index] = true;
                this.$scope.$broadcast('rippleEvent',{ index, state:'normal' });
            }
        }
    }

    keylolApp.component('inputCheckbox', {
        templateUrl: 'src/components/input-checkbox.html',
        controller: InputCheckboxController,
        controllerAs: 'inputCheckbox',
        bindings: {
            object: '<',
            model: '=',
            theme: '<',
        },
    });
}());
