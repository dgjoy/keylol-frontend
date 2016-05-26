(function () {
    class UserController {
        constructor ($scope, stateTree) {
            $scope.stateTree = stateTree;
            stateTree.pointTheme = {
                main: 'rgb(39,134,73)',
                light: 'rgb(140,171,87)',
            };
        }
    }

    keylolApp.controller('UserController', UserController);
}());
