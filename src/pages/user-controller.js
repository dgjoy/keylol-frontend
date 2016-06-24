(function () {
    class UserController {
        constructor ($scope, stateTree, $location, pageLoad) {
            $scope.stateTree = stateTree;

            if ($location.path().match(/\/user\/[^\/]*\/?$/)) {
                pageLoad('aggregation.user', { entrance: 'auto' }).then(() => {
                    $scope.theme = {
                        main: stateTree.aggregation.user.basicInfo.themeColor,
                        light: stateTree.aggregation.user.basicInfo.lightThemeColor,
                        logo: stateTree.aggregation.user.basicInfo.logo,
                    };
                });
            }
        }
    }

    keylolApp.controller('UserController', UserController);
}());
