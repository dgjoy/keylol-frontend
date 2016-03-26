(function () {
    "use strict";

    keylolApp.constant("moderationResult", {
        Archived: {
            mainTitle: "这篇文章已被封存",
            subTitle: "封存后只有作者和站务人员可以看到文章内容",
            fromSection: {
                chineseName: "编辑科",
                englishName: "Proofreading Services Section",
                logo: "assets/images/proofread.png"
            }
        },
        Rejected: {
            mainTitle: "这篇文章已被退稿",
            subTitle: "退稿后只能通过链接或者作者的个人页面访问文章",
            fromSection: {
                chineseName: "编辑科",
                englishName: "Proofreading Services Section",
                logo: "assets/images/proofread.png"
            }
        },
        Warned: {
            mainTitle: "这篇文章已被警告",
            subTitle: "作者因违反用户守则而收到乙次惩教警告",
            fromSection: {
                chineseName: "惩教科",
                englishName: "Correctional Services Section",
                logo: "assets/images/correction.png"
            }
        },
        Spotlight: {
            mainTitle: "萃选文章",
            subTitle: "由社区职员推荐阅读的文章",
            fromSection: {
                chineseName: "编辑科",
                englishName: "Proofreading Services Section",
                logo: "assets/images/proofread.png"
            }
        }
    });
})();