/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("AcknowledgementsController", [
        "pageTitle", "$scope", "union", "$http", "notification", "utils", "$timeout",
        function (pageTitle, $scope, union, $http, notification, utils, $timeout) {
            pageTitle.set("认可 - 其乐");
            union.summary = {
                actions: [],
                head: {
                    mainHead: "认可",
                    subHead: "Acknowledgement"
                },
                background: "0abeafd8e4c049bce860686bc4c04829.jpg",
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
                loadAction: function(){
                    union.timeline.loadingLock = true;
                    if(union.timeline.actions[0].active){
                        getLike("All", union.timeline.entries.length);
                    }else if(union.timeline.actions[1].active){
                        getLike("ArticleLike", union.timeline.entries.length);
                    }else {
                        getLike("CommentLike", union.timeline.entries.length);
                    }
                },
                datetime: "inBlock",
                loadingLock: true,
                oneLine: true,
                hasDeleteButton: true,
                clickable: true,
                entries: []
            };
            getLike("All");

            function getLike(type, skip) {
                if(!skip){
                    union.timeline.entries.length = 0;
                    skip = 0;
                }
                $http.get(apiEndpoint + "like/my", {
                    params: {
                        type: type,
                        skip: skip,
                        take: utils.timelineLoadCount
                    }
                }).then(function(response){
                    union.timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                    var timelineTimeout;
                    for(var i in response.data){
                        var like = response.data[i];
                        var entry = {
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
                            entry.commentId = like.Comment.Id;
                            entry.types = ["评论"];
                            entry.fromArticle.fromComment = true;
                            entry.summary = "认可你的评论";
                            entry.url = "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor + "#" + like.Comment.SequenceNumberForArticle;
                        }else {
                            entry.types = ["文章"];
                            entry.summary = "认可你的文章";
                            entry.url = "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor;
                        }
                        (function(entry){
                            if(!timelineTimeout){
                                union.timeline.entries.push(entry);
                                timelineTimeout = $timeout(function(){}, utils.timelineInsertDelay);
                            }else {
                                timelineTimeout = timelineTimeout.then(function(){
                                    union.timeline.entries.push(entry);
                                    return $timeout(function(){}, utils.timelineInsertDelay);
                                });
                            }
                        })(entry);
                    }
                    if(timelineTimeout){
                        timelineTimeout.then(function(){
                            union.timeline.loadingLock = false;
                        });
                    }else {
                        union.timeline.loadingLock = false;
                    }
                },function(error){
                    notification.error("未知错误", error);
                    union.timeline.loadingLock = false;
                });
            }
        }
    ]);
})();