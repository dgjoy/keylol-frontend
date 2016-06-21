(function () {
    class InputSwitchController {
        constructor($scope) {
            $.extend(this,{
                $scope,
            });
        }

        switchValue() {
            if (this.disabled) return;
            if (!this.toggle()) {
                this.model = !this.model;
            }
        }
    }

    keylolApp.component('inputSwitch', {
        templateUrl: 'src/components/input-switch.html',
        controller: InputSwitchController,
        controllerAs: 'inputSwitch',
        bindings: {
            model: '=',
            theme: '<',
            toggle: '&',
            disabled: '<',
        },
    });
}());
