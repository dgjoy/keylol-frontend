(function () {
    class UserCardController {
        constructor (stateTree, utils) {
            $.extend(this, {
                stateTree,
            });
            if (!this.type) {
                this.type = 'user-theme';
            }

            this.subscribeSet = [
                {
                    text: '关注',
                    type: this.type,
                },
                {
                    text: '取关',
                    type: 'light-text',
                },
            ];

            this.subscribe = utils.subscribe;
            this.openRegistration = utils.openRegistration;
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
