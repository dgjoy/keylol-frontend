(function () {
    class PostOfficeController {
        constructor ($scope, stateTree, $location, $state) {
            $scope.stateTree = stateTree;

            if ($location.path().match(/\/post-office\/?$/)) {
                $state.go('.unread');
            }
        }
    }

    keylolApp.controller('PostOfficeController', PostOfficeController);
}());
