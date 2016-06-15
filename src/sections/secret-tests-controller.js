(function () {
    class SecretTestsController {
        constructor (window, $http, notification) {
            $.extend(this, {
                window,
                notification,
            });
            this.binarySet = [
                {
                    icon: 'follower-mark',
                    text: '订阅',
                    type: 'theme',
                },
                {
                    icon: 'friended-mark',
                    text: '退订',
                    type: 'light-text',
                },
            ];

            this.binaryValue = false;
        }

        changeBinary () {
            this.binaryValue = !this.binaryValue;
        }
    }

    keylolApp.component('secretTests', {
        templateUrl: 'src/sections/secret-tests.html',
        controller: SecretTestsController,
        controllerAs: 'secretTests',
    });
}());
