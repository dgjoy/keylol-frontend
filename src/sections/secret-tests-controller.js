(function () {
    class SecretTestsController {
        constructor (window, $http, notification) {
            $.extend(this, {
                window,
                notification,
            });
        }
        showNotification (type) {
            this.notification[type]({
                message: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
                description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
            }, { text: '测试', value: true });
        }

    }

    keylolApp.component('secretTests', {
        templateUrl: 'src/sections/secret-tests.html',
        controller: SecretTestsController,
        controllerAs: 'secretTests',
    });
}());
