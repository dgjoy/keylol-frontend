(function () {
    class PointController {
        constructor ($scope, stateTree, $location, pageLoad, $state) {
            $scope.stateTree = stateTree;

            if ($location.url().match(/\/point\/[^\/]*\/?$/)) {
                pageLoad('aggregation.point', { entrance: 'auto' }).then(result => {
                    if (result) {
                        result.idCode = $state.params.point_id_code;
                    }
                });
            }
            
            stateTree.pointTheme = {
                main: '#813221',
                light: '#a83f34',
                icon: '//storage.keylol.com/2ea0474aa5757a04658790f12e144e61.png',
            };
        }
    }

    keylolApp.controller('PointController', PointController);
}());
