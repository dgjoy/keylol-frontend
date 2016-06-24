(function () {
    class UserLatestSubscribeController {
        constructor () {
            this.header = {
                mainTitle:'新订阅',
                subTitle: `一共订阅 ${this.count} 个据点`,
            };
        }
    }

    keylolApp.component('userLatestSubscribe', {
        templateUrl: 'src/sections/user-latest-subscribe.html',
        controller: UserLatestSubscribeController,
        controllerAs: 'userLatestSubscribe',
        bindings: {
            theme: '<',
            cards: '<',
            count: '<',
        },
    });
}());
