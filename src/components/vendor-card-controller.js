(function () {
    class VendorCardController {}

    keylolApp.component('vendorCard', {
        templateUrl: 'src/components/vendor-card.html',
        controller: VendorCardController,
        controllerAs: 'vendorCard',
        bindings: {
            card: '<',
        },
    });
}());
