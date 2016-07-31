(function () {
    class FooterController {
        constructor ($scope, $window) {

        }

        showWechat ($event) {
            this.showWechatPopup({
                templateUrl: 'src/popup/wechat-card.html',
                controller: 'WechatCardController as wechatCard',
                event: $event,
                align: 'top',
                offsetY: 10,
                inputs: {},
            });
        }
    }

    keylolApp.component('footer', {
        templateUrl: 'src/sections/footer.html',
        controller: FooterController,
        controllerAs: 'footer',
        bindings: {
            theme: '<',
        },
    });
}());
