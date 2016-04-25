(function () {
    class HomeOperationController {
        constructor (window) {
            this.window = window;
        }
        showPointAppealWindow () {
            this.window.show({
                templateUrl: 'src/windows/shop-link.html',
                controller: 'ShopLinkController',
            });
        }
    }

    keylolApp.component('homeOperation', {
        templateUrl: 'src/sections/home-operation.html',
        controller: HomeOperationController,
        controllerAs: 'homeOperation',
    });
}());
