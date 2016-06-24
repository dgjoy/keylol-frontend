(function () {
    class GameCardController {
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

    keylolApp.component('gameCard', {
        templateUrl: 'src/components/game-card.html',
        controller: GameCardController,
        controllerAs: 'gameCard',
        bindings: {
            card: '<',
        },
    });
}());
