(function () {
    class PointController {
        constructor ($scope, stateTree, $state, pageHead, $location) {
            $scope.stateTree = stateTree;

            $scope.$watch('stateTree.aggregation.point', () => {
                if (!stateTree.aggregation || !stateTree.aggregation.point) return;
                
                if ($location.path().match(/\/point\/[^\/]*\/?$/)) {
                    pageHead.setTitle(
                        `${stateTree.aggregation.point.basicInfo.chineseName ? `${stateTree.aggregation.point.basicInfo.chineseName} - ` : ''}`
                        + `${stateTree.aggregation.point.basicInfo.englishName} - 其乐`);
                    pageHead.setDescription(`${stateTree.aggregation.point.basicInfo.chineseName
                    || stateTree.aggregation.point.basicInfo.englishName} 社区`);
                    const keywords = [stateTree.aggregation.point.basicInfo.englishName, '好玩吗, 怎么样, 下载, 破解, 多少钱, 教程, 攻略, steam, 杉果, 评测, 社区, 折扣, 史低'];
                    if (stateTree.aggregation.point.basicInfo.chineseName) {
                        keywords.unshift(stateTree.aggregation.point.basicInfo.chineseName);
                    }
                    pageHead.setKeywords(keywords);
                }

                $scope.theme = {
                    main: stateTree.aggregation.point.basicInfo.themeColor,
                    light: stateTree.aggregation.point.basicInfo.lightThemeColor,
                    logo: stateTree.aggregation.point.basicInfo.logo,
                };
            });

            $scope.$watch('stateTree.aggregation.point.basicInfo', newValue => {
                if (newValue) {
                    newValue.idCode = $state.params.point_id_code;
                }
            });
        }
    }

    keylolApp.controller('PointController', PointController);
}());
