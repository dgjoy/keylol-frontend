(function () {
    class ActivityController {
        constructor ($scope, stateTree) {
            $scope.stateTree = stateTree;
            stateTree.pointTheme = {
                main: '#A80E27',
                light: '#9A9B55',
                icon: '//storage.keylol.com/2ea0474aa5757a04658790f12e144e61.png',
            };
        }
    }

    keylolApp.controller('ActivityController', ActivityController);
}());
