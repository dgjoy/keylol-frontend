(function () {
    class headerController {}

    keylolApp.component('header', {
        templateUrl: 'src/components/header.html',
        controller: headerController,
        controllerAs: 'header',
        bindings: {
            isOrange: '<',
            mainTitle: '@',
            subTitle: '@',
        },
    });
}());
