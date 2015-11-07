/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("AcknowledgementsController", [
        "pageTitle", "$scope", "union", "$http", "notification",
        function (pageTitle, $scope, union, $http, notification) {
            pageTitle.set("认同 - 其乐");
            union.summary = {
                actions: [],
                head: {
                    mainHead: "认同",
                    subHead: "Acknowledgement"
                },
                background: "/04be114e21692aa38afe2e4d1bc605b6.png",
                defaultSum: {
                    text: "文章/评论获得的认同"
                }
            };
            function changeActive(activeObject) {
                var actions = union.timeline.actions;
                for (var i = 0; i < actions.length; i++) {
                    actions[i].active = false;
                }
                activeObject.active = true;
            }

            union.timeline = {
                title: {
                    mainTitle: "认同",
                    subTitle: "Acknowledgement"
                },
                actions: [
                    {
                        active: true,
                        text: "全部",
                        onClick: function () {
                            changeActive(this);
                        }
                    },
                    {
                        active: false,
                        text: "文章",
                        onClick: function () {
                            changeActive(this);
                        }
                    },
                    {
                        active: true,
                        text: "评论",
                        onClick: function () {
                            changeActive(this);
                        }
                    }
                ],
                datetime: "inBlock",
                oneLine: true,
                hasDeleteButton: true,
                clickable: true,
                entries: []
            };
            $http.get(apiEndpoint + "like/my").then(function(response){
                console.log(response.data);
                for(var i in response.data){
                    var like = response.data[i];
                    var result = {
                        isNew: !like.ReadByTargetUser,
                        fromArticle: {
                            text: like.Article.Title,
                            href: "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor
                        },
                        datetime: like.Time,
                        author: {
                            username: like.Operator.UserName,
                            avatarUrl: like.Operator.AvatarImage,
                            idCode: like.Operator.IdCode
                        }
                    };
                    if(like.Comment){
                        result.types = ["评论"];
                        result.fromArticle.fromComment = true;
                        result.summary = "认同你的评论";
                        result.url = "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor;
                    }else {
                        result.types = ["文章"];
                        result.summary = "认同你的文章";
                        result.url = "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor;
                    }
                    union.timeline.entries.push(result);
                }
            },function(error){
                notification.error("未知错误", error);
            });
        }
    ]);
})();