(function () {
    class SpotlightPointsController {
        constructor () {
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
        bindings: {
            cards: '<',
        },
    });
}());
