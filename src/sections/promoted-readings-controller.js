(function () {
    keylolApp.controller('PromotedReadingsController', [
        '$scope', '$http', 'apiEndpoint', 'union',
        ($scope, $http, apiEndpoint, union) => {
            $scope.articles = union.$localStorage.promotedReadings;
            $http.get(`${apiEndpoint}article/spotlight`).then(response => {
                union.$localStorage.promotedReadings = $scope.articles = response.data;
            });
        },
    ]);
}());
