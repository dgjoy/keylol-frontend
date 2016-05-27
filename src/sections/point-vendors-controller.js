(function () {
    class PointVendorsController {
        constructor (stateTree) {
            $.extend(this, {
                stateTree,
            });
            this.type = {
                mainTitle: '厂商',
                subTitle: '编辑艺术的工匠与演绎商品的巨人',
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
