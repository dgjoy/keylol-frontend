(function() {
    "use strict";

    keylolApp.controller("HomeController", [
        "pageTitle", "$scope", "union",
		function(pageTitle, $scope, union) {
            pageTitle.set("其乐");
            union.timeline = {
                title: {
                    mainTitle: "讯息轨道",
                    subTitle: "Timeline"
                },
                rightButton: {
                    avatar: "assets/images/edit-pen.png",
                    alt: "发表新文章",
                    href: "test"
                },
                entries: [
                    {
                        types: ["评测", "好评"],
                        sources: [
                            {
                                name: "战地：硬仗",
                                url: "test"
                            },
                            {
                                name: "战地系列",
                                url: "test"
                            }
                        ],
                        author: {
                            username: "crakyGALU",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        datetime: moment().subtract(1, "seconds"),
                        title: "代工就是不如原厂：这硬仗真的是打的艰辛",
                        summary: "说起这个警匪死磕的话，相比正玩家们没有不知道那大名鼎鼎的CF啊不对CS，也就是《反恐精英（Counter-Strike）》，这款游戏的出现让警匪对殴的模式风靡全球，至今依然有大批玩家热衷于此，除此之外类似的游戏也有不少，例如《彩虹六号系列》，例如《收获日系列》等等，如今FPS界极其有影响力的战地系列也开始涉及此类题材，眼下BETA版本已经开始测试，本篇评测是根据测试版而来，所以并不代表游戏的最终品质！",
                        url: "test",
                        thumbnail: "//keylol.b0.upaiyun.com/ffc1c0643b2857caa83ec2cf254e510f.jpg!timeline.thumbnail",
                        count: {
                            like: 666,
                            comment: 222
                        }
                    },
                    {
                        types: ["模组"],
                        sources: [
                            {
                                name: "战地：硬仗",
                                url: "test"
                            }
                        ],
                        author: {
                            username: "crakyGALU",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        datetime: moment().subtract(1, "hours").subtract(34, "minutes"),
                        title: "代工就是不如原厂：这硬仗真的是打的艰辛 字数补丁字数补丁字数补丁字数补丁字数补丁字数补丁字数补丁",
                        summary: "说起这个警匪死磕的话，相比正玩家们没有不知道那大名鼎鼎的CF啊不对CS，也就是《反恐精英（Counter-Strike）》，这款游戏的出现让警匪对殴的模式风靡全球，至今依然有大批玩家热衷于此，除此之外类似的游戏也有不少，例如《彩虹六号系列》，例如《收获日系列》等等，如今FPS界极其有影响力的战地系列也开始涉及此类题材，眼下BETA版本已经开始测试，本篇评测是根据测试版而来，所以并不代表游戏的最终品质！",
                        url: "test",
                        count: {
                            like: 666,
                            comment: 222
                        }
                    },
                    {
                        types: ["资讯"],
                        author: {
                            username: "crakyGALU",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        sources: [
                            {
                                name: "战地：硬仗",
                                url: "test"
                            }
                        ],
                        datetime: moment().subtract(3, "days"),
                        title: "代工就是不如原厂：这硬仗真的是打的艰辛",
                        summary: "说起这个警匪死磕的话，相比",
                        url: "test",
                        thumbnail: "//keylol.b0.upaiyun.com/da6d364b68257cb921c071d4cea66576.jpg!timeline.thumbnail",
                        count: {
                            like: 666,
                            comment: 222
                        }
                    },
                    {
                        types: ["评测", "差评"],
                        author: {
                            username: "crakyGALU字数补丁字数补丁字数补丁",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        sources: [
                            {
                                name: "战地：硬仗",
                                url: "test"
                            }
                        ],
                        datetime: moment().subtract(1, "years"),
                        title: "代工就是不如原厂：这硬仗真的是打的艰辛 字数补丁字数补丁字数补丁字数补丁字数补丁字数补丁",
                        summary: "说起这个警匪死磕的话，相比正玩家们没有不知道那大名鼎鼎的CF啊不对CS，也就是《反恐精英（Counter-Strike）》",
                        url: "test",
                        count: {
                            like: 666,
                            comment: 222
                        }
                    }
                ]
            };
        }
    ]);
})();