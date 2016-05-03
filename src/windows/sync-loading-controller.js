(function () {
    class SyncLoadingController {
        constructor($scope, close, $timeout, window, $http, options, notification) {
            const staticGroup = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q'];
            this.animateGroup = staticGroup.slice();
            this.animateIndex = -1;
            this.changeFlag = true;
            
            const timeoutFunction = () => {
                this.changeFlag = !this.changeFlag;
                this.animateGroup.splice(this.animateIndex, 1);
                if (this.animateGroup.length === 0) {
                    this.animateGroup = staticGroup.slice();
                }
                this.animateIndex = Math.floor(Math.random() * this.animateGroup.length);
                $timeout(timeoutFunction, 2000);
            };

            $timeout(timeoutFunction, 100);
            const fetch = $http.put(`${apiEndpoint}user-game-record/my`, {}, {
                params: {manual: !options.isFirstTime},
            });
            $timeout(() => {
                fetch.then(response => {
                    window.show({
                        templateUrl: 'src/windows/synchronization.html',
                        controller: 'SynchronizationController',
                        controllerAs: 'Synchronization',
                        inputs: {
                            condition: options.isFirstTime ? 'firstTime' : 'subsequential',
                            autoSubscribed: response.data,
                            options: {getSubscription: options.getSubscription},
                        },
                    });
                    close();
                }, response => {
                    if (response.status === 401) {
                        window.show({
                            templateUrl: 'src/windows/synchronization.html',
                            controller: 'SynchronizationController',
                            controllerAs: 'Synchronization',
                            inputs: {
                                condition: 'fetchFailed',
                                autoSubscribed: {},
                                options: {getSubscription: options.getSubscription},
                            },
                        });
                    } else if (response.status === 404) {
                        notification.error('距离上次同步间隔不足 1 分钟，如有需要请在冷却时间过后再次同步', response);
                    } else {
                        notification.error('发生未知错误，请重试或与站务职员联系', response);
                    }
                    close();
                });
            }, 3000);
        }
    }
    
    keylolApp.controller('SyncLoadingController', SyncLoadingController);
}());
