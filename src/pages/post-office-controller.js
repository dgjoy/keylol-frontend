(function () {
    class PostOfficeController {
        constructor ($scope, stateTree, $location, $state) {
            $scope.stateTree = stateTree;

            if ($location.url().match(/\/post-office\/?$/)) {
                $state.go('.unread');
            }
        }
    }

    keylolApp.controller('PostOfficeController', PostOfficeController);
}());
