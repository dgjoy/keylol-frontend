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
        }
    });
})();