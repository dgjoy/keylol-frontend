(function () {
    class AddictiveUsersController {
        constructor () {
            this.types = {
                mainTitle: '坑中同仁',
                subTitle: '这些玩家已经不能自拔',
            };

            console.log(this.cards);
        }
    }

    keylolApp.component('addictiveUsers', {
        templateUrl: 'src/sections/addictive-users.html',
        controller: AddictiveUsersController,
        controllerAs: 'addictiveUsers',
        bindings: {
            theme: '<',
            cards: '<',
        },
    });
}());
