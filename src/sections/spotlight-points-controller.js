(function () {
    class SpotlightPointsController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
            this.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            this.pages = [];
            for (let i = 0;i < this.cards.length;i++) {
                if (this.pages.length === 0 || this.pages[this.pages.length - 1].length >= 6) {
                    this.pages.push([]);
                }
                this.pages[this.pages.length - 1].push(this.cards[i]);
            }
            this.activePage = 1;
        }
        nextPage () {
            if (this.activePage < this.pages.length) {
                this.activePage += 1;
            }
        }
        previousPage () {
            if (this.activePage > 1) {
                this.activePage -= 1;
            }
        }
    }

    keylolApp.component('spotlightPoints', {
        templateUrl: 'src/sections/spotlight-points.html',
        controller: SpotlightPointsController,
        controllerAs: 'spotlightPoints',
    });
}());
