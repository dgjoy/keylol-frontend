(function () {
    class SpotlightUsersController {
        constructor ($element) {
            this.steamFriendCardsPart1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            this.steamFriendCardsPart2 = [7, 8, 9];
            this.sameFriendCards = [1,2];
            this.type = {
                mainTitle: '玩家',
                subTitle: '与游戏好友一起在其乐融融',
                isOrange: true,
            };
        }
    }

    keylolApp.component('spotlightUsers', {
        templateUrl: 'src/sections/spotlight-users.html',
        controller: SpotlightUsersController,
        controllerAs: 'spotlightUsers',
        bindings: {
        },
    });
}());
