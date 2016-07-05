(function () {
    class recentGamesController {
        constructor ($http, apiEndpoint, $element) {
            $.extend(this, {
                $http,
                apiEndpoint,
                $element,
            });
            this.currentPage = 1;
            this.type = {
                mainTitle: '焦点',
                subTitle: '刚刚收到投稿或动态的游戏',
            };
        }

        scrollToTop() {
            $('html, body').animate({
                scrollTop: this.$element.offset().top - 64,
            }, 500);
        }

        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/entrance/points/recent-points/?page=${newPage}`).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.list = response.data;
                    this.changePageLock = false;
                    this.scrollToTop();
                }, response => {
                    this.changePageLock = false;
                });
            }
            return true;
        }
    }

    keylolApp.component('recentGames', {
        templateUrl: 'src/sections/recent-games.html',
        controller: recentGamesController,
        controllerAs: 'recentGames',
        bindings: {
            list: '<',
            totalPage: '<',
        },
    });
}());
