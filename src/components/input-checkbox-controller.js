(function () {
    class InputCheckboxController {
        constructor($element, $scope) {
            $.extend(this,{
                $scope,
            });
        }

        toggle(index) {
            if ( this.checklist[index] ) {
                this.checklist[index] = false;
                this.$scope.$broadcast('rippleEvent',{ index, color:'theme' });
            } else {
                this.checklist[index] = true;
                this.$scope.$broadcast('rippleEvent',{ index, color:'inertia' });
            }
        }
    }

    keylolApp.component('inputCheckbox', {
        templateUrl: 'src/components/input-checkbox.html',
        controller: InputCheckboxController,
        controllerAs: 'inputCheckbox',
        bindings: {
            items: '<',
            checklist: '=',
        },
    });
}());
