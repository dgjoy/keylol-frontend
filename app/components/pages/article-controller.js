(function () {
    "use strict";

    keylolApp.controller("ArticleController", [
        "pageTitle", "$scope", "$sce", "union", "$routeParams", "$http",
        function (pageTitle, $scope, $sce, union, $routeParams, $http) {
            union.article = {};
            union.summary = {};
            union.comments = [];
            if ($routeParams.author && $routeParams.article) {
                $http.get(apiEndpoint + "article/" + $routeParams.author + "/" + $routeParams.article)
                    .then(function (response) {
                        var article = response.data;
                        console.log(article);
                        pageTitle.set(article.Title + " - 其乐");
                        article.Content = $sce.trustAsHtml(article.Content);
                        for(var i in article.AttachedPoints){
                            article.AttachedPoints[i].mainName = article.AttachedPoints[i][article.AttachedPoints[i].PreferedName + "Name"];
                        }
                        article.canBeEdit = (union.$localStorage.user.IdCode == article.AuthorIdCode);
                        if(article.Vote){
                            switch (article.Vote){
                                case "Positive":
                                    article.Vote = "好评";
                                    break;
                                case "Negative":
                                    article.Vote = "差评";
                                    break;
                            }
                        }
                        $.extend(union.article, article);

                        $http.get(apiEndpoint + "comment?articleId=" + article.Id)
                            .then(function (response) {
                                $.extend(union.comments, response.data);
                                console.log(response.data);
                            }, function (error) {
                                alert("未知错误");
                                console.error(error);
                            });
                    }, function (error) {
                        alert("未知错误");
                        console.error(error);
                    });
                $http.get(apiEndpoint + "user/" + $routeParams.author + "?includeProfilePointBackgroundImage=true&idType=IdCode" )
                    .then(function (response) {
                        var author = response.data;
                        var summary = {
                            actions: [
                                {
                                    text: "已订阅",
                                    extraClass: [
                                        "subscribed"
                                    ]
                                }
                            ],
                            head: {
                                mainHead: author.UserName,
                                subHead: author.GamerTag
                            },
                            avatar: author.AvatarImage,
                            background: author.ProfilePointBackgroundImage,
                            pointSum: {
                                type: "个人",
                                readerNum: 157,
                                articleNum: 48
                            }
                        };
                        $.extend(union.summary, summary);
                    }, function (error) {
                        alert("未知错误");
                        console.error(error);
                    });
            }
            pageTitle.set("文章 - 其乐");
        }
    ]);
})();