(function () {
    "use strict";

    function missiveTextReduce(text, n) {
        return text.length > n?text.substr(0,n) + "…":text;
    }

    keylolApp.constant("messageTypes", {
        ArticleLike: {
            type: "认可",
            backgroundUrl: "keylol://0abeafd8e4c049bce860686bc4c04829.jpg",
            getContent: function () {
                return "认可文章";
            }
        },
        CommentLike: {
            type: "认可",
            backgroundUrl: "keylol://0abeafd8e4c049bce860686bc4c04829.jpg",
            getContent: function () {
                return "认可评论";
            }
        },
        ArticleComment: {
            type: "评论",
            backgroundUrl: "keylol://672a1bab71b9af43215d252471a893e0.jpg",
            getContent: function (message) {
                return message.Comment.Content;
            }
        },
        CommentReply: {
            type: "评论",
            backgroundUrl: "keylol://672a1bab71b9af43215d252471a893e0.jpg",
            getContent: function (message) {
                return message.Comment.Content;
            }
        },
        ArticleArchive: {
            type: "公函",
            name: "封存通告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "你的文章《" + missiveTextReduce(message.Article.Title, 14) + "》已被封存，封存后该文章的内容和所有评论会被隐藏，同时这篇文章不会再显示于任何信息轨道上，你和站务职员仍然可以查看被隐藏的内容。";
            }
        },
        ArticleArchiveCancel: {
            type: "公函",
            name: "封存撤销通告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "文章《" + missiveTextReduce(message.Article.Title, 14) + "》的封存已被撤销，该文章的内容和所有评论已重新公开，讯息轨道将不再隐藏这篇文章。";
            }
        },
        CommentArchive: {
            type: "公函",
            name: "封存通告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "你在《" + missiveTextReduce(message.Article.Title, 14) + "》中的评论「" + missiveTextReduce(message.Comment.Content, 14) + "」已被封存，封存后此则评论的内容和作者信息会被隐藏，你和站务职员仍然可以查看被隐藏的内容。";
            }
        },
        CommentArchiveCancel: {
            type: "公函",
            name: "封存撤销通告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "文章《" + missiveTextReduce(message.Article.Title, 14) + "》下评论「" + missiveTextReduce(message.Comment.Content, 14) + "」的封存已被撤销，此则评论的内容和作者信息已重新公开。";
            }
        },
        Rejection: {
            type: "公函",
            name: "退稿函",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "很遗憾，你的文章《" + missiveTextReduce(message.Article.Title, 14) + "》已被退稿，不会再出现于其他用户或据点的讯息轨道上，这篇文章后续的投稿也将被自动回绝。其他用户仍然可以直接通过链接继续访问这篇文章。";
            }
        },
        RejectionCancel: {
            type: "公函",
            name: "退稿撤销通告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "文章《" + missiveTextReduce(message.Article.Title, 14) + "》的退稿限制已被撤销，其他用户首页的讯息轨道将不再隐藏这篇文章，后续的投稿也不再会被其他据点回绝。";
            }
        },
        Spotlight: {
            type: "公函",
            name: "萃选录入函",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "感谢你对其乐社区质量的认可与贡献！你的文章《" + missiveTextReduce(message.Article.Title, 14) + "》已被推荐为萃选文章，此文章将会展示在全站的「萃选文章」栏目中，萃选展现周期为 14 天。";
            }
        },
        SpotlightCancel: {
            type: "公函",
            name: "萃选撤销通告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "文章《" + missiveTextReduce(message.Article.Title, 14) + "》的萃选推荐已被撤销，该文章已经提前从「萃选文章」栏目撤下。";
            }
        },
        ArticleWarning: {
            type: "公函",
            name: "惩教警告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "你的文章《" + missiveTextReduce(message.Article.Title, 14) + "》已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。";
            }
        },
        ArticleWarningCancel: {
            type: "公函",
            name: "警告撤销通告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "文章《" + missiveTextReduce(message.Article.Title, 14) + "》的警告已被撤销，之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。";
            }
        },
        CommentWarning: {
            type: "公函",
            name: "惩教警告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "你在《" + missiveTextReduce(message.Article.Title, 14) + "》中的评论「" + missiveTextReduce(message.Comment.Content, 14) + "」已被警告，若在 30 天之内收到两次警告，你的账户将被自动停权 14 天。该次警告已被录入统计中，请在此期间谨慎言行。";
            }
        },
        CommentWarningCancel: {
            type: "公函",
            name: "警告撤销通告",
            backgroundUrl: "keylol://dd9c2f138c5c4f06d5e0fdba8185b963.jpg",
            getContent: function (message) {
                return "文章《" + missiveTextReduce(message.Article.Title, 14) + "》下评论「" + missiveTextReduce(message.Comment.Content, 14) + "」收到的警告已被撤销，之前的警告将不再纳入停权计数器的考量中，除非你的账户已经因收到警告而被自动停权。";
            }
        }
    });
})();