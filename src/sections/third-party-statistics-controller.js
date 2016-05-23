(function () {
    class ThirdPartyStatisticsController {
        constructor () {
            this.tabArray = [
                { name:'玩家数目' },
                { name:'在档时间' },
            ];
            this.currentPage = 0;
            this.datas = [
                {
                    name: 'player-count',
                    main: {
                        name: '记录售出',
                        main: '754,488',
                        sub: '±21,447',
                    },
                    sub: [
                        {
                            name: '玩家总数',
                            main: '743,459',
                            sub: '±20,969',
                        },
                        {
                            name: '十五日活跃玩家',
                            main: '274,797',
                            sub: '±12,758',
                        },
                        {
                            name: '是日同时在线',
                            main: '11,357',
                        },
                        {
                            name: '纯收藏买家',
                            main: '11,029',
                            sub: '1.4%',
                        },
                        {
                            name: '迄今玩家流失',
                            main: '468,662',
                            sub: '63.0%',
                        },
                        {
                            name: '骨灰玩家',
                            main: '274,797',
                            sub: '±12,758',
                        },
                    ],
                },
                {
                    name: 'play-time',
                    main: {
                        name: '其乐人均在档',
                        main: '1.7',
                        sub: '小时',
                    },
                    sub: [
                        {
                            name: '全网平均在档',
                            main: '74.33',
                            sub: '分钟',
                        },
                        {
                            name: '中流玩家预计在档',
                            main: '47.59',
                            sub: '分钟',
                        },
                        {
                            name: '每周平均启动时长',
                            main: '8.07',
                            sub: '分钟',
                        },
                        {
                            name: '预计每分钟消费',
                            main: '3.81',
                            sub: 'CNY',
                        },
                        {
                            name: '预计每 ¥ 1 换取',
                            main: '0.26',
                            sub: '分钟的游戏',
                        },
                    ],
                },
            ];
        }

        changeTab (i) {
            if (i !== this.currentPage) {
                this.currentPage = i;
            }
        }
    }

    keylolApp.component('thirdPartyStatistics', {
        templateUrl: 'src/sections/third-party-statistics.html',
        controller: ThirdPartyStatisticsController,
        controllerAs: 'thirdPartyStatistics',
        bindings: {
            theme: '<',
        },
    });
}());
