(function () {
    class PointsController {
        constructor ($scope, pageHead, $rootScope, stateTree, loadResult) {
            pageHead.setTitle('据点 - 其乐');
            loadResult.loadPromise.then(respond => {
                if (loadResult.loadResultType === 'whole') {
                    $.extend(stateTree, respond.data);
                } else {
                    stateTree[loadResult.loadResultType] = respond.data;
                }
                if (stateTree.empty) {
                    stateTree.empty = false;
                }
                console.log(stateTree);
            }, error => {});

            const disWatch = $rootScope.$on('$stateChangeSuccess', () => {
                delete stateTree[loadResult.loadResultType];
                disWatch();
            });
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('PointsController', PointsController);
}());
