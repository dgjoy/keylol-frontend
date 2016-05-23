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
            this.cards = [
                {
                    avatarImage: '//storage.keylol.com/a8733f0a81e78bdbf520722c57caa0cc.png',
                    chineseName: '威乐',
                    englishName: 'Valve',
                },
            ];
        }
    }

    keylolApp.component('pointVendors', {
        templateUrl: 'src/sections/point-vendors.html',
        controller: PointVendorsController,
        controllerAs: 'pointVendors',
        bindings: {
            theme: '<',
        },
    });
}());
