(function () {
    class RecentPlayedController {
        constructor (utils, stateTree, $q) {
            $.extend(this, {
                utils,
                stateTree,
                $q,
            });

            this.subscribeSet = [
                {
                    text: '订阅',
                    type: 'theme',
                },
                {
                    text: '退订',
                    type: 'light-text',
                },
            ];
        }

        subscribeAll() {
            if (this.subscribeAllDisable) return;
            this.subscribeAllDisable = true;
            const deferred = this.$q.defer();
            deferred.resolve();
            let subscribeOne = deferred.promise;
            
            for (let i = 0;i < this.list.length;i++) {
                if (!this.list[i].subscribed) {
                    subscribeOne = subscribeOne.then(() => {
                        return this.utils.subscribe(this.list[i].id, this.list[i].subscribed, this.list[i]);
                    });
                }
            }
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
