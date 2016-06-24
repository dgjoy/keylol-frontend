(function () {
    class PageTimelineController {
        constructor (pageHead, $scope, stateTree, $location, pageLoad, $state) {

            const currentStateName = $state.current.name;
            let fetchPromise;
            if (currentStateName === 'entrance.timeline' && $location.path() !== '/') {
                pageHead.setTitle('轨道 - 其乐');
                pageLoad('entrance.timeline');
            } else if (currentStateName === 'aggregation.point.timeline' && !$location.path().match(/\/point\/[^\/]*\/?$/)) {
                if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.point
                    && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code) ) {
                    fetchPromise = pageLoad('aggregation.point.timeline');
                } else {
                    fetchPromise = pageLoad('aggregation.point', { entrance: 'Timeline' });
                }
                fetchPromise.then(() => {
                    pageHead.setTitle(`${stateTree.aggregation.point.basicInfo.chineseName || stateTree.aggregation.point.basicInfo.englishName} - 轨道 - 其乐`);
                    $scope.theme = {
                        main: stateTree.aggregation.point.basicInfo.themeColor,
                        light: stateTree.aggregation.point.basicInfo.lightThemeColor,
                        logo: stateTree.aggregation.point.basicInfo.logo,
                    };
                });
            } else if (currentStateName === 'aggregation.user.timeline' && !$location.path().match(/\/user\/[^\/]*\/?$/)) {
                if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.point
                    && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code) ) {
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
