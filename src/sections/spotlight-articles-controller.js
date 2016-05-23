(function () {
    class SpotlightArticlesController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
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

        showModeration ($event) {
            this.showModerationPopup({
                templateUrl: 'src/popup/moderation.html',
                controller: 'ModerationController as moderation',
                event: $event,
                attachSide: 'left',
                align: 'top',
                offsetX: 29,
                offsetY: -5,
                inputs: {
                    type: 'slideShow',
                },
            });
        }
    }

    keylolApp.component('spotlightArticles', {
        templateUrl: 'src/sections/spotlight-articles.html',
        controller: SpotlightArticlesController,
        controllerAs: 'spotlightArticles',
        bindings: {
            type: '@',
            cards: '<',
        },
    });
}());
