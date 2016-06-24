(function () {
    class SimilarGamesController {
        constructor (stateTree, utils) {
            $.extend(this, {
                stateTree,
                utils,
            });

            this.gameLeftPart = [];
            this.gameRightPart = [];
            if (this.cards) {
                for (let i = 0;i < this.cards.length;i++) {
                    if (i % 2 === 0) {
                        this.gameLeftPart.push(this.cards[i]);
                    } else {
                        this.gameRightPart.push(this.cards[i]);
                    }
                }
            }
            this.type = {
                mainTitle: '近畿',
                subTitle: '特色相邻的游戏',
                type: 'light-theme',
            };
        }
    }

    keylolApp.component('similarGames', {
        templateUrl: 'src/sections/similar-games.html',
        controller: SimilarGamesController,
        controllerAs: 'similarGames',
        bindings: {
            theme: '<',
            cards: '<',
        },
    });
}());
