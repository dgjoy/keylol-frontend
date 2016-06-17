(function () {
    class StoreGameCardController {
        constructor(utils) {
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

    keylolApp.component('storeGameCard', {
        templateUrl: 'src/components/store-game-card.html',
        controller: StoreGameCardController,
        controllerAs: 'storeGameCard',
        bindings: {
            card: '<',
        },
    });
}());
