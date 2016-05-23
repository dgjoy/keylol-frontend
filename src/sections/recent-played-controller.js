(function () {
    class RecentPlayedController {
        constructor (utils, stateTree) {
            $.extend(this, {
                utils,
                stateTree,
            });
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
