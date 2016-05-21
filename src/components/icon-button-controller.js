(function () {
    class IconButtonController {
        constructor () {
        }
    }

    keylolApp.component('iconButton', {
        templateUrl: 'src/components/icon-button.html',
        controller: IconButtonController,
        controllerAs: 'iconButton',
        bindings: {
            icon: '@',
            type: '@',
            click: '&',
        },
    });
}());
