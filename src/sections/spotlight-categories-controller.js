(function () {
    class SpotlightCategoriesController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
            this.cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            this.type = {
                mainTitle: '特性',
                subTitle: '你可能感兴趣的类型据点',
            };
        }
    }

    keylolApp.component('spotlightCategories', {
        templateUrl: 'src/sections/spotlight-categories.html',
        controller: SpotlightCategoriesController,
        controllerAs: 'spotlightCategories',
        bindings: {
        },
    });
}());
