(function () {
    class InputSwitchController {
        constructor($scope) {
            $.extend(this,{
                $scope,
            });
        }

        toggle() {
            if ( this.model === false ) {
                this.model = true;
                this.$scope.$broadcast('rippleEvent',{ index: 0, color:'theme' });
            } else {
                this.model = false;
                this.$scope.$broadcast('rippleEvent',{ index: 0, color:'inertia' });
            }
        }
    }

    keylolApp.component('inputSwitch', {
        templateUrl: 'src/components/input-switch.html',
        controller: InputSwitchController,
        controllerAs: 'inputSwitch',
        bindings: {
            model: '=',
        },
    });
}());
