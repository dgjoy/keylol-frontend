(function () {
    class spotlightGamesController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
            this.pages = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                [1, 2, 3, 4, 5],
            ];
            this.activePage = 1;
            this.type = {
                mainTitle: '焦点',
                subTitle: '刚刚收到投稿或动态的游戏',
            };
        }

        changePage(pageInfo) {
            this.activePage = pageInfo.newPage;
        }
    }

    keylolApp.component('spotlightGames', {
        templateUrl: 'src/sections/spotlight-games.html',
        controller: spotlightGamesController,
        controllerAs: 'spotlightGames',
        bindings: {
        },
    });
}());
