(function () {
    class ArticleHeaderController {
        showModeration ($event) {
            this.showModerationPopup({
                templateUrl: 'src/popup/article-moderation.html',
                controller: 'ArticleModerationController as articleModeration',
                event: $event,
                attachSide: 'right',
                align: 'top',
                offsetX: -220,
                offsetY: -5,
                inputs: {
                    article: this.article,
                    origin: {
                        popup: this.showModerationPopup,
                    },
                },
            });
        }
    }

    keylolApp.component('articleHeader', {
        templateUrl: 'src/sections/article-header.html',
        controller: ArticleHeaderController,
        controllerAs: 'articleHeader',
        bindings: {
            article: '<',
            theme: '<',
        },
    });
}());
