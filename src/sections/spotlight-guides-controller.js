(function () {
    class spotlightGuidesController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
            this.pages = [[1, 2, 3],[1,2,3],[1]];
            this.activePage = 1;
            this.type = {
                mainTitle: '哨所',
                subTitle: '近期热点观察',
            };
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

    keylolApp.component('spotlightGuides', {
        templateUrl: 'src/sections/spotlight-guides.html',
        controller: spotlightGuidesController,
        controllerAs: 'spotlightGuides',
        bindings: {
        },
    });
}());
