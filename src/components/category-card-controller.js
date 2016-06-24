(function () {
    class CategoryCardController {
        constructor (utils, stateTree) {
            this.stateTree = stateTree;

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
            this.openRegistration = utils.openRegistration;
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
