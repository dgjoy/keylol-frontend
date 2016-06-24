(function () {
    class SetHeaderMenuController {
        constructor (close, options) {
            this.menu = {
                items: [
                    {
                        type: 'item',
                        text: '上传',
                        clickAction () {
                            close('upload');
                        },
                    },
                    {
                        type: 'horizon',
                    },
                    {
                        type: 'item',
                        text: `调用文章首幅图片${options.articleFirstImageDisable ? '（未上传）' : ''}`,
                        disabled: options.articleFirstImageDisable,
                        clickAction () {
                            close('articleFirstImage');
                        },
                    },
                    {
                        type: 'item',
                        text: `调用投稿据点封面${options.pointHeaderImageDisable ? '（未填写）' : ''}`,
                        disabled: options.pointHeaderImageDisable,
                        clickAction () {
                            close('pointHeaderImage');
                        },
                    },
                ],
            };
        }
    }

    keylolApp.controller('SetHeaderMenuController', SetHeaderMenuController);
}());
