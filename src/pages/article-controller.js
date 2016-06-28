(function () {
    class ArticleController {
        constructor (pageLoad, $scope, stateTree, pageHead) {
            pageLoad('content.article').then(result => {
                if (result.authorBasicInfo === undefined) {
                    $scope.visible = false;
                } else {
                    pageHead.setTitle(`${result.title} - 其乐`);
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

    keylolApp.controller('ArticleController', ArticleController);
}());
