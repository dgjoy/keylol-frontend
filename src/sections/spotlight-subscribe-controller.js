(function () {
    class SpotlightSubscribeController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
        }
    }

    keylolApp.component('spotlightSubscribe', {
        templateUrl: 'src/sections/spotlight-subscribe.html',
        controller: SpotlightSubscribeController,
        controllerAs: 'spotlightSubcribe',
        bindings: {},
    });
}());
