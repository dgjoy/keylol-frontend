(function () {
    class PageTimelineController {
        constructor (pageHead, $scope, stateTree, $location, pageLoad, $state) {

            const currentStateName = $state.current.name;
            let fetchPromise;
            if (currentStateName === 'entrance.timeline') {
                if ($location.path() !== '/') {
                    pageHead.setTitle('轨道 - 其乐 - Keylol.com');
                    pageHead.setKeywords('timeline, 轨道, steam, 游戏, 评测, 社区, 正版, 史低');
                    pageLoad('entrance.timeline');
                } else {
                    pageHead.setTitle('其乐 - Keylol.com');
                    pageHead.setKeywords('steam, 游戏, 评测, 社区, 正版, 史低');
                }
                pageHead.setDescription('游戏评测社区');
            } else if (currentStateName === 'aggregation.point.timeline' && !$location.path().match(/\/point\/[^\/]*\/?$/)) {
                if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.point
                    && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code) ) {
                    fetchPromise = pageLoad('aggregation.point.timeline');
                } else {
                    fetchPromise = pageLoad('aggregation.point', { entrance: 'Timeline' });
                }
                fetchPromise.then(() => {
                    pageHead.setTitle(
                        `情报 - ${stateTree.aggregation.point.basicInfo.chineseName ? `${stateTree.aggregation.point.basicInfo.chineseName} - ` : ''}`
                        + `${stateTree.aggregation.point.basicInfo.englishName} - 其乐`);
                    pageHead.setDescription(`${stateTree.aggregation.point.basicInfo.chineseName
                    || stateTree.aggregation.point.basicInfo.englishName} 社区`);
                    const keywords = [stateTree.aggregation.point.basicInfo.englishName, '好玩吗, 怎么样, 下载, 破解, 多少钱, 教程, 攻略, steam, 杉果, 评测, 社区, 折扣, 史低'];
                    if (stateTree.aggregation.point.basicInfo.chineseName) {
                        keywords.unshift(stateTree.aggregation.point.basicInfo.chineseName);
                    }
                    pageHead.setKeywords(keywords);

                    $scope.theme = {
                        main: stateTree.aggregation.point.basicInfo.themeColor,
                        light: stateTree.aggregation.point.basicInfo.lightThemeColor,
                        logo: stateTree.aggregation.point.basicInfo.logo,
                    };
                });
            } else if (currentStateName === 'aggregation.user.timeline' && !$location.path().match(/\/user\/[^\/]*\/?$/)) {
                if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.user
                    && stateTree.aggregation.user.basicInfo && stateTree.aggregation.user.basicInfo.idCode === $state.params.user_id_code) ) {
                    fetchPromise = pageLoad('aggregation.user.timeline');
                } else {
                    fetchPromise = pageLoad('aggregation.user', { entrance: 'Timeline' });
                }
                fetchPromise.then(() => {
                    pageHead.setTitle(`${stateTree.aggregation.user.basicInfo.userName} - 轨道 - 其乐`);
                    $scope.theme = {
                        main: stateTree.aggregation.user.basicInfo.themeColor,
                        light: stateTree.aggregation.user.basicInfo.lightThemeColor,
                        logo: stateTree.aggregation.user.basicInfo.logo,
                    };
                });
            }

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('PageTimelineController', PageTimelineController);
}());
