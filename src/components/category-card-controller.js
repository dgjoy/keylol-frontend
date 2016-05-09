(function () {
    class CategoryCardController {}

    keylolApp.component('categoryCard', {
        templateUrl: 'src/components/category-card.html',
        controller: CategoryCardController,
        controllerAs: 'categoryCard',
        bindings: {
            text: '@',
        },
    });
}());
