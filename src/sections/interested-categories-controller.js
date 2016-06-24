(function () {
    class InterestedCategoriesController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
            this.type = {
                mainTitle: '特性',
                subTitle: '你可能感兴趣的类型据点',
            };
        }
    }

    keylolApp.component('interestedCategories', {
        templateUrl: 'src/sections/interested-categories.html',
        controller: InterestedCategoriesController,
        controllerAs: 'interestedCategories',
        bindings: {
            cards: '<',
        },
    });
}());
