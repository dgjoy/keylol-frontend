(function () {
    class ArticleCommentsController {
        constructor (apiEndpoint, union, $http, utils, getAndFlushComments, notification, window) {
            $.extend(this, {
                apiEndpoint,
                union,
                $http,
                utils,
                getAndFlushComments,
                notification,
                window,
                article: union.article,
                comments: union.comments,
                hotComments: union.hotComments,
                pageElements: union.pageElements,
                textFocus: false,
                submitLock: false,
                comment: {},
            });
        }
        showRegistrationWindow () {
            this.window.show({
                templateUrl: "src/windows/registration.html",
                controller: "RegistrationController",
                inputs: { options: {} },
            });
        }
        showLoginSteamWindow () {
            this.window.show({
                templateUrl: "src/windows/login-steam.html",
                controller: "LoginSteamController",
            });
        }
        doComment () {
            if (this.comment.currentComment) {
                this.submitLock = true;
                this.$http.post(`${this.apiEndpoint}comment`, {
                    Content: this.comment.currentComment,
                    ArticleId: this.article.Id,
                    ReplyToCommentsSn: this.dealWithReply(this.comment.currentComment),
                }).then(response => {
                    this.notification.success("评论已发出");
                    this.submitLock = false;
                    this.comment.currentComment = "";
                    this.getAndFlushComments(this.article, response.data.SequenceNumberForArticle, "sequence");
                }, response => {
                    this.notification.error("评论发送失败", response);
                    this.submitLock = false;
                });
            }
        }
        reply (comment) {
            const sqNumber = comment.SequenceNumberForArticle;
            if (!this.comment.currentComment) {
                this.comment.currentComment = `#${sqNumber} `;
            } else {
                this.comment.currentComment += `\n#${sqNumber} `;
            }
            this.textFocus = true;
        }
        acknowledge (comment) {
            this.$http.post(`${this.apiEndpoint}like`, {
                TargetId: comment.Id,
                Type: "CommentLike",
            }).then(response => {
                if (response.data === "Free") {
                    this.notification.success("认可已生效，每日发出的前 5 个认可不会消耗文券");
                } else {
                    this.notification.success("认可已生效");
                    if (this.union.getUnreadLogs) {
                        this.union.getUnreadLogs();
                    }
                }
            }, response => {
                comment.Liked = false;
                comment.LikeCount -= 1;
                if (comment.LikeCount <= 0) {
                    comment.hasLike = false;
                }
                if (response.status === 401) {
                    this.notification.error("现有文券数量不足，无法发出认可");
                } else {
                    this.notification.error("认可评论失败", response);
                }
            });
            comment.Liked = true;
            comment.hasLike = true;
            comment.LikeCount += 1;
        }
        cancelAcknowledge (comment) {
            this.$http.delete(`${this.apiEndpoint}like`, {
                params: {
                    targetId: comment.Id,
                    type: "CommentLike",
                },
            }).then(() => {
                this.notification.success("此认可已被撤销");
            }, response => {
                this.notification.error("取消认可评论失败", response);
            });
            comment.Liked = false;
            comment.LikeCount -= 1;
            if (comment.LikeCount <= 0) {
                comment.hasLike = false;
            }
        }
        dealWithReply (str) {
            const regExpForComment = /^((?:#\d+[ \t]*)+)(?:$|[ \t]+)/gm;
            const regExpForEachLine = /(\d+)/g;
            const m = str.match(regExpForComment);
            let replyCommentArray = [];
            if (m) {
                if (m.length > 1) {
                    replyCommentArray = m.reduce((preValue, currValue) => {
                        let preValueTem = preValue;
                        if (typeof preValue === "string") {
                            preValueTem = preValue.match(regExpForEachLine);
                        }
                        const currValueTem = currValue.match(regExpForEachLine);
                        return preValueTem.concat(currValueTem);
                    });
                } else {
                    replyCommentArray = m[0].match(regExpForEachLine);
                }
            }
            replyCommentArray = this.utils.arrayUnique(replyCommentArray).map(s => {
                return parseInt(s);
            });
            if (replyCommentArray.length > 1) {
                return replyCommentArray.reduce((preValue, currValue) => {
                    let valueArr = preValue;
                    if (typeof preValue == "number") {
                        valueArr = [preValue];
                    }
                    if (currValue > this.union.article.totalComments) {
                        return valueArr;
                    }
                    valueArr.push(currValue);
                    return valueArr;
                });
            } else if (replyCommentArray.length === 1) {
                if (replyCommentArray[0] > this.union.article.totalComments) {
                    return [];
                }
            }
            return replyCommentArray;
        }
    }

    keylolApp.component("articleComments", {
        templateUrl: "src/sections/article-comments.html",
        controller: ArticleCommentsController,
        controllerAs: "articleComments",
    });
}());
