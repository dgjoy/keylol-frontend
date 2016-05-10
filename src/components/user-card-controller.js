(function () {
    class UserCardController {

    }

    keylolApp.component('userCard', {
        templateUrl: 'src/components/user-card.html',
        controller: UserCardController,
        controllerAs: 'userCard',
        bindings: {
            text: '@',
        },
    });
}());
