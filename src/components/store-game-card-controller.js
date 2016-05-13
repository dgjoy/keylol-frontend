(function () {
    class StoreGameCardController {}

    keylolApp.component('storeGameCard', {
        templateUrl: 'src/components/store-game-card.html',
        controller: StoreGameCardController,
        controllerAs: 'storeGameCard',
        bindings: {
            card: '<',
        },
    });
}());
