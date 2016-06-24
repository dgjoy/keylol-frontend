(function () {
    class SecretTestsController {
        constructor (window, $http, notification) {
            $.extend(this, {
                window,
                notification,
            });

            this.vm = {
                label: [],
                operate: [],
            };

            this.operatenames = ['Windows', 'Mac OS', 'Linux'];

            this.platformnames = ['Steam', '战网', 'Uplay', 'Origin', '杉果', 'PS4', 'Xbox'];
        }
    }

    keylolApp.component('secretTests', {
        templateUrl: 'src/sections/secret-tests.html',
        controller: SecretTestsController,
        controllerAs: 'secretTests',
    });
}());
