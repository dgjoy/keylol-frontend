(function () {
    class ArticleContentController {
        constructor (union, $http, notification) {
            $.extend(this, {
                apiEndpoint,
                union,
                $http,
                notification,
                article: union.article,
            });
        }
        acknowledge () {
            this.$http.post(`${this.apiEndpoint}like`, {
                TargetId: this.article.Id,
                Type: "ArticleLike",
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
                this.article.LikeCount -= 1;
                this.article.Liked = false;
                if (response.status === 401) {
                    this.notification.error("现有文券数量不足，无法发出认可");
                } else {
                    this.notification.error("认可失败", response);
                }
            });
            this.article.Liked = true;
            this.article.LikeCount += 1;
        }
        cancelAcknowledge () {
            this.$http.delete(`${this.apiEndpoint}like`, {
                params: {
                    targetId: this.article.Id,
                    type: "ArticleLike",
                },
            }).then(() => {
                this.notification.success("此认可已被撤销");
            }, response => {
                this.article.Liked = true;
                this.article.LikeCount += 1;
                this.notification.error("取消认可失败", response);
            });
            this.article.Liked = false;
            this.article.LikeCount -= 1;
        }
    }

    keylolApp.component("articleContent", {
        templateUrl: "src/sections/article-content.html",
        controller: ArticleContentController,
        controllerAs: "articleContent",
    });
}());
