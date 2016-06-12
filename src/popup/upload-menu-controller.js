(function () {
    class UploadMenuController {
        constructor (actions, close) {
            this.menu = {
                items: [
                    {
                        type: 'item',
                        text: '上传新图像',
                        clickAction () {
                            actions[0]();
                            close();
                        },
                    },
                    {
                        type: 'item',
                        text: '移除图像',
                        clickAction () {
                            actions[1]();
                            close();
                        },
                    },
                ],
            };
        }
    }

    keylolApp.controller('UploadMenuController', UploadMenuController);
}());
