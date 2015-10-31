(function () {
    "use strict";

    keylolApp.controller("ArticleContentController", [
        "$scope", "union", "$http", "notification",
        function ($scope, union, $http, notification) {
            $scope.article = union.article;
            $scope.acknowledge = function () {
                $http.post(apiEndpoint + "like", {
                    TargetId: $scope.article.Id,
                    Type: "ArticleLike"
                }).then(function (response) {
                }, function (error) {
                    notification.error("认可评论失败");
                    console.error(error);
                });
                $scope.article.Liked = true;
                $scope.article.hasLike = true;
                $scope.article.LikeCount += 1;
            };
            $scope.cancelAcknowledge = function () {
                $http.delete(apiEndpoint + "like", {
                    params: {
                        targetId: $scope.article.Id,
                        type: "ArticleLike"
                    }
                }).then(function (response) {
                }, function (error) {
                    notification.error("取消认可评论失败");
                    console.error(error);
                });
                $scope.article.Liked = false;
                $scope.article.LikeCount -= 1;
                if ($scope.article.LikeCount <= 0) {
                    $scope.article.hasLike = false;
                }
            };
        }
    ]);
})();