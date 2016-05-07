(function () {
    class SalesTodayController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
            this.cards = [1, 2, 3, 4];
            this.types = {
                reviews: {
                    mainTitle: '评',
                    subTitle: '解读 · 分析 · 导购',
                },
                studies: {
                    mainTitle: '研',
                    subTitle: '攻略 · 探讨 · 教程',
                },
                stories: {
                    mainTitle: '谈',
                    subTitle: '故事 · 感想 · 随想',
                },
            };
        }
    }

    keylolApp.component('salesToday', {
        templateUrl: 'src/sections/sales-today.html',
        controller: SalesTodayController,
        controllerAs: 'salesToday',
        bindings: {
            type: '@',
        },
    });
}());
