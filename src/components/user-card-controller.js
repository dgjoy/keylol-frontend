(function () {
    class UserCardController {
        constructor (stateTree) {
            $.extend(this, {
                stateTree,
            });
        }
    }

    keylolApp.component('userCard', {
        templateUrl: 'src/components/user-card.html',
        controller: UserCardController,
        controllerAs: 'userCard',
        bindings: {
            user: '<',
        },
    });
}());
