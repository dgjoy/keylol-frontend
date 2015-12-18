(function () {
    "use strict";

    keylolApp.controller("PointInfoController", [
        "$scope", "union", "window", "utils",
        function ($scope, union, window, utils) {
            $scope.utils = utils;
            $scope.showShortReviewWindow = function () {
                window.show({
                    templateUrl: "components/windows/short-review.html",
                    controller: "ShortReviewController"
                });
                return true;
            };
            $scope.data = {
                mainDesc: "《DOTA2》，是脱离了其上一代作品《DOTA》所依赖的War3的引擎，由《DOTA》的地图核心制作者IceFrog（冰蛙）联手美国Valve公司使用他们的Source引擎研发的、Valve运营，完美世界代理（国服），韩国NEXON代理（韩服）的多人联机对抗RPG。",
                isGame: false,
                cover: "http://th08.deviantart.net/fs70/PRE/i/2013/071/1/8/dota_2_wallpaper_by_deviantartspeedfreak-d5u5agi.jpg",
                relatedList: [
                    {
                        text: "此流派的游戏",
                        count: 314
                    },
                    {
                        text: "此特性的游戏",
                        count: 314
                    },
                    {
                        text: "此系列的游戏",
                        count: 314
                    }
                ],
                attributes: [
                    {
                        title: "开发厂",
                        points: [
                            {
                                IdCode: "VALVE",
                                PreferredName: "Chinese",
                                ChineseName: "威乐"
                            }
                        ]
                    },
                    {
                        title: "发行商",
                        points: [
                            {
                                IdCode: "VALVE",
                                PreferredName: "Chinese",
                                ChineseName: "威乐"
                            },
                            {
                                IdCode: "VALVE",
                                PreferredName: "Chinese",
                                ChineseName: "完美世界"
                            },
                            {
                                IdCode: "VALVE",
                                PreferredName: "Chinese",
                                ChineseName: "NEXON"
                            }
                        ]
                    },
                    {
                        title: "系列",
                        points: [
                            {
                                IdCode: "CSXGO",
                                PreferredName: "Chinese",
                                ChineseName: "守护遗迹系列"
                            }
                        ]
                    },
                    {
                        title: "流派",
                        points: [
                            {
                                IdCode: "MOLBA",
                                PreferredName: "Chinese",
                                ChineseName: "MOBA"
                            }
                        ]
                    },
                    {
                        title: "特性",
                        points: [
                            {
                                IdCode: "MOLBA",
                                PreferredName: "Chinese",
                                ChineseName: "MOBA"
                            },
                            {
                                IdCode: "MOLBA",
                                PreferredName: "Chinese",
                                ChineseName: "MOBA"
                            },
                            {
                                IdCode: "MOLBA",
                                PreferredName: "Chinese",
                                ChineseName: "MOBA"
                            },
                            {
                                IdCode: "MOLBA",
                                PreferredName: "Chinese",
                                ChineseName: "MOBA"
                            },
                            {
                                IdCode: "MOLBA",
                                PreferredName: "Chinese",
                                ChineseName: "MOBA"
                            },
                            {
                                IdCode: "MOLBA",
                                PreferredName: "Chinese",
                                ChineseName: "MOBA"
                            },
                            {
                                IdCode: "MOLBA",
                                PreferredName: "Chinese",
                                ChineseName: "MOBA"
                            }
                        ]
                    },
                    {
                        title: "别名",
                        text: "倒塔、信仰2、鱼塘"
                    },
                    {
                        title: "面市",
                        text: "2013-07-09"
                    },
                    {
                        title: "平台",
                        points: [
                            {
                                IdCode: "STEAM",
                                PreferredName: "Chinese",
                                ChineseName: "Steam"
                            }
                        ]
                    },
                    {
                        title: "次要平台",
                        points: [
                            {
                                IdCode: "STEAM",
                                PreferredName: "Chinese",
                                ChineseName: "Steam"
                            }
                        ]
                    }
                ]
            }
        }
    ]);
})();