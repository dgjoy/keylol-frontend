(function () {
    "use strict";

    keylolApp.constant("articleTypes", [
        {
            name: "评",
            description: "感悟、心得、体验、报告",
            allowVote: true
        },
        {
            name: "研",
            description: "攻略、技术、成就、教程",
            allowVote: false
        },
        {
            name: "讯",
            description: "新闻、购物、更新、竞技",
            allowVote: false
        },
        {
            name: "谈",
            description: "聊天、灌水、吐槽、杂文",
            allowVote: false
        },
        {
            name: "档",
            description: "声画、模组、插件、汉化",
            allowVote: false
        }
    ]);
})();