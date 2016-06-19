(function () {
    class PointHeaderMenuController {
        constructor (actions, close) {
            this.menu = {
                items: [
                    {
                        type: 'item',
                        text: '编辑',
                        clickAction () {
                            actions[0]();
                            close();
                        },
                    },
                    {
                        type: 'item',
                        text: '推送',
                        clickAction () {
                            actions[1]();
                            close();
                        },
                    },
                ],
            };
        }
    }

    keylolApp.controller('PointHeaderMenuController', PointHeaderMenuController);
}());
