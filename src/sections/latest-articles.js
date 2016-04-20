(function () {
    keylolApp.controller("LatestArticlesController", [
        "$scope", "$http", "apiEndpoint", "union",
        ($scope, $http, apiEndpoint, union) => {
            $scope.articles = union.$localStorage.latestArticles;
            $http.get(`${apiEndpoint}article/latest`, {
                params: {
                    take: 5,
                    articleTypeFilter: "评,研,讯,谈,档",
                },
            }).then(response => {
                union.$localStorage.latestArticles = $scope.articles = response.data;
            });
        },
    ]);
}());
