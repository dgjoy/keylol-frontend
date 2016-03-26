(function () {
    "use strict";

    keylolApp.constant("moderationText", {
        Archived: {
            mainTitle: "封存",
            subTitleForArticle: "封存后只有作者与站务职员可以看到文章内容",
            subTitleForComment: "封存后只有作者与站务职员可以看到评论内容和作者信息",
            reasonTexts: ["政治敏感信息", "淫秽信息或引起生理反感", "不友善言行", "内容空洞", "未经许可的推广", "言论不尊重版权", "转载不符合规范"]
        },
        UnArchived: {
            mainTitle: "撤销封存",
            subTitleForArticle: "重新开放文章访问",
            subTitleForComment: "重新开放评论访问"
        },
        Rejected: {
            mainTitle: "退稿",
            subTitle: "退稿后只能通过链接或者作者的个人页面访问文章",
            reasonTexts: ["内容空洞", "转载不符合规范"]
        },
        UnRejected: {
            mainTitle: "撤销退稿",
            subTitle: "重新允许文章投稿，并开放公共访问渠道"
        },
        Warned: {
            mainTitle: "警告",
            subTitle: "在 30 天之内连续收到两次警告会被自动停权",
            reasonTexts: ["政治敏感信息", "淫秽信息或引起生理反感", "不友善言行", "内容空洞", "未经许可的推广", "言论不尊重版权", "转载不符合规范"]
        },
        UnWarned: {
            mainTitle: "撤销警告",
            subTitle: "收回之前的警告和停权计数器的累计"
        },
        Spotlight: {
            mainTitle: "萃选",
            subTitle: "在「萃选文章」栏目中展示文章 14 天"
        },
        UnSpotlight: {
            mainTitle: "撤销萃选",
            subTitle: "手动从「萃选文章」栏目撤下文章"
        }
    });
})();