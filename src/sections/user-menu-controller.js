
(function () {
    class userMenuController {
        constructor() {
            this.specialMenu = {
                header: {
                    type: 'user-right',
                    basicInfo: this.object,
                    inArticle: this.inArticle,
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
            inArticle: '<',
        },
    });
}());
