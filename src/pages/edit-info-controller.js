(function () {
    class EditInfoController {
        constructor ($scope, pageHead, stateTree) {
            pageHead.setTitle('据点 - 编辑 - 资料 - 其乐');

            $scope.basicInfo = {
                header: {
                    mainTitle: '基本信息',
                    subTitle: '介绍据点的游戏主体',
                },
                list: [
                    {
                        title: '类型',
                        content: '游戏据点',
                        editDisabled: true,
                    },
                    {
                        title: '据点识别码',
                        content: 'DOTA2',
                        editDisabled: true,
                    },
                    {
                        title: '中文名',
                        content: '刀塔',
                    },
                    {
                        title: '外文名',
                        content: 'Dota 2',
                    },
                    {
                        title: '中文索引',
                        subTitle: '用中文搜索时的匹配关键字',
                    },
                    {
                        title: '英文索引',
                        subTitle: '用英文搜索时的匹配关键字',
                    },
                ],
            };
            $scope.ways = {
                header: {
                    mainTitle: '渠道',
                    subTitle: '游戏的分发方式',
                },
                list: [
                    {
                        title: '载体或平台',
                        content: 'Valve、完美世界',
                    },
                    {
                        title: 'Steam 商店链接',
                        subTitle: '商店价格会定期自动同步',
                        content: 'http://store.steampowered.com/app/570/',
                    },
                    {
                        title: '杉果商店链接',
                        subTitle: '商店价格会定期自动同步',
                    },
                ],
            };
            $scope.relative = {
                header: {
                    mainTitle: '关联',
                    subTitle: '厂商、类型和系列信息',
                },
                list: [
                    {
                        title: '要素',
                        content: '多人游戏、合作',
                    },
                    {
                        title: '开发厂',
                        content: 'Valve',
                    },
                    {
                        title: '发行商',
                        content: 'Valve',
                    },
                    {
                        title: '代理',
                        content: '完美世界',
                    },
                    {
                        title: '流派',
                        content: '免费游戏、动作、策略',
                    },
                    {
                        title: '特性',
                        content: '团队导向、免费游戏、多人、MOBA、策略',
                    },
                    {
                        title: '系列',
                        content: '信仰',
                    },
                ],
            };
            $scope.schedule = {
                header: {
                    mainTitle: '日程表',
                    subTitle: '公众事件的时间',
                },
                list: [
                    {
                        title: '据点成立',
                        content: '2015-11-31',
                    },
                    {
                        title: '公开',
                        content: '2010-10-13',
                    },
                    {
                        title: '预售',
                        content: '2011-07-05',
                    },
                    {
                        title: '正式发行',
                        content: '2013-7-9',
                    },
                ],
            };
            $scope.language = {
                header: {
                    mainTitle: '原生语言',
                    subTitle: '游戏分发时的默认语言',
                },
                list: [
                    {
                        title: '英语',
                        content: '界面、字幕、配音',
                    },
                    {
                        title: '日语',
                        content: '界面、字幕、配音',
                    },
                    {
                        title: '简体中文',
                        content: '界面、字幕、配音',
                    },
                    {
                        title: '繁体中文',
                        content: '界面、字幕、配音',
                    },
                ],
            };
            $scope.chinese = {
                header: {
                    mainTitle: '华语可用度',
                    subTitle: '游戏对中文的支持程度',
                },
                list: [
                    {
                        title: '天邈汉化链接',
                    },
                    {
                        title: '蒹葭汉化链接',
                    },
                    {
                        title: '起源汉化链接',
                    },
                ],
            };

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('EditInfoController', EditInfoController);
}());
