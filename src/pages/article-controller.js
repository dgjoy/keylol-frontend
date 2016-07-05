(function () {
    class ArticleController {
        constructor (pageLoad, $scope, stateTree, pageHead) {
            pageLoad('content.article').then(result => {
                if (result.authorBasicInfo === undefined) {
                    $scope.visible = false;
                    pageHead.setTitle('文章封存中 - 其乐');
                } else {
                    [result.pointBasicInfo.headerImage, result.coverImage] = [result.coverImage, result.pointBasicInfo.headerImage];
                    pageHead.setTitle(
                        `${result.title} - ${result.subtitle ? `${result.subtitle} - ` : ''}`
                        + `${result.pointBasicInfo.chineseName || result.pointBasicInfo.englishName} - 其乐`);
                    pageHead.setDescription(`${result.pointBasicInfo.chineseName || result.pointBasicInfo.englishName} 社区`);
                    const keywords = [result.pointBasicInfo.englishName, '好玩吗, 怎么样, 下载, 破解, 多少钱, 教程, 攻略, steam, 杉果, 评测, 社区, 折扣, 史低'];
                    if (result.pointBasicInfo.chineseName) {
                        keywords.unshift(result.pointBasicInfo.chineseName);
                    }
                    pageHead.setKeywords(keywords);

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
