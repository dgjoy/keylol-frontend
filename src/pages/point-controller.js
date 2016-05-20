(function () {
    class PointController {
        constructor ($scope, stateTree) {
            $scope.stateTree = stateTree;
            stateTree.pointTheme = {
                main: '#813221',
                light: '#a83f34',
                icon: '//storage.keylol.com/2ea0474aa5757a04658790f12e144e61.png',
            };
        }
    }

    keylolApp.controller('PointController', PointController);
}());
