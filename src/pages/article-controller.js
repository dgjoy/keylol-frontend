(function () {
    class ArticleController {
        constructor (pageLoad, $scope, stateTree, pageHead) {
            pageLoad('content.article').then(result => {
                pageHead.setTitle(`${result.title} - 其乐`);

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

    keylolApp.controller('ArticleController', ArticleController);
}());
