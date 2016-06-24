(function () {
    class PointPusherController {
        constructor(close, $http, apiEndpoint, notification, point, utils, stateTree) {
            $.extend(this, {
                close,
                $http,
                apiEndpoint,
                notification,
                point,
                utils,
                stateTree,
            });

            this.vm = {
                place: undefined,
            };
        }

        exit() {
            this.close();
        }

        submit (type) {
            if (this.submitLock) {
                return;
            }

            this.submitLock = true;

            const place = ['spotlight-point', 'outpost-point'][this.vm.place];
            this.$http.post(`${this.apiEndpoint}feed/${place}`,{},{
                params: {
                    pointIdCode: this.point.idCode,
                },
            }).then(response => {
                this.notification.success({ message: '推送成功' });
                this.close();
            }, response => {
                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                this.submitLock = false;
            });
        }
    }

    keylolApp.controller('PointPusherController', PointPusherController);
}());
