(function () {
    class RaisedButtonController {}

    keylolApp.component('raisedButton', {
        templateUrl: 'src/components/raised-button.html',
        controller: RaisedButtonController,
        controllerAs: 'raisedButton',
        bindings: {
            text: '@',
            type: '@',
            invert: '<',
        },
    });
}());
