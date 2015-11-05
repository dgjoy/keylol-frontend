(function () {
    "use strict";

    keylolApp.controller("ReceptionController", [
        "$scope", "$http", "notification", "union", "$routeParams",
        function ($scope, $http, notification, union, $routeParams) {
            $scope.quickLinks = [];
            $scope.recentLinks = [];
            $.extend($scope.recentLinks, union.$localStorage.recentBrowse);
            $http.get(apiEndpoint + "favorite")
                .then(function(response){
                    $scope.quickLinks = response.data;
                    $scope.canBeAdd = $scope.quickLinks.length < 5;
                    for(var i in $scope.quickLinks){
                        switch ($scope.quickLinks[i].Type){
                            case "Unknown":
                                break;
                            case "NormalPoint":
                                if($routeParams.pointIdCode === $scope.quickLinks[i].IdCode){
                                    $scope.canBeAdd = false;
                                }
                                break;
                            case "ProfilePoint":
                                if($routeParams.userIdCode === $scope.quickLinks[i].IdCode){
                                    $scope.canBeAdd = false;
                                }
                                break;
                        }
                    }
                },function(error){
                    notification.error("未知错误");
                });
            $scope.deleteFavorite = function(index){
                var deleteLink = $scope.quickLinks[index];
                $http.delete(apiEndpoint + "favorite/" + deleteLink.Id)
                    .then(function(){
                        if(deleteLink.Type !== "Unknown" && ($routeParams.pointIdCode === deleteLink.IdCode || $routeParams.userIdCode === deleteLink.IdCode)){
                            $scope.canBeAdd = true;
                        }
                    },function(){
                        notification.error("未知错误");
                    });
                $scope.quickLinks.splice(index, 1);
            };
            $scope.addFavorite = function(){
                if($routeParams.pointIdCode && union.point.Id){
                    $scope.canBeAdd = false;
                    $http.post(apiEndpoint + "favorite", {}, {
                        params: {
                            pointId: union.point.Id
                        }
                    }).then(function(response){
                        $scope.quickLinks.push({
                            Id: response.data,
                            Type: "NormalPoint",
                            IdCode: union.point.IdCode,
                            Name: union.point.mainName
                        })
                    },function(){
                        notification.error("未知错误");
                        $scope.canBeAdd = true;
                    });
                }else if($routeParams.userIdCode && union.user.Id){
                    $scope.canBeAdd = false;
                    $http.post(apiEndpoint + "favorite", {}, {
                        params: {
                            pointId: union.user.Id
                        }
                    }).then(function(response){
                        $scope.quickLinks.push({
                            Id: response.data,
                            Type: "ProfilePoint",
                            IdCode: union.user.IdCode,
                            Name: union.user.UserName
                        })
                    },function(){
                        notification.error("未知错误");
                        $scope.canBeAdd = true;
                    });
                }
            };
            $scope.deleteRecentBroswe = function(){
                union.$localStorage.recentBrowse = [];
                $scope.recentLinks = [];
            }
        }
    ]);
})();