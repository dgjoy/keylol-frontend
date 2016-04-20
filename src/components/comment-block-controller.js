(function () {
    //fixme: 评论不能进行操作
    class CommentBlockController {
        constructor (union) {
            const _comment = this.comment;
            this.comment = undefined;
            _comment.union = union;
            $.extend(this, _comment);
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
                    targetId: this.Id,
                    type: {
                        isCancel,
                        this,
                        action: type,
                        target: "Comment",
                    },
                },
            });
        }
    }

    keylolApp.component("commentBlock", {
        templateUrl: "src/components/comment-block.html",
        controller: CommentBlockController,
        controllerAs: "comment",
        bindings: {
            comment: "<",
            isHot: "<",
            onReply: "&",
            onAcknowledge: "&",
            onCancelAcknowledge: "&",
        },
    });
}());
