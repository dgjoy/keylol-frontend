/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("AcknowledgementsController", [
        "pageTitle", "$scope", "union", "$http", "notification",
        function (pageTitle, $scope, union, $http, notification) {
            pageTitle.set("认可 - 其乐");
            union.summary = {
                actions: [],
                head: {
                    mainHead: "认可",
                    subHead: "Acknowledgement"
                },
                background: "/04be114e21692aa38afe2e4d1bc605b6.png",
                defaultSum: {
                    text: "文章/评论获得的认可"
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
                    mainTitle: "认可",
                    subTitle: "Acknowledgement"
                },
                actions: [
                    {
                        active: true,
                        text: "全部",
                        onClick: function () {
                            if(!this.active){
                                changeActive(this);
                                getLike("All");
                            }
                        }
                    },
                    {
                        active: false,
                        text: "文章",
                        onClick: function () {
                            if(!this.active){
                                changeActive(this);
                                getLike("ArticleLike");
                            }
                        }
                    },
                    {
                        active: false,
                        text: "评论",
                        onClick: function () {
                            if(!this.active){
                                changeActive(this);
                                getLike("CommentLike");
                            }
                        }
                    }
                ],
                loadAction: function(callback){
                    if(union.timeline.actions[0].active){
                        getLike("All", union.timeline.entries.length, callback);
                    }else if(union.timeline.actions[1].active){
                        getLike("ArticleLike", union.timeline.entries.length, callback);
                    }else {
                        getLike("CommentLike", union.timeline.entries.length, callback);
                    }
                },
                datetime: "inBlock",
                noMoreArticle: true,
                oneLine: true,
                hasDeleteButton: true,
                clickable: true,
                entries: []
            };
            getLike("All");

            function getLike(type, skip, callback) {
                if(!skip){
                    union.timeline.entries.length = 0;
                    skip = 0;
                }
                $http.get(apiEndpoint + "like/my", {
                    params: {
                        type: type,
                        skip: skip,
                        take: timeLineLoadCount
                    }
                }).then(function(response){
                    for(var i in response.data){
                        var like = response.data[i];
                        var result = {
                            isNew: !like.ReadByTargetUser,
                            fromArticle: {
                                id: like.Article.Id,
                                text: like.Article.Title,
                                href: "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor
                            },
                            datetime: like.Time,
                            author: {
                                username: like.Operator.UserName,
                                avatarUrl: like.Operator.AvatarImage,
                                idCode: like.Operator.IdCode
                            },
                            id: like.Id
                        };
                        if(like.Comment){
                            result.commentId = like.Comment.Id;
                            result.types = ["评论"];
                            result.fromArticle.fromComment = true;
                            result.summary = "认可你的评论";
                            result.url = "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor + "#" + like.Comment.SequenceNumberForArticle;
                        }else {
                            result.types = ["文章"];
                            result.summary = "认可你的文章";
                            result.url = "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor;
                        }
                        union.timeline.entries.push(result);
                    }
                    if(callback){
                        callback();
                    }
                },function(error){
                    notification.error("未知错误", error);
                });
            }
        }
    ]);
})();