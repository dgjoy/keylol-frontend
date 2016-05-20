(function () {
    class UserCardController {
        constructor (stateTree) {
            $.extend(this, {
                stateTree,
            });
            if (!this.type) {
                this.type = 'light-text';
            }
        }
    }

    keylolApp.component('userCard', {
        templateUrl: 'src/components/user-card.html',
        controller: UserCardController,
        controllerAs: 'userCard',
        bindings: {
            user: '<',
            type: '@',
        },
    });
}());
