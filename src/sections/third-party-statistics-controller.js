(function () {
    class ThirdPartyStatisticsController {
        constructor ($scope) {
            this.tabArray = [
                { name:'玩家数目' },
                { name:'在档时间' },
            ];
            this.currentPage = 0;

            function toPercent(num, offset) {
                return `${(num * 100).toFixed(offset)}%`;
            }

            this.datas = [
                {
                    name: 'player-count',
                    main: {
                        name: '记录售出',
                        main: this.intel.ownerCount,
                        sub: `±${this.intel.ownerCountVariance}`,
                    },
                    sub: [
                        {
                            name: '玩家总数',
                            main: this.intel.totalPlayerCount,
                            sub: `±${this.intel.totalPlayerCountVariance}`,
                        },
                        {
                            name: '十五日活跃玩家',
                            main: this.intel.twoWeekPlayerCount,
                            sub: '±12,758(!)',
                        },
                        {
                            name: '是日同时在线',
                            main: this.intel.ccu,
                        },
                        {
                            name: '纯收藏买家',
                            main: this.intel.ownerCount - this.intel.totalPlayerCount,
                            sub: toPercent((this.intel.ownerCount - this.intel.totalPlayerCount) / this.intel.ownerCount,1),
                        },
                        {
                            name: '迄今玩家流失',
                            main: this.intel.totalPlayerCount - this.intel.twoWeekPlayerCount,
                            sub: toPercent((this.intel.totalPlayerCount - this.intel.twoWeekPlayerCount) / this.intel.totalPlayerCount,1),
                        },
                        {
                            name: '骨灰玩家',
                            main: parseInt((this.intel.ccu / this.intel.twoWeekPlayerCount) * this.intel.totalPlayerCount),
                            sub: '±12,758(!)',
                        },
                    ],
                },
                {
                    name: 'play-time',
                    main: {
                        name: '其乐人均在档',
                        main: this.basicInfo.keylolAveragePlayedTime,
                        sub: '小时',
                    },
                    sub: [
                        {
                            name: '全网平均在档',
                            main: this.intel.averagePlayedTime,
                            sub: '分钟',
                        },
                        {
                            name: '中流玩家预计在档',
                            main: this.intel.medianPlayedTime,
                            sub: '分钟',
                        },
                        {
                            name: '每周平均启动时长',
                            main: (this.intel.twoWeekAveragePlayedTime / 2).toFixed(2),
                            sub: '分钟',
                        },
                        {
                            name: '预计每分钟消费',
                            main: (this.basicInfo.steamPrice / this.intel.averagePlayedTime).toFixed(2),
                            sub: 'CNY',
                        },
                        {
                            name: '预计每 ¥ 1 换取',
                            main: (this.intel.averagePlayedTime / this.basicInfo.steamPrice).toFixed(2),
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
            intel: '<',
            basicInfo: '<',
        },
    });
}());
