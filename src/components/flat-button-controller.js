(function () {
    class FlatButtonController {
        constructor ($scope) {
            if (!this.type) {
                if (!this.binarySet) {
                    this.type = 'theme';
                } else {
                    $scope.$watch(() => {
                        return this.binaryValue;
                    }, newValue => {
                        this.type = newValue ? this.binarySet[1].type : this.binarySet[0].type;
                    });
                }
            }
        }
    }

    keylolApp.component('flatButton', {
        templateUrl: 'src/components/flat-button.html',
        controller: FlatButtonController,
        controllerAs: 'flatButton',
        bindings: {
            text: '@',
            type: '@',
            click: '&',
            themeColor: '<',
            disabledWithColor: '<',
            disabled: '<',
            binarySet: '<',
            binaryValue: '<',
        },
    });
}());
