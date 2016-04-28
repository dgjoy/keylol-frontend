(function () {
    class SecretTestsController {
        constructor (window, $http, notification) {
            $.extend(this, {
                window,
            });
        }
        showPointListWindow () {
            this.window.show({
                templateUrl: 'src/windows/point-list.html',
                controller: 'PointListController',
                controllerAs: 'PointList',
            });
        }

    }

    keylolApp.component('secretTests', {
        templateUrl: 'src/sections/secret-tests.html',
        controller: SecretTestsController,
        controllerAs: 'secretTests',
    });
}());
