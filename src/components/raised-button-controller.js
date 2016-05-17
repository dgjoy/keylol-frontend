(function () {
    class RaisedButtonController {
        constructor () {
            console.log(this.themeColor);
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
        },
    });
}());
