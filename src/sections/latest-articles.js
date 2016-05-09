(function () {
    class LatestArticlesController {
        constructor ($http, apiEndpoint, union) {
            this.union = union;
            this.articles = union.$localStorage.latestArticles;
            $http.get(`${apiEndpoint}article/latest`, {
                params: {
                    take: 5,
                    articleTypeFilter: '评,研,讯,谈,档',
                },
            }).then(response => {
                response.data = response.data.concat(response.data);
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
