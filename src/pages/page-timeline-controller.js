(function () {
    class PageTimelineController {
        constructor (pageHead, $scope, stateTree, $location, pageLoad) {
            pageHead.setTitle('轨道 - 其乐');

            if ($location.url() !== '/') {
                pageLoad('entrance.timeline');
            }

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('PageTimelineController', PageTimelineController);
}());
