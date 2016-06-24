(function () {
    class CommentEditorController {
        constructor(stateTree, close, comment, theme, $http, apiEndpoint, notification, options) {
            $.extend(this, {
                stateTree,
                close,
                comment,
                theme,
                $http,
                apiEndpoint,
                notification,
                options,
            });

            this.vm = {
                content: comment.content,
            };
            this.replyToComment = comment.replyToComment;
        }

        cancelReply () {
            delete this.replyToComment;
        }

        submit () {
            if (this.submitLock) return;
            this.submitLock = true;

            if (this.replyToComment) {
                this.vm.replyToComment = this.replyToComment.sidForArticle;
            } else {
                delete this.vm.replyToComment;
            }

            this.$http.put(`${this.apiEndpoint}article-comment/${this.comment.id}`, this.vm).then(response => {
                this.notification.success({ message: '修改评论成功' });
                this.comment.content = this.vm.content;
                if (!this.replyToComment) {
                    delete this.comment.replyToComment;
                }
                this.close(this.comment);
                this.submitLock = false;
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }
    }

    keylolApp.controller('CommentEditorController', CommentEditorController);
}());
