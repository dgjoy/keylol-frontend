(function () {
    class RaisedButtonController {
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

    keylolApp.component('raisedButton', {
        templateUrl: 'src/components/raised-button.html',
        controller: RaisedButtonController,
        controllerAs: 'raisedButton',
        bindings: {
            text: '@',
            type: '@',
            invert: '<',
            themeColor: '<',
            disabled: '<',
            click: '&',
            showPopup: '=?',
            binarySet: '<',
            binaryValue: '<',
            isSubmit: '<',
        },
    });
}());
