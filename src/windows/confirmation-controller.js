(function () {
    class ConfirmationController {
        constructor($scope, close, window, apiEndpoint, utils, notification, point, $location, union) {
            $.extend(this,{
                close,
                union,
                $location,
                notification,
                window,
            });

            this.utils = utils;
            this.point = point;
        }

        cancel() {
            const close = this.close;

            close();
        }

        submit() {
            const union = this.union;
            const $location = this.$location;
            const notification = this.notification;
            const close = this.close;
            const point = this.point;

            close();
            if (!union.inEditor) {
                $location.url(`point/${point.IdCode}`);
                notification.success('据点已开设');
            } else {
                notification.success('据点已开设，可以随时接收文章投稿');
            }
        }

        switchToEditInfo() {
            const window = this.window;
            const close = this.close;
            const point = this.point;

            window.show({
                templateUrl: 'src/windows/point-settings.html',
                controller: 'PointSettingsController',
                controllerAs: 'PointSettings',
                inputs: {
                    point,
                    isGame: true,
                    isJustCreated: true,
                },
            });
            close();
        }
    }
    keylolApp.controller('ConfirmationController', ConfirmationController);
}());
