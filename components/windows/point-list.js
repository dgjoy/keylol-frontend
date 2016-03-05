(function () {
    "use strict";

    keylolApp.controller("PointListController", [
        "$scope", "close", "$http", "apiEndpoint", "notification", "window",
        function ($scope, close, $http, apiEndpoint, notification, window) {
            $scope.cancel = function () {
                close();
            };

            $scope.inline = {
                onPageChange: function (newPage) {
                    var recordPerPage = 20;
                    $http.get(apiEndpoint + "normal-point/list", {
                        params: {
                            skip: recordPerPage * (newPage - 1),
                            take: recordPerPage
                        }
                    }).then(function (response) {
                        $scope.inline.totalPages = Math.ceil(response.headers("X-Total-Record-Count") / recordPerPage);
                        $scope.inline.currentPage = newPage;
                        $scope.points = response.data;
                    }, function (response) {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    });
                },
                editPoint: function (point) {
                    window.show({
                        templateUrl: "components/windows/create-point.html",
                        controller: "CreatePointController",
                        inputs: {vm: point}
                    });
                }
            };
            $scope.inline.onPageChange(1);
        }
    ]);
})();