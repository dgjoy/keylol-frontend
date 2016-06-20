(function () {
    class DossierController {
        constructor($scope, pageHead, stateTree, $state, $location, pageLoad) {
            pageHead.setTitle('个人 - 档案 - 其乐');
            let fetchPromise;
            if (!$location.url().match(/\/point\/[^\/]*\/?$/)) {
                if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.point
                    && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code) ) {
                    fetchPromise = pageLoad('aggregation.user.dossier');
                } else {
                    fetchPromise = pageLoad('aggregation.user', { entrance: 'Dossier' });
                }
                fetchPromise.then(() => {
                    $scope.theme = {
                        main: stateTree.aggregation.user.basicInfo.themeColor,
                        light: stateTree.aggregation.user.basicInfo.lightThemeColor,
                        logo: stateTree.aggregation.user.basicInfo.logo,
                    };

                    $scope.specialMenu = {
                        header: {
                            type:'dossier',
                            basicInfo: stateTree.aggregation.user.basicInfo,
                        },
                    };
                    $scope.tabArray = [
                        { state: '.articles', name:  `${stateTree.aggregation.user.dossier.articleCount} 篇文章` },
                        { state: '.subscribes', name: `${stateTree.aggregation.user.dossier.subscribedPointCount} 个订阅据点` },
                    ];
                });
            }

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('DossierController', DossierController);
}());
