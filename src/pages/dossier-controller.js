(function () {
    class DossierController {
        constructor($scope, pageHead, stateTree, $state, $location, pageLoad, $http, notification) {
            // $scope.changePage =  index => {
            //     $scope.currentPage = index;
            //     switch (index) {
            //         case 0:
            //             $scope.templist = null;
            //             $http.get(`${apiEndpoint}states/aggregation/user/dossier/selected-articles`,{
            //                 params: {
            //                     user_id: stateTree.aggregation.user.basicInfo.id,
            //                     page: 1,
            //                 },
            //             }).then(response => {
            //                 $scope.tempList = response.data;
            //             }, response => {
            //                 notification.error('发生未知错误，请重试或与站务职员联系',response);
            //             });
            //             break;
            //         case 1:
            //             $scope.templist = null;
            //             $http.get(`${apiEndpoint}states/aggregation/user/subscribed-points`,{
            //                 params: {
            //                     user_id: stateTree.aggregation.user.basicInfo.id,
            //                     page: 1,
            //                 },
            //             }).then(response => {
            //                 $scope.tempList = response.data;
            //             }, response => {
            //                 notification.error('发生未知错误，请重试或与站务职员联系',response);
            //             });
            //     }
            // };

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
                    // $scope.tabArray = [
                    //     { name: `${stateTree.aggregation.user.dossier.articleCount} 篇文章` },
                    //     { name: `${stateTree.aggregation.user.dossier.subscribedPointCount} 个订阅据点` },
                    // ];

                    // $scope.articlePageCount = parseInt((stateTree.aggregation.user.dossier.articleCount - 1) / 10) + 1;
                    // $scope.subscribePageCount = parseInt((stateTree.aggregation.user.dossier.subscribePointCount - 1) / 10) + 1;
                });
            }

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('DossierController', DossierController);
}());
