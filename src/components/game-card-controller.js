(function () {
    class GameCardController {}

    keylolApp.component('gameCard', {
        templateUrl: 'src/components/game-card.html',
        controller: GameCardController,
        controllerAs: 'gameCard',
        bindings: {
            card: '<',
        },
    });
}());
