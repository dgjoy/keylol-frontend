/**
 * Created by Rex on 15/9/23.
 */
(function () {
    keylolApp.controller("AllArticlesController", [
        "pageHead", "$scope", "union", "$http", "notification", "$location", "utils", "$timeout", "window",
        (pageHead, $scope, union, $http, notification, $location, utils, $timeout, window) => {
            $scope.searchExist = true;
            $scope.union = union;
            pageHead.setTitle("最新文章 - 其乐");
            const summary = {
                actions: [],
                head: {
                    mainHead: "最新投稿",
                    subHead: "Recent Submissions",
                },
                background: "keylol://989df8e508510f8447aaf06ddadcac5f.jpg",
                defaultSum: {
                    text: "所有近日发布的投稿文章",
                },
            };
            const timeline = {
                title: {
                    mainTitle: "讯息轨道",
                    subTitle: "Timeline",
                },
                rightButton: {
                    avatar: "assets/images/edit-pen.png",
                    alt: "发表新文章",
                    text: "文",
                    clickAction () {
                        window.show({
                            templateUrl: "src/windows/editor.html",
                            controller: "EditorController",
                            inputs: { options: null },
                        });
                    },
                },
                loadAction (params, callback) {
                    $http.get(`${apiEndpoint}article/latest`, { params }).then(response => {
                        callback(response);
                    }, response => {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    });
                },
                datetime: "outBlock",
                hasExpand: true,
                loadingLock: true,
                entries: [],
            };

            $http.get(`${apiEndpoint}article/latest`, {
                params: {
                    titleOnly: false,
                    take: utils.timelineLoadCount,
                    articleTypeFilter: "评,研,讯,谈,档",
                },
            }).then(response => {
                const articleList = response.data;
                timeline.noMoreArticle = articleList.length < utils.timelineLoadCount;
                if (articleList.length > 0) {
                    let timelineTimeout;
                    function createTimeoutFunction (entry) {
                        return () => {
                            if (!timelineTimeout) {
                                entry.show = true;
                                timelineTimeout = $timeout(() => {
                                }, utils.timelineShowDelay);
                            } else {
                                timelineTimeout = timelineTimeout.then(() => {
                                    entry.show = true;
                                    return $timeout(() => {}, utils.timelineShowDelay);
                                });
                            }
                        };
                    }

                    for (let i = 0; i < articleList.length; i++) {
                        const article = articleList[i];
                        const entry = {
                            types: [article.TypeName],
                            author: {
                                username: article.Author.UserName,
                                avatarUrl: article.Author.AvatarImage,
                                idCode: article.Author.IdCode,
                            },
                            voteForPoint: article.VoteForPoint,
                            vote: article.Vote,
                            sequenceNumber: article.SequenceNumber,
                            datetime: article.PublishTime,
                            title: article.Title,
                            summary: article.Content,
                            hasBackground: false,
                            thumbnail: article.ThumbnailImage,
                            hasThumbnail: true,
                            url: `/article/${article.Author.IdCode}/${article.SequenceNumberForAuthor}`,
                            count: {
                                like: article.LikeCount,
                                comment: article.CommentCount,
                            },
                        };
                        if (article.AttachedPoints && article.AttachedPoints.length > 0) {
                            entry.sources = {
                                type: "point",
                                points: article.AttachedPoints,
                            };
                        } else {
                            entry.sources = null;
                        }
                        timeline.entries.push(entry);
                        $timeout(createTimeoutFunction(entry));
                    }
                    if (timelineTimeout) {
                        timelineTimeout.then(() => {
                            timeline.loadingLock = false;
                        });
                    } else {
                        timeline.loadingLock = false;
                    }
                }
            }, response => {
                notification.error("发生未知错误，请重试或与站务职员联系", response);
                timeline.loadingLock = false;
            });

            union.timeline = timeline;
            union.summary = summary;
        },
    ]);
}());
