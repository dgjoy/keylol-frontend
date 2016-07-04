(function () {
    class FrontpageController {
        constructor ($scope, pageHead, stateTree, pageLoad, $location, $state, $window, $element, $http, apiEndpoint, notification) {
            let fetchPromise;
            if (!$location.path().match(/\/point\/[^\/]*\/?$/)) {
                if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.point
                    && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code) ) {
                    fetchPromise = pageLoad('aggregation.point.frontpage');
                } else {
                    fetchPromise = pageLoad('aggregation.point', { entrance: 'Frontpage' });
                }
                fetchPromise.then(() => {
                    pageHead.setTitle(
                        `扉页 - ${stateTree.aggregation.point.basicInfo.chineseName ? `${stateTree.aggregation.point.basicInfo.chineseName} - ` : ''}`
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
            }
            $scope.stateTree = stateTree;


            const $$window = $($window);
            const scrollCallback = () => {
                const shouldWindowScrollTop = $$window.scrollTop() + 94;
                const windowHeight = $$window.height();
                const elementOffsetTop = $element.offset().top;
                const $elementHeight = $element.height();
                if (shouldWindowScrollTop + windowHeight > elementOffsetTop + $elementHeight) {
                    $scope.$apply(() => {
                        $http.get(`${apiEndpoint}states/aggregation/point/timeline`, {
                            params: $state.params,
                        }).then(response => {
                            stateTree.aggregation.point.timeline = response.data;
                        }, response => {
                            notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        });
                    });
                    $$window.unbind('scroll', scrollCallback);
                    cancelListenRoute();
                }
            };
            $$window.bind('scroll.loadTimeline', scrollCallback);

            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll', scrollCallback);
                cancelListenRoute();
            });
        }
    }

    keylolApp.controller('FrontpageController', FrontpageController);
}());
