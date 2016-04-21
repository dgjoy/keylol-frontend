(function () {
    class CommentBlockController {
        constructor (union, $http, apiEndpoint, notification) {
            $.extend(this, {
                union,
                $http,
                apiEndpoint,
                notification,
            });
        }
        moderateComment (event, type, isCancel) {
            this.showModerationPopup({
                event,
                templateUrl: "src/popup/moderation.html",
                controller: "ModerationController as moderation",
                attachSide: "left",
                align: "top",
                offsetX: 710,
                offsetY: 25,
                inputs: {
                    targetId: this.comment.Id,
                    type: {
                        isCancel,
                        comment: this.comment,
                        action: type,
                        target: "Comment",
                    },
                },
            });
        }
        acknowledge () {
            this.$http.post(`${this.apiEndpoint}like`, {
                TargetId: this.comment.Id,
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
                this.comment.Liked = false;
                this.comment.LikeCount -= 1;
                if (this.comment.LikeCount <= 0) {
                    this.comment.hasLike = false;
                }
                if (response.status === 401) {
                    this.notification.error("现有文券数量不足，无法发出认可");
                } else {
                    this.notification.error("认可评论失败", response);
                }
            });
            this.comment.Liked = true;
            this.comment.hasLike = true;
            this.comment.LikeCount += 1;
        }
        cancelAcknowledge () {
            this.$http.delete(`${this.apiEndpoint}like`, {
                params: {
                    targetId: this.comment.Id,
                    type: "CommentLike",
                },
            }).then(() => {
                this.notification.success("此认可已被撤销");
            }, response => {
                this.notification.error("取消认可评论失败", response);
            });
            this.comment.Liked = false;
            this.comment.LikeCount -= 1;
            if (this.comment.LikeCount <= 0) {
                this.comment.hasLike = false;
            }
        }
    }

    keylolApp.component("commentBlock", {
        templateUrl: "src/components/comment-block.html",
        controller: CommentBlockController,
        controllerAs: "commentBlock",
        bindings: {
            comment: "<",
            articleArchived: "<",
            onReply: "&",
        },
    });
}());
