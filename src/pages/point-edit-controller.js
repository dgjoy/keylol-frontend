(function () {
    class PointEditController {
        constructor ($scope, pageHead, stateTree, $state, $location, $timeout) {
            pageHead.setTitle('据点 - 编辑 - 其乐');
            if ($location.url().match(/\/point\/[^\/]*\/edit\/?$/)) {
                $state.go('.info', {}, { location: false });
            }

            $scope.tabArray = [
                { state: '.info', name:'资料' },
                { state: '.style', name:'样式' },
                { state: '.log', name:'变更日志' },
            ];
            $scope.$watch(() => {
                return $state.current.name;
            }, () => {
                const subState = $state.current.name.substr(23);
                switch (subState) {
                    case 'info' :
                        $scope.currentPage = 0;
                        break;
                    case 'style' :
                        $scope.currentPage = 1;
                        break;
                    case 'log' :
                        $scope.currentPage = 2;
                        break;
                }
            });
        }
    }

    keylolApp.controller('PointEditController', PointEditController);
}());
