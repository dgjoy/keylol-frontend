(function () {
    class InputSwitchController {
        constructor($scope, stateTree) {
            $.extend(this,{
                $scope,
            });

            $scope.stateTree = stateTree;
        }

        toggle() {
            if ( this.model === false ) {
                this.model = true;
                this.$scope.$broadcast('rippleEvent',{ index: 0, state:'normal' });
            } else {
                this.model = false;
                this.$scope.$broadcast('rippleEvent',{ index: 0, state:'theme' });
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
