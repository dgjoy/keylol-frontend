/**
 * Created by Rex on 15/9/23.
 */
(function () {
    class pointHeaderController {
        constructor($scope, union, $http, notification) {
        }
    }

    keylolApp.component('pointHeader', {
        templateUrl: 'src/sections/point-header.html',
        controller: pointHeaderController,
        controllerAs: 'pointHeader',
        bindings: {
            theme: '<',
        },
    });
}());
