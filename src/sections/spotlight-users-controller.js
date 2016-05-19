(function () {
    class SpotlightUsersController {
        constructor () {
            this.steamFriendCardsPart1 = [];
            this.steamFriendCardsPart2 = [];
            this.sameFriendCards = [];
            if (this.cards) {
                for (let i = 0;i < this.cards.length;i++) {
                    if (i < 3) {
                        this.steamFriendCardsPart1.push(this.cards[i]);
                    } else if (i < 6) {
                        this.steamFriendCardsPart2.push(this.cards[i]);
                    } else if (i < 8) {
                        this.sameFriendCards.push(this.cards[i]);
                    } else if (i % 2 === 0) {
                        this.steamFriendCardsPart1.push(this.cards[i]);
                    } else {
                        this.steamFriendCardsPart2.push(this.cards[i]);
                    }
                }
            }
            this.type = {
                mainTitle: '玩家',
                subTitle: '与游戏好友一起在其乐融融',
                type: 'user',
            };
        }
    }

    keylolApp.component('spotlightUsers', {
        templateUrl: 'src/sections/spotlight-users.html',
        controller: SpotlightUsersController,
        controllerAs: 'spotlightUsers',
        bindings: {
            cards: '<',
        },
    });
}());
