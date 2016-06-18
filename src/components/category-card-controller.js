(function () {
    class CategoryCardController {
        constructor (utils) {
            this.subscribeSet = [
                {
                    text: '订阅',
                    type: 'theme',
                },
                {
                    text: '退订',
                    type: 'light-text',
                },
            ];

            this.subscribe = utils.subscribe;
        }
    }

    keylolApp.component('categoryCard', {
        templateUrl: 'src/components/category-card.html',
        controller: CategoryCardController,
        controllerAs: 'categoryCard',
        bindings: {
            card: '<',
        },
    });
}());
