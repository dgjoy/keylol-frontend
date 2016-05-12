(function () {
    class SalesTodayController {
        constructor ($rootScope, $location) {
            $.extend(this, {
                $rootScope,
                $location,
            });
            this.list = [
                {
                    link: 'point/DOTA2',
                    coverImg: '//steamcdn.keylol.com/steam/apps/570/capsule_231x87.jpg!cover.image.small',
                    title: '刀塔',
                    subTitle: 'Dota 2',
                    review: 9.5,
                    price: 68,
                    oldPrice: 34,
                    discount: '50%',
                },
                {
                    link: 'point/DOTA2',
                    coverImg: '//steamcdn.keylol.com/steam/apps/570/capsule_231x87.jpg!cover.image.small',
                    title: '刀塔',
                    subTitle: 'Dota 2',
                    review: 9.5,
                    price: 68,
                    oldPrice: 34,
                    discount: '50%',
                },
                {
                    link: 'point/DOTA2',
                    coverImg: '//steamcdn.keylol.com/steam/apps/570/capsule_231x87.jpg!cover.image.small',
                    title: '刀塔',
                    subTitle: 'Dota 2',
                    review: 9.5,
                    price: 68,
                    oldPrice: 34,
                    discount: '50%',
                },
                {
                    link: 'point/DOTA2',
                    coverImg: '//steamcdn.keylol.com/steam/apps/570/capsule_231x87.jpg!cover.image.small',
                    title: '刀塔',
                    subTitle: 'Dota 2',
                    review: 9.5,
                    price: 68,
                    oldPrice: 34,
                    discount: '50%',
                },
                {
                    link: 'point/DOTA2',
                    coverImg: '//steamcdn.keylol.com/steam/apps/570/capsule_231x87.jpg!cover.image.small',
                    title: '刀塔',
                    subTitle: 'Dota 2',
                    review: 9.5,
                    price: 68,
                    oldPrice: 34,
                    discount: '50%',
                },
                {
                    link: 'point/DOTA2',
                    coverImg: '//steamcdn.keylol.com/steam/apps/570/capsule_231x87.jpg!cover.image.small',
                    title: '刀塔',
                    subTitle: 'Dota 2',
                    review: 9.5,
                    price: 68,
                    oldPrice: 34,
                    discount: '50%',
                },
                {
                    link: 'point/DOTA2',
                    coverImg: '//steamcdn.keylol.com/steam/apps/570/capsule_231x87.jpg!cover.image.small',
                    title: '刀塔',
                    subTitle: 'Dota 2',
                    review: 9.5,
                    price: 68,
                    oldPrice: 34,
                    discount: '50%',
                },
                {
                    link: 'point/DOTA2',
                    coverImg: '//steamcdn.keylol.com/steam/apps/570/capsule_231x87.jpg!cover.image.small',
                    title: '刀塔',
                    subTitle: 'Dota 2',
                    review: 9.5,
                    price: 68,
                    oldPrice: 34,
                    discount: '50%',
                },
                {
                    link: 'point/DOTA2',
                    coverImg: '//steamcdn.keylol.com/steam/apps/570/capsule_231x87.jpg!cover.image.small',
                    title: '刀塔',
                    subTitle: 'Dota 2',
                    review: 9.5,
                    price: 68,
                    oldPrice: 34,
                    discount: '50%',
                },
            ];
        }

        expandMore () {
            this.hasBeenExpanded = true;
        }
    }

    keylolApp.component('salesToday', {
        templateUrl: 'src/sections/sales-today.html',
        controller: SalesTodayController,
        controllerAs: 'salesToday',
        bindings: {},
    });
}());
