(function () {
    class PointEditController {
        constructor ($scope, pageHead, stateTree, $state) {
            pageHead.setTitle('据点 - 编辑 - 其乐');

            $scope.tabArray = [
                { state: '.info', name:'资料' },
                { state: '.style', name:'样式' },
            ];
            $scope.$watch(() => {
                return $state.current.name;
            }, () => {
                const subState = $state.current.name.substr(23);
                switch (subState) {
                    case 'info' :
                        this.currentPage = 0;
                        break;
                }
            });
            $scope.currentPage = 1;
        }
    }

    keylolApp.controller('PointEditController', PointEditController);
}());
