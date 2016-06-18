(function () {
    class GameCardController {
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

    keylolApp.component('gameCard', {
        templateUrl: 'src/components/game-card.html',
        controller: GameCardController,
        controllerAs: 'gameCard',
        bindings: {
            card: '<',
        },
    });
}());
