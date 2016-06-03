(function () {
    class InputSwitchController {
        constructor($scope) {
            $.extend(this,{
                $scope,
            });
        }

        toggle() {
            this.model = !this.model;
        }
    }

    keylolApp.component('inputSwitch', {
        templateUrl: 'src/components/input-switch.html',
        controller: InputSwitchController,
        controllerAs: 'inputSwitch',
        bindings: {
            model: '=',
            theme: '<',
        },
    });
}());
