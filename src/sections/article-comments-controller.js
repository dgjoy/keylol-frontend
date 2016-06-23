(function () {
    class ArticleCommentsController {
        constructor (stateTree, $http, apiEndpoint, $element, $timeout, notification, union, window) {
            $.extend(this, {
                stateTree,
                $http,
                apiEndpoint,
                $element,
                $timeout,
                notification,
                window,
            });

            this.currentPage = 1;
            this.vm = {
                articleId: this.article.id,
                content: '',
            };

            console.log(this.article.comments);

            this.setCommentsHeight();

            union.updateCommentsHeight = () => {
                this.setCommentsHeight();
            };
        }

        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/content/article/comments`,{
                    params: {
                        article_id: this.article.id,
                        page: newPage,
                    },
                }).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.article.comments = response.data;
                    this.changePageLock = false;
                    this.setCommentsHeight();
                }, response => {
                    this.changePageLock = false;
                });
            }
            return true;
        }

        setCommentsHeight () {
            this.$timeout(() => {
                this.commentsHeight = this.$element.find('.comments>ul').height();
            });
        }

        reply (comment) {
            this.replyToComment = comment;

            $('html, body').animate({
                scrollTop: this.$element.find('.sender').offset().top - 64,
            });
        }

        cancelReply () {
            delete this.replyToComment;
        }

        edit ($index) {
            this.window.show({
                templateUrl: 'src/windows/comment-editor.html',
                controller: 'CommentEditorController',
                controllerAs: 'commentEditor',
                inputs: {
                    comment: this.article.comments[$index],
                    theme: this.theme,
                    options: {
                        isGame: this.article.pointBasicInfo.type === 'game',
                    },
                },
            }).then(window => {
                return window.close;
            }).then(result => {
                if (result) {
                    this.article.comments[$index] = result;
                }
            });
        }

        submit () {
            if (this.submitLock) return;
            this.submitLock = true;

            if (this.replyToComment) {
                this.vm.replyToComment = this.replyToComment.sidForArticle;
            } else {
                delete this.vm.replyToComment;
            }

            this.$http.post(`${this.apiEndpoint}article-comment`, this.vm).then(response => {
                this.notification.success({ message: '发送评论成功' });
                this.article.comments.push({
                    authorAvatarImage: this.stateTree.currentUser.avatarImage,
                    authorIdCode: this.stateTree.currentUser.idCode,
                    authorUserName: this.stateTree.currentUser.userName,
                    content: this.vm.content,
                    likeCount: 0,
                    publishTime: new Date().toISOString(),
                    sidForArticle: response.data,
                    replyToComment: this.replyToComment,
                });
                this.vm = {
                    articleId: this.article.id,
                    content: '',
                };
                delete this.replyToComment;
                this.setCommentsHeight();
                this.article.commentPageCount = Math.floor((response.data - 1) / 10) + 1;
                this.article.commentCount = response.data;
                this.article.latestCommentTime = this.article.comments[this.article.comments.length - 1].publishTime;
                this.submitLock = false;
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }
    }

    keylolApp.component('articleComments', {
        templateUrl: 'src/sections/article-comments.html',
        controller: ArticleCommentsController,
        controllerAs: 'articleComments',
        bindings: {
            article: '<',
            theme: '<',
        },
    });
}());
