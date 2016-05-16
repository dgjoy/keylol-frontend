(function () {
    class RecentPlayedController {
        constructor () {
        }
    }

    keylolApp.component('recentPlayed', {
        templateUrl: 'src/sections/recent-played.html',
        controller: RecentPlayedController,
        controllerAs: 'recentPlayed',
        bindings: {
            list: '<',
            headerImage: '<',
        },
    });
}());
