(function () {
    class ActivityController {
        constructor (pageHead, pageLoad, $scope, stateTree) {
            pageHead.setTitle('动态 - 其乐');
            pageLoad('content.activity').then(result => {
                result.authorBasicInfo.playedTime = result.authorPlayedTime;

                $scope.theme = {
                    main: result.pointBasicInfo.themeColor,
                    light: result.pointBasicInfo.lightThemeColor,
                    logo: result.pointBasicInfo.logo,
                };
            });

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('ActivityController', ActivityController);
}());
