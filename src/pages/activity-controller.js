(function () {
    class ActivityController {
        constructor (pageHead, pageLoad, $scope, stateTree) {
            pageLoad('content.activity').then(result => {
                if (result.authorBasicInfo === undefined) {
                    $scope.visible = false;
                } else {
                    pageHead.setTitle(`动态 - ${result.pointBasicInfo.chineseName || result.pointBasicInfo.englishName} - 其乐`);
                    result.authorBasicInfo.playedTime = result.authorPlayedTime;

                    $scope.theme = {
                        main: result.pointBasicInfo.themeColor,
                        light: result.pointBasicInfo.lightThemeColor,
                        logo: result.pointBasicInfo.logo,
                    };
                    $scope.visible = true;
                }
            });

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('ActivityController', ActivityController);
}());
