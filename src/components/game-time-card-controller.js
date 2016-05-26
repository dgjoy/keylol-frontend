(function () {
    class GameTimeCardController {}

    keylolApp.component('gameTimeCard', {
        templateUrl: 'src/components/game-time-card.html',
        controller: GameTimeCardController,
        controllerAs: 'gameTimeCard',
        bindings: {
            card: '<',
        },
    });
}());
