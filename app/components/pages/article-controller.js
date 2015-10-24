(function () {
    "use strict";

    keylolApp.controller("ArticleController", [
        "pageTitle", "$scope", "$sce", "union", "$routeParams", "$http",
        function (pageTitle, $scope, $sce, union, $routeParams, $http) {
            union.article = {};
            if ($routeParams.author && $routeParams.article) {
                $http.get(apiEndpoint + "article/" + $routeParams.author + "/" + $routeParams.article)
                    .then(function (response) {
                        var article = response.data;
                        console.log(article);
                        pageTitle.set(article.Title + " - 其乐");
                        $.extend(union.article, article);
                        union.article.Content = $sce.trustAsHtml(article.Content);
                    }, function (error) {
                        alert("未知错误");
                        console.log(error);
                    });
            }
            pageTitle.set("文章 - 其乐");
            $scope.comments = {ueo: 1, a: 1};
            union.summary = {
                actions: [
                    {
                        text: "编辑据点"
                    },
                    {
                        text: "已订阅",
                        extraClass: [
                            "subscribed"
                        ]
                    }
                ],
                head: {
                    mainHead: "Counter-Strike: Global Offensive",
                    subHead: "反恐精英：全球攻势"
                },
                avatar: "assets/images/exit.svg",
                background: "//keylol.b0.upaiyun.com/5a3e206aab9decee842a3ea88ac2a312.jpg!profile.point.background",
                pointSum: {
                    type: "游戏",
                    readerNum: 157,
                    articleNum: 48
                }
            };
        }
    ]);
})();