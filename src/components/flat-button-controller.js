(function () {
    class FlatButtonController {}

    keylolApp.component('flatButton', {
        templateUrl: 'src/components/flat-button.html',
        controller: FlatButtonController,
        controllerAs: 'flatButton',
        bindings: {
            text: '@',
        },
    });
}());
