
(function () {
    class userMenuController {
        constructor(utils) {
            this.specialMenu = {
                header: {
                    type: 'user-right',
                    basicInfo: this.object,
                    inArticle: this.inArticle,
                    subscribeSet: [
                        {
                            text: '关注',
                            type: 'theme',
                        },
                        {
                            text: '取关',
                            type: 'light-text',
                        },
                    ],
                    subscribe: utils.subscribe,
                    openRegistration: utils.openRegistration,
                },
            };
        }
    }

    keylolApp.component('userMenu', {
        templateUrl: 'src/sections/user-menu.html',
        controller: userMenuController,
        controllerAs: 'userMenu',
        bindings: {
            object: '<',
            theme: '<',
            inArticle: '<',
        },
    });
}());
