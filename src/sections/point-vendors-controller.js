(function () {
    class PointVendorsController {
        constructor (stateTree) {
            $.extend(this, {
                stateTree,
            });
            this.type = {
                mainTitle: '厂商',
                subTitle: '编织艺术的工匠与演绎作品的商人',
            };
        }
    }

    keylolApp.component('pointVendors', {
        templateUrl: 'src/sections/point-vendors.html',
        controller: PointVendorsController,
        controllerAs: 'pointVendors',
        bindings: {
            theme: '<',
            cards: '<',
        },
    });
}());
