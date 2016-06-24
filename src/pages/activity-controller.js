(function () {
    class ActivityController {
        constructor (pageHead, pageLoad, $scope, stateTree) {
            pageLoad('content.activity').then(result => {
                pageHead.setTitle(`动态 - ${result.pointBasicInfo.chineseName || result.pointBasicInfo.englishName} - 其乐`);
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
