(function () {
    "use strict";

    keylolApp.controller("RelatedGamesController", [
        "$scope", "close", "type", "count", "idCode", "$http", "notification", "$filter", "utils",
        function ($scope, close, type, count, idCode, $http, notification, $filter, utils) {
            $scope.count = count;
            $scope.utils = utils;
            $scope.idCode = idCode;
            $scope.type = type;
            $scope.gameYears = [];
            switch (type) {
                case "Genre":
                    $scope.typeText = "此流派";
                    break;
                case "Tag":
                    $scope.typeText = "此特性";
                    break;
                case "Series":
                    $scope.typeText = "此系列";
                    break;
                case "Publisher":
                    $scope.typeText = "历代发行";
                    break;
                case "Developer":
                    $scope.typeText = "历代开发";
                    break;
            }
            $http.get(apiEndpoint + "normal-point/" + idCode + "/games", {
                params: {
                    relationship: type,
                    idType: "IdCode"
                }
            }).then(function (response) {
                var points = response.data;
                $scope.gameYears.push({
                    year: $filter('date')(points[0].ReleaseDate, "yyyy"),
                    games: [points[0]]
                });
                var rowCount = 1;
                var nowYear = $scope.gameYears[0];
                for(var i = 1;i < points.length;i++){
                    if($filter('date')(points[i].ReleaseDate, "yyyy") === nowYear.year){
                        nowYear.games.push(points[i]);
                        if(nowYear.games.length % 3 === 1){
                            rowCount++;
                        }
                        if(rowCount === 3 && nowYear.games.length % 3 === 0){
                            break;
                        }
                    }else {
                        if(rowCount !== 3){
                            nowYear = {
                                year: $filter('date')(points[i].ReleaseDate, "yyyy"),
                                games: [points[i]]
                            };
                            $scope.gameYears.push(nowYear);
                            rowCount++;
                        }else {
                            break;
                        }
                    }
                }
            }, function (response) {
                notification.error("游戏据点列表获取失败", response);
            });
        }
    ]);
})();