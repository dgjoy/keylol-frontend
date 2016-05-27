(function () {
    class UserController {
        constructor ($scope, stateTree) {
            $scope.stateTree = stateTree;
            stateTree.pointTheme = {
                main: '#278649',
                light: '#8cab57',
            };
        }
    }

    keylolApp.controller('UserController', UserController);
}());
