(function () {
    keylolApp.controller('NewPointController', [
        '$scope', 'window',
        ($scope, window) => {
            $scope.showPointAppealWindow = function () {
                window.show({
                    templateUrl: 'src/windows/shop-link.html',
                    controller: 'ShopLinkController',
                });
            };
        },
    ]);
}());
