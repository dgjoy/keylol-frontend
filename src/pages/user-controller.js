(function () {
    class UserController {
        constructor ($scope, stateTree, $location, pageLoad, pageHead) {
            $scope.stateTree = stateTree;

            $scope.$watch('stateTree.aggregation.user', () => {
                if (!stateTree.aggregation || !stateTree.aggregation.user) return;
                if (stateTree.aggregation.user.current === 'dossier') {
                    pageHead.setTitle(`${stateTree.aggregation.user.basicInfo.userName} - 档案 - 其乐`);
                } else {
                    pageHead.setTitle(`${stateTree.aggregation.user.basicInfo.userName} - 轨道 - 其乐`);
                }

                $scope.theme = {
                    main: stateTree.aggregation.user.basicInfo.themeColor,
                    light: stateTree.aggregation.user.basicInfo.lightThemeColor,
                    logo: stateTree.aggregation.user.basicInfo.logo,
                };
            });
        }
    }

    keylolApp.controller('UserController', UserController);
}());
