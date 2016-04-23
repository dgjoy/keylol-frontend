(function () {
    class LatestArticlesController {
        constructor ($http, apiEndpoint, union) {
            this.articles = union.$localStorage.latestArticles;
            $http.get(`${apiEndpoint}article/latest`, {
                params: {
                    take: 5,
                    articleTypeFilter: '评,研,讯,谈,档',
                },
            }).then(response => {
                union.$localStorage.latestArticles = this.articles = response.data;
            });
        }
    }

    keylolApp.component('latestArticles', {
        templateUrl: 'src/sections/latest-articles.html',
        controller: LatestArticlesController,
        controllerAs: 'latestArticles',
    });
}());
