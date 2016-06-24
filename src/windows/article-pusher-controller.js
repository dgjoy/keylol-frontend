(function () {
    class ArticlePusherController {
        constructor(close, $http, apiEndpoint, notification, article, utils, stateTree, $state, window) {
            $.extend(this, {
                close,
                $http,
                apiEndpoint,
                notification,
                article,
                utils,
                stateTree,
                window,
            });

            this.link = `https://www.keylol.com/article/${$state.params.author_id_code}/${$state.params.sid_for_author}`;
        }

        submit () {
            const place = [{
                type: 'slideShow',
            }, {
                type: 'spotlightArticle',
                articleType: 'Review',
            }, {
                type: 'spotlightArticle',
                articleType: 'Study',
            }, {
                type: 'spotlightArticle',
                articleType: 'Story',
            }][this.place];


            this.window.show({
                templateUrl: 'src/windows/push-entry.html',
                controller: 'PushEntryController',
                controllerAs: 'pushEntry',
                inputs: {
                    type: place.type,
                    options: {
                        link: this.link,
                        articleType: place.articleType,
                    },
                },
            });

            this.close();
        }
    }

    keylolApp.controller('ArticlePusherController', ArticlePusherController);
}());
