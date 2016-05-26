(function () {
    class DossierController {
        constructor($scope, pageHead, stateTree, $state, $location, $timeout) {
            pageHead.setTitle('个人 - 档案 - 其乐');
            if ($location.url().match(/\/user\/[^\/]*\/dossier\/?$/)) {
                $timeout(() => {
                    $state.go('.home', {}, { location: false });
                });
            }

            $scope.tabArray = [
                { state: '.articles', name: '19 篇文章' },
                { state: '.dongtai', name: '54 则动态' },
                { state: '.shoucang', name: '54 目收藏' },
            ];
            $scope.$watch(() => {
                return $state.current.name;
            }, () => {
                const subState = $state.current.name.substr(25);
                switch (subState) {
                    case 'articles' :
                        $scope.currentPage = 0;
                        break;
                    case 'dongtai' :
                        $scope.currentPage = 1;
                        break;
                    case 'shoucang' :
                        $scope.currentPage = 1;
                        break;
                }
            });
        }
    }

    keylolApp.controller('DossierController', DossierController);
}());
