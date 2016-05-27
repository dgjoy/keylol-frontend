(function () {
    class StaffUsersController {
        constructor () {
            this.types = [
                {
                    mainTitle: '厂商职员',
                    subTitle: '入驻其乐的游戏业者',
                },
                {
                    mainTitle: '驻点职员',
                    subTitle: '驻守在此据点的站务职员',
                },
            ];
        }
    }

    keylolApp.component('staffUsers', {
        templateUrl: 'src/sections/staff-users.html',
        controller: StaffUsersController,
        controllerAs: 'staffUsers',
        bindings: {
            theme: '<',
            fromVendor: '<',
            staying: '<',
        },
    });
}());
