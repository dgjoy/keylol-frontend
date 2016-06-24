(function () {
    class PointCreateSuccessController {
        constructor(close, pointObject, utils) {
            $.extend(this, {
                close,
                pointObject,
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

            this.subscribe = utils.subscribe;
        }
    }

    keylolApp.controller('PointCreateSuccessController', PointCreateSuccessController);
}());
