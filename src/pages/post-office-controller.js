/**
 * Created by Rex on 15/9/23.
 */
(function () {
    keylolApp.controller('PostOfficeController', [
        'pageHead', '$scope', 'union', '$http', 'notification', '$routeParams', 'utils',
        '$timeout', '$location', 'messageTypes', 'window',
        (pageHead, $scope, union, $http, notification, $routeParams, utils,
        $timeout, $location, messageTypes, window) => {
            if (!union.$localStorage.user) {
                $location.url('/');
                return;
            }
            $scope.union = union;
            let filter;
            if ($routeParams.type) {
                if ($routeParams.type === 'acknowledgement') {
                    pageHead.setTitle('邮政中心 - 认可 - 其乐');
                    filter = 'Like';
                    union.spolightActive = 0;
                } else if ($routeParams.type === 'comment') {
                    pageHead.setTitle('邮政中心 - 评论 - 其乐');
                    filter = 'Comment';
                    union.spolightActive = 1;
                } else if ($routeParams.type === 'missive') {
                    pageHead.setTitle('邮政中心 - 公函 - 其乐');
                    filter = 'Missive';
                    union.spolightActive = 2;
                } else {
                    $scope.notFound = true;
                }
            } else {
                pageHead.setTitle('邮政中心 - 其乐');
            }

            const timeline = {
                title: {
                    mainTitle: '邮政中心',
                    subTitle: 'Post Office',
                },
                loadAction () {
                    if (timeline) {
                        timeline.loadingLock = true;
                        getMessages(timeline.entries.length);
                    }
                },
                loadingLock: true,
                notArticle: true,
                hasDeleteButton: true,
                clickable: true,
                entries: [],
            };

            getMessages();

            function getMessages(skip = 0) {
                if (!skip) {
                    timeline.entries.length = 0;
                }
                $http.get(`${apiEndpoint}message`, {
                    params: {
                        filter,
                        skip,
                        take: utils.timelineLoadCount,
                    },
                }).then(response => {
                    timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
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
                    for (let i = 0; i < response.data.length; i++) {
                        const message = response.data[i];
                        const entryType = messageTypes[message.Type];
                        const entry = {
                            id: message.Id,
                            isNew: message.Unread,
                            disabled: !message.Unread && !$routeParams.type,
                            types: [entryType.type],
                            fromArticle: {
                                id: message.Article.Id,
                                fromComment: (message.Type === 'CommentLike') || (message.Type === 'CommentReply'),
                                text: message.Article.Title,
                                href: `article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}`,
                            },
                            targetCommentId: message.Comment ? message.Comment.Id : undefined,
                            datetime: message.CreateTime,
                            author: message.Operator ? {
                                username: message.Operator.UserName,
                                avatarUrl: message.Operator.AvatarImage,
                                idCode: message.Operator.IdCode,
                            } : {
                                username: '其乐职员团队',
                                avatarUrl: 'keylol://1f414be0769957946950b073d468ce77.png',
                                isStaffTeam: true,
                            },
                            hasBackground: true,
                            background: entryType.backgroundUrl,
                            isMissive: entryType.type === '公函',
                            missiveName: entryType.name,
                            summary: entryType.getSummary(message),
                        };
                        if (entryType.type === '公函') {
                            entry.clickAction = function () {
                                window.show({
                                    templateUrl: 'src/windows/missive.html',
                                    controller: 'MissiveController',
                                    inputs: { message },
                                });
                            };
                        } else {
                            const commentSuffix = message.Comment ? `#${message.Comment.SequenceNumberForArticle}` : '';
                            entry.url = `article/${message.Article.AuthorIdCode}/${message.Article.SequenceNumberForAuthor}${commentSuffix}`;
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
                }, response => {
                    notification.error('发生未知错误，请重试或与站务职员联系', response);
                    timeline.loadingLock = false;
                });
            }

            union.timeline = timeline;
        },
    ]);
}());
