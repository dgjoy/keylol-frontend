(function () {
    class SpotlightPointsController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
            this.cards = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
            this.cardsAfterDeal = this.cards.reduce((pre, now) => {});
        }
    }

    keylolApp.component('spotlightPoints', {
        templateUrl: 'src/sections/spotlight-points.html',
        controller: SpotlightPointsController,
        controllerAs: 'spotlightPoints',
    });
}());
