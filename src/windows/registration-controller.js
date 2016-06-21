(function () {
    class RegistrationController {
        constructor(close, $scope, $timeout) {
            $.extend(this,{
                close,
            });
            this.platform = '';
            this.platformsToSelect = {
                title:'选择后需要连接平台',
                items: [
                    'Steam',
                    'Play Station Network',
                    'Xbox Live',
                ],
            };
            this.connected = false;
            this.conn = null;

            $scope.$watch(() => {
                return this.platform;
            },newVal => {
                switch (newVal) {
                    case 'Steam':
                        this.conn = {
                            index: 0,
                            phases: [
                                '添加机器人为好友',
                                '发送连接验证码',
                                '连接平台成功',
                            ],
                        };
                        $timeout(() => {
                            this.conn.index = 1;
                            $timeout(() => {
                                this.conn.index = 2;
                                this.cleanConn();
                                this.connected = true;
                            },5000);
                        },5000);
                        break;
                    default:
                        this.cleanConn();
                }
            });
        }
        
        exit() {
            this.close();
        }

        cleanConn() {
            this.conn = null;
        }
    }


    keylolApp.controller('RegistrationController', RegistrationController);
}());
