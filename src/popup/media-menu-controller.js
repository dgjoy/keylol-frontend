(function () {
    class MediaMenuController {
        constructor (actions, close) {
            this.menu = {
                items: [
                    {
                        type: 'item',
                        text: '移除此媒体',
                        clickAction () {
                            actions[0]();
                            close();
                        },
                    },
                    {
                        type: 'item',
                        text: '下载原图',
                        clickAction () {
                            actions[1]();
                            close();
                        },
                    },
                ],
            };
        }
    }

    keylolApp.controller('MediaMenuController', MediaMenuController);
}());
