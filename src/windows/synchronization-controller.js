(function () {
    class SynchronizationController {
        constructor($scope, close, condition, autoSubscribed, options, utils, $http, notification, window,
                    $location, apiEndpoint) {
            $.extend(this,{
                close,
                options,
                $http,
                window,
                apiEndpoint,
                $location,
                notification,
            });

            this.condition = condition;
            this.autoSubscribed = autoSubscribed;
            this.subscribeEmpty = true;
            for (const i in this.autoSubscribed) {
                if (this.autoSubscribed.hasOwnProperty(i) && this.autoSubscribed[i].length > 0) {
                    this.subscribeEmpty = false;
                }
            }
            this.utils = utils;
        }

        cancel() {
            const options = this.options;
            const $location = this.$location;
            const condition = this.condition;
            const close = this.close;

            if ($location.url() === '/' && typeof options.getSubscription === 'function' && condition !== 'fetchFailed') {
                options.getSubscription();
            }
            close();
        }

        deleteAuto(point) {
            const $http = this.$http;
            const apiEndpoint = this.apiEndpoint;
            const notification = this.notification;

            point.deleteDisabled = true;
            $http.delete(`${apiEndpoint}user-point-subscription`, {
                params: {
                    pointId: point.Id,
                    isAutoSubscription: true,
                },
            }).then(() => {
                notification.success('据点已退订');
            }, response => {
                notification.error('发生未知错误，请重试或与站务职员联系', response);
                point.deleteDisabled = false;
            });
        }

        resync() {
            const window = this.window;
            const close = this.close;
            const options = this.options;

            window.show({
                templateUrl: 'src/windows/sync-loading.html',
                controller: 'SyncLoadingController',
                controllerAs: 'SyncLoading',
                inputs: {
                    options: { getSubscription: options.getSubscription },
                },
            });
            close();
        };

        jumpToSettings() {
            const window = this.window;
            const close = this.close;

            window.show({
                templateUrl: 'src/windows/settings.html',
                controller: 'SettingsController',
                inputs: {
                    options: { page: 'preferences' },
                },
            });
            close();
        };
    }

    keylolApp.controller('SynchronizationController', SynchronizationController);
}());
