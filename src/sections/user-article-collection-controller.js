(function () {
    class UserArticleCollectionController {
        constructor () {
            this.header = {
                mainTitle:'文选',
                subTitle: `一共发表 ${this.count} 篇文章`,
            };
        }
    }

    keylolApp.component('userArticleCollection', {
        templateUrl: 'src/sections/user-article-collection.html',
        controller: UserArticleCollectionController,
        controllerAs: 'userArticleCollection',
        bindings: {
            theme: '<',
            cards: '<',
            count: '<',
            authorIdCode: '<',
        },
    });
}());
