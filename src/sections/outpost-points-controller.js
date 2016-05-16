(function () {
    class OutpostPointsController {
        constructor () {
            this.pages = [];
            for (let i = 0;i < this.cards.length;i++) {
                if (this.pages.length === 0 || this.pages[this.pages.length - 1].length >= 3) {
                    this.pages.push([]);
                }
                this.pages[this.pages.length - 1].push(this.cards[i]);
            }
            this.activePage = 1;
        }

        nextPage() {
            if (this.activePage < this.pages.length) {
                this.activePage += 1;
            }
        }

        previousPage() {
            if (this.activePage > 1) {
                this.activePage -= 1;
            }
        }
    }

    keylolApp.component('outpostPoints', {
        templateUrl: 'src/sections/outpost-points.html',
        controller: OutpostPointsController,
        controllerAs: 'outpostPoints',
        bindings: {
            cards: '<',
        },
    });
}());
