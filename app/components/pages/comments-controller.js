/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("CommentsController", [
        "pageTitle", "$scope", "union", "$http", "notification",
        function (pageTitle, $scope, union, $http, notification) {
            pageTitle.set("评论 - 其乐");
            union.summary = {
                head: {
                    mainHead: "评论",
                    subHead: "Comments"
                },
                background: "/04be114e21692aa38afe2e4d1bc605b6.png",
                defaultSum: {
                    text: "文章回复中的互动"
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
                    mainTitle: "评论",
                    subTitle: "Comments"
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
                        text: "收到",
                        onClick: function () {
                            changeActive(this);
                        }
                    },
                    {
                        active: false,
                        text: "发出",
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
            $http.get(apiEndpoint + "comment/my").then(function(response){
                console.log(response.data);
                for(var i in response.data){
                    var comment = response.data[i];
                    var result = {
                        types: ["收到"],
                        isNew: !comment.ReadByTargetUser,
                        fromArticle: {
                            fromComment: true,
                            text: comment.Article.Title,
                            href: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor
                        },
                        datetime: comment.PublishTime,
                        author: {
                            username: comment.Commentator.UserName,
                            avatarUrl: comment.Commentator.AvatarImage,
                            idCode: comment.Commentator.IdCode
                        },
                        summary: comment.Content,
                        url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor
                    };
                    if(comment.ReplyToUser){
                        console.log(comment.ReplyToUser);
                    }
                    if(comment.ReplyToComment){
                        result.commentTarget = {
                            type: "comment",
                            author: {
                                username: "Zenday",
                                idCode: "66666"
                            },
                            text: comment.ReplyToComment.Content,
                            url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor
                        }
                    }
                    if(comment.ReplyToMultipleUser){
                        console.log(comment.ReplyToMultipleUser);
                    }
                    union.timeline.entries.push(result);
                }
            },function(error){
                notification.error("未知错误", error);
            });
        }
    ]);
})();